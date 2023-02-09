import SignUp from "./sign-up.page";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Sign Up Page", () => {
  describe("Layout", () => {
    it("Has Header", () => {
      render(<SignUp />);
      const header = screen.getByRole("heading", {
        level: 1,
        name: "Sign Up",
      });
      expect(header).toBeInTheDocument();
    });
    it("Has UserName Input", () => {
      render(<SignUp />);
      const input = screen.getByLabelText("User");
      expect(input).toBeInTheDocument();
    });
    it("Has E-mail Input", () => {
      render(<SignUp />);
      const input = screen.getByLabelText("E-mail");
      expect(input).toBeInTheDocument();
    });
    it("Has Password Input", () => {
      render(<SignUp />);
      const input = screen.getByLabelText("Password");
      expect(input).toBeInTheDocument();
    });
    it("Has Password Confirm Input", () => {
      render(<SignUp />);
      const input = screen.getByLabelText("Confirm Password");
      expect(input).toBeInTheDocument();
    });
    it("Has Confirm Button", () => {
      render(<SignUp />);
      const button = screen.getByRole("button", { type: "submit" });
      expect(button).toBeDisabled();
    });
  });
  describe("Interactions", () => {
    it("Enable Button when passwords have same value", () => {
      render(<SignUp />);
      const passwordInput = screen.getByLabelText("Password");
      const passwordRepeatInput = screen.getByLabelText("Confirm Password");
      userEvent.type(passwordInput, "gonnaPass");
      userEvent.type(passwordRepeatInput, "gonnaPass");
      const button = screen.getByRole("button", { type: "submit" });
      expect(button).toBeEnabled();
    });
  });
});
