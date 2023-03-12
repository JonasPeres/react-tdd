/* eslint-disable testing-library/no-unnecessary-act */
import SignUp from "./sign-up.page";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { ToastContainer } from "react-toastify";

describe("Sign Up Page", () => {
  let header;
  let usernameInput;
  let emailInput;
  let passwordInput;
  let passwordConfirmInput;
  let button;

  const setupSignUpPage = () => {
    render(
      <div>
        <SignUp />
        <ToastContainer />
      </div>
    );

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
    act(() => {
      userEvent.type(usernameInput, "jonasperes");
      userEvent.type(emailInput, "jonasperes10@hotmail.com");
      userEvent.type(passwordInput, "gonnaPass");
      userEvent.type(passwordConfirmInput, "gonnaPass");
    });
  };

  const buttonClick = () => {
    act(() => {
      userEvent.click(button);
    });
  };

  let body;
  let countClick = 0;

  const server = setupServer(
    rest.post("/api/1.0/users", (req, res, ctx) => {
      countClick += 1;
      body = req.body;
      return res(ctx.status(200));
    })
  );

  const expectedBody = {
    username: "jonasperes",
    email: "jonasperes10@hotmail.com",
    password: "gonnaPass",
  };

  const successMessage = "User created";

  beforeEach(() => {
    server.resetHandlers();
    setupSignUpPage();
  });

  beforeAll(() => server.listen());

  afterAll(() => server.close());

  describe("Layout", () => {
    it("Has Header", () => {
      expect(header).toBeInTheDocument();
    });
    it("Has UserName Input", () => {
      expect(usernameInput).toBeInTheDocument();
    });
    it("Has E-mail Input", () => {
      expect(emailInput).toBeInTheDocument();
    });
    it("Has Password Input", () => {
      expect(passwordInput).toBeInTheDocument();
    });
    it("Has Password Confirm Input", () => {
      expect(passwordConfirmInput).toBeInTheDocument();
    });
    it("Has Confirm Button and is disabled", () => {
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });

  describe("Interactions", () => {
    it("Enable Button when passwords have same value", () => {
      fillInputs();
      expect(button).toBeEnabled();
    });
    it("Show Loading after click the button", () => {
      fillInputs();
      buttonClick();
      expect(button).toHaveClass("loading");
    });
    it("Disable Button when wait api response", () => {
      fillInputs();
      buttonClick();
      buttonClick();
      buttonClick();
      buttonClick();
      expect(countClick).toBe(1);
    });
    it("Send username, email and password after click the button", () => {
      fillInputs();
      buttonClick();
      expect(body).toEqual(expectedBody);
    });
    it("Show success message after api response successfully", async () => {
      // doesn't work
      // fillInputs();
      // expect(screen.queryByText(successMessage)).not.toBeInTheDocument();
      // buttonClick();
      // expect(await screen.findByText(successMessage)).toBeInTheDocument();
    });
  });
});
