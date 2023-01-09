import Input from "../../components/input/input.component";
import Button from "../../components/button/button.component";

const SignUp = () => {
  return (
    <div>
      <form onSubmit={null}>
        <h1>Sign Up</h1>
        <Input label="User" name="user-name-input" id="user-name-input" />
        <Input label="E-mail" name="email-input" id="email-input" />
        <Input label="Password" name="password-input" id="password-input" />
        <Input
          label="Confirm Password"
          name="confirm-password-input"
          id="confirm-password-input"
        />
        <Button />
      </form>
    </div>
  );
};

export default SignUp;
