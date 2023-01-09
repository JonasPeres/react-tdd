import { Component } from "react";
import "./button.component.css";

class Button extends Component {
  render() {
    return (
      <button
        type={this.props.type}
        onClick={null}
        id={this.props.id}
        style={{
          backgroundColor: this.props.background,
          color: this.props.color,
        }}
        disabled={this.props.disabled}
      >
        {this.props.label}
      </button>
    );
  }
}

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
