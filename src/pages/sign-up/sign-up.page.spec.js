import SignUp from "./sign-up.page";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

describe("Sign Up Page", () => {
  let header;
  let usernameInput;
  let emailInput;
  let passwordInput;
  let passwordConfirmInput;
  let button;

  const setupPage = () => {
    render(<SignUp />);

    header = screen.getByRole("heading", {
      level: 1,
      name: "Sign Up",
    });
    usernameInput = screen.getByLabelText("User");
    emailInput = screen.getByLabelText("E-mail");
    passwordInput = screen.getByLabelText("Password");
    passwordConfirmInput = screen.getByLabelText("Confirm Password");
    button = screen.getByRole("button", { type: "submit" });
  };

  const fillInputs = () => {
    userEvent.type(usernameInput, "jonasperes");
    userEvent.type(emailInput, "jonasperes10@hotmail.com");
    userEvent.type(passwordInput, "gonnaPass");
    userEvent.type(passwordConfirmInput, "gonnaPass");
  };

  describe("Layout", () => {
    it("Has Header", () => {
      setupPage();
      expect(header).toBeInTheDocument();
    });
    it("Has UserName Input", () => {
      setupPage();
      expect(usernameInput).toBeInTheDocument();
    });
    it("Has E-mail Input", () => {
      setupPage();
      expect(emailInput).toBeInTheDocument();
    });
    it("Has Password Input", () => {
      setupPage();
      expect(passwordInput).toBeInTheDocument();
    });
    it("Has Password Confirm Input", () => {
      setupPage();
      expect(passwordConfirmInput).toBeInTheDocument();
    });
    it("Has Confirm Button and is disabled", () => {
      setupPage();
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });

  describe("Interactions", () => {
    it("Enable Button when passwords have same value", () => {
      setupPage();
      fillInputs();
      expect(button).toBeEnabled();
    });
    it("Show Loading after click the button", () => {
      setupPage();
      fillInputs();
      userEvent.click(button);
      expect(button).toHaveClass("loading");
    });
    it("Send username, email and password after click the button", () => {
      setupPage();
      fillInputs();
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
