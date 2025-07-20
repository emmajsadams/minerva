import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, beforeEach, mock, spyOn } from 'bun:test';
import { AuthForm } from '../AuthForm';

// Mock Next.js router
const mockPush = mock(() => {});
mock.module('next/navigation', () => ({
  useRouter: () => ({ push: mockPush })
}));

// Mock Convex auth
const mockSignIn = mock(() => Promise.resolve());
mock.module('@convex-dev/auth/react', () => ({
  useAuthActions: () => ({ signIn: mockSignIn })
}));

describe('AuthForm', () => {
  beforeEach(() => {
    mockSignIn.mockClear();
    mockPush.mockClear();
  });

  test('renders sign in form by default', () => {
    render(<AuthForm />);
    
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    expect(screen.getByText('Welcome to Minerva - Your personal productivity companion')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  test('switches to sign up mode when clicking toggle', async () => {
    const user = userEvent.setup();
    render(<AuthForm />);
    
    const signUpButton = screen.getByRole('button', { name: "Don't have an account? Sign up" });
    await user.click(signUpButton);
    
    expect(screen.getByText('Create your account')).toBeInTheDocument();
    expect(screen.getByLabelText('Full name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
  });

  test('switches to forgot password mode', async () => {
    const user = userEvent.setup();
    render(<AuthForm />);
    
    const forgotPasswordButton = screen.getByRole('button', { name: 'Forgot your password?' });
    await user.click(forgotPasswordButton);
    
    expect(screen.getByText('Reset your password')).toBeInTheDocument();
    expect(screen.getByText('Enter your email to reset your password')).toBeInTheDocument();
    expect(screen.queryByLabelText('Password')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Reset Email' })).toBeInTheDocument();
  });

  test('submits sign in form with correct data', async () => {
    const user = userEvent.setup();
    render(<AuthForm />);
    
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));
    
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('password', {
        email: 'test@example.com',
        password: 'password123',
        name: undefined,
        flow: 'signIn'
      });
    });
    
    expect(mockPush).toHaveBeenCalledWith('/tasks');
  });

  test('submits sign up form with name field', async () => {
    const user = userEvent.setup();
    render(<AuthForm />);
    
    // Switch to sign up mode
    await user.click(screen.getByText("Don't have an account? Sign up"));
    
    await user.type(screen.getByLabelText('Full name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Sign up' }));
    
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('password', {
        email: 'john@example.com',
        password: 'password123',
        name: 'John Doe',
        flow: 'signUp'
      });
    });
  });

  test('displays error message on authentication failure', async () => {
    const user = userEvent.setup();
    mockSignIn.mockRejectedValueOnce(new Error('Invalid credentials'));
    
    render(<AuthForm />);
    
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));
    
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  test('displays loading state during submission', async () => {
    const user = userEvent.setup();
    let resolveSignIn: () => void;
    mockSignIn.mockReturnValueOnce(new Promise((resolve) => {
      resolveSignIn = resolve;
    }));
    
    render(<AuthForm />);
    
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Loading...' })).toBeDisabled();
    
    resolveSignIn!();
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  test('shows forgot password message', async () => {
    const user = userEvent.setup();
    render(<AuthForm />);
    
    // Switch to forgot password mode
    await user.click(screen.getByText('Forgot your password?'));
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: 'Send Reset Email' }));
    
    await waitFor(() => {
      expect(screen.getByText('Password reset functionality will be implemented once email is configured.')).toBeInTheDocument();
    });
  });

  test('navigates back from forgot password to sign in', async () => {
    const user = userEvent.setup();
    render(<AuthForm />);
    
    // Go to forgot password
    await user.click(screen.getByText('Forgot your password?'));
    expect(screen.getByText('Reset your password')).toBeInTheDocument();
    
    // Go back to sign in
    await user.click(screen.getByText('Back to sign in'));
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
  });
});