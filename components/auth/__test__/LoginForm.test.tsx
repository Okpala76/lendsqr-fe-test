import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../LoginForm";

// Mock the useRouter hook
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
}));

// Mock your useLoginForm hook if needed
// If useLoginForm has any router dependencies, you might need to mock it too
// jest.mock("../../hooks/useLoginForm", () => ({
//   useLoginForm: () => ({
//     register: jest.fn(),
//     handleSubmit: jest.fn(),
//     errors: {},
//     watch: jest.fn(),
//     formState: { isSubmitting: false },
//   }),
// }));

describe("LoginForm Component", () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    render(<LoginForm />);
  });

  describe("Positive Scenarios", () => {
    test("should render all form elements correctly", () => {
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /log in/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /forgot password/i }),
      ).toBeInTheDocument();
    });

    test("should toggle password visibility when show/hide button is clicked", async () => {
      const user = userEvent.setup();

      const passwordInput = screen.getByPlaceholderText(
        "Password",
      ) as HTMLInputElement;
      const toggleBtn = screen.getByRole("button", { name: /show/i });

      expect(passwordInput.type).toBe("password");
      expect(toggleBtn).toHaveTextContent(/show/i);

      await user.click(toggleBtn);
      expect(passwordInput.type).toBe("text");
      expect(toggleBtn).toHaveTextContent(/hide/i);

      await user.click(toggleBtn);
      expect(passwordInput.type).toBe("password");
      expect(toggleBtn).toHaveTextContent(/show/i);
    });

    test("should accept and submit valid form data", async () => {
      const user = userEvent.setup();
      // Mock the form submission
      const mockSubmit = jest.fn();

      // If your form uses react-hook-form, you might need to mock the submit handler
      // You can do this by spying on window.console.log if that's what your form uses
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitBtn = screen.getByRole("button", { name: /log in/i });

      await user.type(emailInput, "user@example.com");
      await user.type(passwordInput, "validpassword123");
      await user.click(submitBtn);

      await waitFor(() => {
        // Check if the form submission was attempted
        // This depends on how your form handles submission
        // If it logs to console, check that
        // If it navigates, check mockPush
        expect(consoleSpy).toHaveBeenCalled();
        // OR if it redirects:
        // expect(mockPush).toHaveBeenCalledWith("/dashboard");
      });

      consoleSpy.mockRestore();
    });

    test("should clear validation errors after successful correction", async () => {
      const user = userEvent.setup();

      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitBtn = screen.getByRole("button", { name: /log in/i });

      // Submit with invalid data
      await user.type(emailInput, "invalid");
      await user.type(passwordInput, "short");
      await user.click(submitBtn);

      await waitFor(() => {
        expect(
          screen.getByText(/enter a valid email address/i),
        ).toBeInTheDocument();
        expect(
          screen.getByText(/password must be at least 6 characters/i),
        ).toBeInTheDocument();
      });

      // Correct the data
      await user.clear(emailInput);
      await user.clear(passwordInput);
      await user.type(emailInput, "valid@example.com");
      await user.type(passwordInput, "correctpassword");
      await user.click(submitBtn);

      // Errors should be cleared after successful validation
      // Note: This might depend on your form implementation
      await waitFor(() => {
        expect(
          screen.queryByText(/enter a valid email address/i),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText(/password must be at least 6 characters/i),
        ).not.toBeInTheDocument();
      });
    });

    test("should not show validation errors on initial render", () => {
      expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
      expect(
        screen.queryByText(/password is required/i),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/enter a valid email address/i),
      ).not.toBeInTheDocument();
    });
  });

  describe("Negative Scenarios", () => {
    test("should show validation errors for empty form submission", async () => {
      const user = userEvent.setup();

      const submitBtn = screen.getByRole("button", { name: /log in/i });
      await user.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        expect(
          screen.getByText(/password must be at least 6 characters/i),
        ).toBeInTheDocument();
      });
    });

    test("should show error for invalid email format", async () => {
      const user = userEvent.setup();

      const emailInput = screen.getByPlaceholderText("Email");
      const submitBtn = screen.getByRole("button", { name: /log in/i });

      await user.type(emailInput, "invalid-email");
      await user.click(submitBtn);

      await waitFor(() => {
        expect(
          screen.getByText(/enter a valid email address/i),
        ).toBeInTheDocument();
      });
    });

    test("should show error for password that is too short", async () => {
      const user = userEvent.setup();

      const passwordInput = screen.getByPlaceholderText("Password");
      const submitBtn = screen.getByRole("button", { name: /log in/i });

      await user.type(passwordInput, "12345");
      await user.click(submitBtn);

      await waitFor(() => {
        expect(
          screen.getByText(/password must be at least 6 characters/i),
        ).toBeInTheDocument();
      });
    });

    test("should prevent submission and apply error styling for invalid inputs", async () => {
      const user = userEvent.setup();
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitBtn = screen.getByRole("button", { name: /log in/i });

      await user.type(emailInput, "bad-email");
      await user.type(passwordInput, "123");
      await user.click(submitBtn);

      await waitFor(() => {
        // Check for error messages
        expect(
          screen.getByText(/enter a valid email address/i),
        ).toBeInTheDocument();
        expect(
          screen.getByText(/password must be at least 6 characters/i),
        ).toBeInTheDocument();

        // Check for error styling - this depends on your CSS classes
        // You might need to check for specific class names
        expect(emailInput).toHaveClass(/error/i);
        expect(passwordInput).toHaveClass(/error/i);
      });

      // Form should not submit with invalid data
      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });
});
