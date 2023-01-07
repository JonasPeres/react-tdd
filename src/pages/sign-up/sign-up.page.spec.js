import SignUp from "./sign-up.page";
import { render, screen } from "@testing-library/react";

describe("Sign Up Page", () => {
  describe("Layout", () => {
    it("Has Header", () => {
      render(<SignUp />);
      const header = screen.queryByRole("heading", { name: "Sign Up" });
      expect(header).toBeInTheDocument();
    });
    it("Has UserName Input", () => {
      render(<SignUp />);
      const inputs = screen.getAllByRole("textbox");
      expect(inputs.length).toBe(2);
    });
  });
});
