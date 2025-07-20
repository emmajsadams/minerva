import "@testing-library/jest-dom";

declare module "bun:test" {
  interface Matchers {
    toBeInTheDocument(): MatcherResult;
    toHaveClass(className: string): MatcherResult;
    toHaveAttribute(attr: string, value?: string): MatcherResult;
    toHaveValue(value: string | number): MatcherResult;
    toBeDisabled(): MatcherResult;
    toBeRequired(): MatcherResult;
    toBeVisible(): MatcherResult;
    toBeEmptyDOMElement(): MatcherResult;
    toHaveTextContent(text: string | RegExp): MatcherResult;
    toHaveStyle(style: string | Record<string, unknown>): MatcherResult;
    toHaveFocus(): MatcherResult;
    toBeChecked(): MatcherResult;
    toBePartiallyChecked(): MatcherResult;
    toHaveFormValues(expectedValues: Record<string, unknown>): MatcherResult;
    toHaveDisplayValue(
      value: string | RegExp | (string | RegExp)[]
    ): MatcherResult;
    toBeInvalid(): MatcherResult;
    toBeValid(): MatcherResult;
    toHaveErrorMessage(text?: string | RegExp): MatcherResult;
    toHaveDescription(text?: string | RegExp): MatcherResult;
    toHaveAccessibleName(name?: string | RegExp): MatcherResult;
    toHaveAccessibleDescription(description?: string | RegExp): MatcherResult;
  }
}
