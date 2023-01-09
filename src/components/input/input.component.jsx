import { Component } from "react";
import "./input.component.css";

class Input extends Component {
  render() {
    return (
      <div className="wrapper-input">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          name={this.props.name}
          id={this.props.id}
          type={this.props.type}
        />
      </div>
    );
  }
}

const randomId = `random-id-input-${(1 + Date.now() + Math.random())
  .toString()
  .replace(".", "")}`;

Input.defaultProps = {
  id: randomId,
  type: "text",
};

export default Input;
