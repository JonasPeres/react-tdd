/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { ToastContainer } from "react-toastify";
import SignUp from "./sign-up.page";

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

  beforeEach(() => {
    setupSignUpPage();
  });

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
    let body;
    let counterClick = 0;

    const server = setupServer(
      rest.post("/api/1.0/users", (req, res, ctx) => {
        counterClick += 1;
        body = req.body;
        return res(ctx.status(200), ctx.text({ message: "User created" }));
      })
    );

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

    const expectedBody = {
      username: "jonasperes",
      email: "jonasperes10@hotmail.com",
      password: "gonnaPass",
    };

    const successMessage = "User created";

    const showErrorMessage = (message) => {
      return "• " + message;
    };

    beforeAll(() => server.listen());

    afterAll(() => server.close());

    beforeEach(() => {
      counterClick = 0;
      server.resetHandlers();
      fillInputs();
    });

    it("Enable Button when passwords have same value", () => {
      expect(button).toBeEnabled();
    });
    it("Show Loading after click the button", () => {
      buttonClick();
      expect(button).toHaveClass("loading");
    });
    it("Disable Button when wait for api response", async () => {
      buttonClick();
      expect(button).toHaveClass("loading");
      buttonClick();
      buttonClick();
      buttonClick();
      await waitFor(() => {
        expect(button).not.toHaveClass("loading");
      });
      expect(counterClick).toBe(1);
    });
    it("Send username, email and password after click the button", () => {
      buttonClick();
      expect(body).toEqual(expectedBody);
    });
    it("Show success message after api response successfully", async () => {
      expect(screen.queryByText(successMessage)).not.toBeInTheDocument();
      buttonClick();
      expect(await screen.findByText(successMessage)).toBeInTheDocument();
    });
    it("Show error message after api response with error", async () => {
      server.use(
        rest.post("/api/1.0/users", (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              validationErrors: { username: "Username cannot be null" },
            })
          );
        })
      );
      setupServer();
      userEvent.click(button);
      const validationError = await screen.findByText(
        showErrorMessage("Username cannot be null")
      );
      expect(validationError).toBeInTheDocument();
    });
  });
});
