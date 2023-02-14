import SignUp from "./sign-up.page";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

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
    it("Has Confirm Button and is disabled", () => {
      render(<SignUp />);
      const button = screen.getByRole("button", { type: "submit" });
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });
  describe("Interactions", () => {
    it("Enable Button when passwords have same value", () => {
      render(<SignUp />);
      const passwordInput = screen.getByLabelText("Password");
      const passwordConfirmInput = screen.getByLabelText("Confirm Password");
      userEvent.type(passwordInput, "gonnaPass");
      userEvent.type(passwordConfirmInput, "gonnaPass");
      const button = screen.getByRole("button", { type: "submit" });
      expect(button).toBeEnabled();
    });
    it("Send username, email and password after click the button", () => {
      render(<SignUp />);
      const username = screen.getByLabelText("User");
      const email = screen.getByLabelText("E-mail");
      const passwordInput = screen.getByLabelText("Password");
      const passwordConfirmInput = screen.getByLabelText("Confirm Password");
      userEvent.type(username, "jonasperes");
      userEvent.type(email, "jonasperes10@hotmail.com");
      userEvent.type(passwordInput, "gonnaPass");
      userEvent.type(passwordConfirmInput, "gonnaPass");
      const button = screen.getByRole("button", { type: "submit" });

      axios.post = jest.fn();

      userEvent.click(button);

      const callPost = axios.post.mock.calls[0];
      const body = callPost[1];

      expect(body).toEqual({
        username: "jonasperes",
        email: "jonasperes10@hotmail.com",
        password: "gonnaPass",
      });
    });
  });
});
