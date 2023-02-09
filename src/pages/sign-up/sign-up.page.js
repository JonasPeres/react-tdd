import { useCallback, useState } from "react";
import Input from "../../components/input/input.component";
import Button from "../../components/button/button.component";

const SignUp = () => {
  const [state, setState] = useState({
    user: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const disableButton = useCallback(() => {
    return (
      (!state.password && !state.passwordRepeat) ||
      state.password !== state.passwordRepeat
    );
  }, [state]);

  return (
    <div>
      <form onSubmit={null}>
        <h1>Sign Up</h1>
        <Input
          label="User"
          name="user-name-input"
          id="user-name-input"
          value={state.user}
          onChange={(value) =>
            setState((prevState) => ({ ...prevState, user: value }))
          }
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
          value={state.password}
          onChange={(value) =>
            setState((prevState) => ({ ...prevState, password: value }))
          }
        />
        <Input
          label="Confirm Password"
          name="confirm-password-input"
          id="confirm-password-input"
          value={state.passwordRepeat}
          onChange={(value) =>
            setState((prevState) => ({ ...prevState, passwordRepeat: value }))
          }
        />
        <Button label={<span>Sign Up</span>} disabled={disableButton()} />
      </form>
    </div>
  );
};

export default SignUp;
