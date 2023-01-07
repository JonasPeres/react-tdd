import SignUp from "./sign-up.page";
import { render, screen } from "@testing-library/react";

it("Has Header", () => {
  render(<SignUp />);
  const header = screen.queryByRole("heading", { name: "Sign Up" });
  expect(header).toBeInTheDocument();
});
