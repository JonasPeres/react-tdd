import "./button.component.css";

const Button = (props) => {
  return (
    <button
      className={`${props.disabled ? "disabled " : ""}`}
      type={props.type}
      onClick={props.onClick}
      id={props.id}
      style={{
        backgroundColor: props.background,
        color: props.color,
      }}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
};

const randomId = `random-id-button-${(1 + Date.now() + Math.random())
  .toString()
  .replace(".", "")}`;

Button.defaultProps = {
  id: randomId,
  background: "#299C39",
  color: "#F6F6F8",
  label: "Confirm",
  type: "submit",
};

export default Button;
