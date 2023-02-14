import { useCallback, useState } from "react";
import Input from "../../components/input/input.component";
import Button from "../../components/button/button.component";
import { signUp } from "../../services/api-call.service";

const SignUpPage = () => {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const submit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const response = await signUp({
          username: state.username,
          email: state.email,
          password: state.password,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    [state]
  );

  const disableButton = useCallback(() => {
    return (
      (!state.password && !state.passwordConfirm) ||
      state.password !== state.passwordConfirm
    );
  }, [state]);

  return (
    <div>
      <form onSubmit={submit}>
        <h1>Sign Up</h1>
        <Input
          label="User"
          name="user-name-input"
          id="user-name-input"
          value={state.username}
          onChange={(value) =>
            setState((prevState) => ({ ...prevState, username: value }))
          }
          autocomplete="username"
        />
        <Input
          label="E-mail"
          name="email-input"
          id="email-input"
          value={state.email}
          onChange={(value) =>
            setState((prevState) => ({ ...prevState, email: value }))
          }
        />
        <Input
          label="Password"
          name="password-input"
          id="password-input"
          type="password"
          value={state.password}
          onChange={(value) =>
            setState((prevState) => ({ ...prevState, password: value }))
          }
          autocomplete="new-password"
        />
        <Input
          label="Confirm Password"
          name="confirm-password-input"
          id="confirm-password-input"
          type="password"
          value={state.passwordConfirm}
          onChange={(value) =>
            setState((prevState) => ({ ...prevState, passwordConfirm: value }))
          }
          autocomplete="new-password"
        />
        <Button label={<span>Sign Up</span>} disabled={disableButton()} />
      </form>
    </div>
  );
};

export default SignUpPage;
