import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const resend: Resend = new Resend(components.resend, {});

/**
 * Send a welcome email to a new user
 */
export const sendWelcomeEmail = internalMutation({
  args: {
    to: v.string(),
    name: v.string(),
  },
  handler: async (ctx, { to, name }) => {
    await resend.sendEmail(ctx, {
      from: "Minerva <noreply@minerva.dev>",
      to,
      subject: "Welcome to Minerva - Your Personal Productivity Assistant",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Welcome to Minerva</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 2.5em; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">MINERVA</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 1.1em;">Personal Productivity Assistant</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h2 style="color: #4a5568; margin-bottom: 20px;">Welcome, ${name}!</h2>
              
              <p>Thank you for joining Minerva, your new personal productivity companion inspired by the wisdom of Athena herself.</p>
              
              <p>With Minerva, you can:</p>
              <ul style="color: #666; padding-left: 20px;">
                <li>📝 Create and manage tasks with rich descriptions</li>
                <li>🎯 Set priorities and track progress</li>
                <li>🔍 Search through your tasks effortlessly</li>
                <li>📅 Organize your workflow with due dates</li>
                <li>✨ Experience a beautiful, Persona 3-inspired interface</li>
              </ul>
              
              <p>Ready to boost your productivity? Start by creating your first task and let Minerva guide you toward achieving your goals.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/tasks" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                  Get Started with Minerva
                </a>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
              
              <p style="color: #718096; font-size: 0.9em; text-align: center;">
                If you have any questions, feel free to reach out. We're here to help you succeed!
              </p>
            </div>
          </body>
        </html>
      `,
    });
  },
});

/**
 * Send a task reminder email
 */
export const sendTaskReminderEmail = internalMutation({
  args: {
    to: v.string(),
    userName: v.string(),
    taskName: v.string(),
    taskDescription: v.optional(v.string()),
    dueDate: v.optional(v.string()),
    priority: v.string(),
  },
  handler: async (
    ctx,
    { to, userName, taskName, taskDescription, dueDate, priority }
  ) => {
    const priorityColors = {
      high: "#ef4444",
      medium: "#f59e0b",
      low: "#10b981",
    };

    const priorityColor =
      priorityColors[priority as keyof typeof priorityColors] || "#6b7280";

    await resend.sendEmail(ctx, {
      from: "Minerva <noreply@minerva.dev>",
      to,
      subject: `Task Reminder: ${taskName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Task Reminder - Minerva</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 1.8em;">MINERVA</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Task Reminder</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h2 style="color: #4a5568; margin-bottom: 20px;">Hello ${userName},</h2>
              
              <p>This is a friendly reminder about your task:</p>
              
              <div style="background: #f7fafc; border-left: 4px solid ${priorityColor}; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                <h3 style="margin: 0 0 10px 0; color: #2d3748;">${taskName}</h3>
                ${taskDescription ? `<p style="margin: 10px 0; color: #4a5568;">${taskDescription}</p>` : ""}
                <div style="display: flex; gap: 20px; margin-top: 15px; flex-wrap: wrap;">
                  <span style="background: ${priorityColor}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.85em; font-weight: bold;">
                    ${priority.toUpperCase()} PRIORITY
                  </span>
                  ${dueDate ? `<span style="background: #e2e8f0; color: #4a5568; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">📅 Due: ${dueDate}</span>` : ""}
                </div>
              </div>
              
              <p>Stay focused and make progress on what matters most!</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/tasks" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                  View Your Tasks
                </a>
              </div>
            </div>
          </body>
        </html>
      `,
    });
  },
});

/**
 * Send a daily task summary email
 */
export const sendDailyTaskSummary = internalMutation({
  args: {
    to: v.string(),
    userName: v.string(),
    totalTasks: v.number(),
    completedTasks: v.number(),
    pendingTasks: v.number(),
    highPriorityTasks: v.number(),
  },
  handler: async (
    ctx,
    {
      to,
      userName,
      totalTasks,
      completedTasks,
      pendingTasks,
      highPriorityTasks,
    }
  ) => {
    const completionRate =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    await resend.sendEmail(ctx, {
      from: "Minerva <noreply@minerva.dev>",
      to,
      subject: "Your Daily Productivity Summary",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Daily Summary - Minerva</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 1.8em;">MINERVA</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Daily Productivity Summary</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h2 style="color: #4a5568; margin-bottom: 20px;">Good work today, ${userName}!</h2>
              
              <p>Here's your productivity summary for today:</p>
              
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 25px 0;">
                <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; text-align: center; border: 2px solid #0ea5e9;">
                  <div style="font-size: 2em; font-weight: bold; color: #0ea5e9;">${completedTasks}</div>
                  <div style="color: #0369a1; font-weight: 500;">Completed</div>
                </div>
                
                <div style="background: #fef3c7; padding: 20px; border-radius: 10px; text-align: center; border: 2px solid #f59e0b;">
                  <div style="font-size: 2em; font-weight: bold; color: #f59e0b;">${pendingTasks}</div>
                  <div style="color: #d97706; font-weight: 500;">Pending</div>
                </div>
                
                <div style="background: #fef2f2; padding: 20px; border-radius: 10px; text-align: center; border: 2px solid #ef4444;">
                  <div style="font-size: 2em; font-weight: bold; color: #ef4444;">${highPriorityTasks}</div>
                  <div style="color: #dc2626; font-weight: 500;">High Priority</div>
                </div>
                
                <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; text-align: center; border: 2px solid #10b981;">
                  <div style="font-size: 2em; font-weight: bold; color: #10b981;">${completionRate}%</div>
                  <div style="color: #059669; font-weight: 500;">Completion Rate</div>
                </div>
              </div>
              
              ${
                completionRate >= 80
                  ? '<p style="color: #059669; font-weight: 500; text-align: center; background: #f0fdf4; padding: 15px; border-radius: 8px;">🎉 Excellent work! You\'re crushing your goals!</p>'
                  : completionRate >= 50
                    ? '<p style="color: #d97706; font-weight: 500; text-align: center; background: #fef3c7; padding: 15px; border-radius: 8px;">💪 Great progress! Keep up the momentum!</p>'
                    : '<p style="color: #dc2626; font-weight: 500; text-align: center; background: #fef2f2; padding: 15px; border-radius: 8px;">📈 Every step counts! Tomorrow is a fresh start!</p>'
              }
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/tasks" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                  View Your Tasks
                </a>
              </div>
            </div>
          </body>
        </html>
      `,
    });
  },
});

/**
 * Send login notification email to admin
 */
export const sendLoginNotificationEmail = internalMutation({
  args: {
    userEmail: v.string(),
    userName: v.optional(v.string()),
    loginTime: v.string(),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { userEmail, userName, loginTime, ipAddress, userAgent }
  ) => {
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
      console.warn(
        "ADMIN_EMAIL environment variable not set, skipping login notification"
      );
      return;
    }

    await resend.sendEmail(ctx, {
      from: "Minerva Security <noreply@minerva.dev>",
      to: adminEmail,
      subject: `Minerva Login Alert - ${userEmail}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Login Notification - Minerva</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 1.8em;">🔒 MINERVA SECURITY</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Login Notification</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 2px solid #ef4444;">
              <h2 style="color: #dc2626; margin-bottom: 20px;">🚨 User Login Alert</h2>
              
              <p>A user has logged into Minerva. Here are the details:</p>
              
              <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="border-bottom: 1px solid #fecaca;">
                    <td style="padding: 8px 0; font-weight: bold; color: #991b1b; width: 30%;">👤 User:</td>
                    <td style="padding: 8px 0; color: #7f1d1d;">
                      ${userName ? `${userName} (${userEmail})` : userEmail}
                    </td>
                  </tr>
                  <tr style="border-bottom: 1px solid #fecaca;">
                    <td style="padding: 8px 0; font-weight: bold; color: #991b1b;">🕐 Time:</td>
                    <td style="padding: 8px 0; color: #7f1d1d;">${loginTime}</td>
                  </tr>
                  ${
                    ipAddress
                      ? `
                    <tr style="border-bottom: 1px solid #fecaca;">
                      <td style="padding: 8px 0; font-weight: bold; color: #991b1b;">🌐 IP Address:</td>
                      <td style="padding: 8px 0; color: #7f1d1d;">${ipAddress}</td>
                    </tr>
                  `
                      : ""
                  }
                  ${
                    userAgent
                      ? `
                    <tr>
                      <td style="padding: 8px 0; font-weight: bold; color: #991b1b;">💻 Device:</td>
                      <td style="padding: 8px 0; color: #7f1d1d; font-size: 0.9em; word-break: break-word;">${userAgent}</td>
                    </tr>
                  `
                      : ""
                  }
                </table>
              </div>
              
              <div style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #0369a1; font-size: 0.9em;">
                  <strong>🛡️ Security Note:</strong> This is an automated notification for all Minerva logins. 
                  If this activity seems suspicious, please review your user access logs immediately.
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/tasks" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                  View Minerva Dashboard
                </a>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
              
              <p style="color: #718096; font-size: 0.9em; text-align: center; margin: 0;">
                Minerva Security Alert System<br>
                Timestamp: ${new Date().toISOString()}
              </p>
            </div>
          </body>
        </html>
      `,
    });
  },
});

/**
 * Test email function for development
 */
export const sendTestEmail = internalMutation({
  args: {
    to: v.string(),
  },
  handler: async (ctx, { to }) => {
    await resend.sendEmail(ctx, {
      from: "Minerva <noreply@minerva.dev>",
      to,
      subject: "Test Email from Minerva",
      html: `
        <h1>Hello from Minerva!</h1>
        <p>This is a test email to verify that the Resend integration is working correctly.</p>
        <p>If you're receiving this, everything is set up properly! 🎉</p>
      `,
    });
  },
});
