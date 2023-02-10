import { useCallback, useEffect, useState } from "react";
import "./input.component.css";

const Input = (props) => {
  const [state, setState] = useState("");

  useEffect(() => {
    if (state !== props.value) {
      setState(props.value);
    }
  }, [state, props.value]);

  const handleChange = useCallback(
    (event) => {
      const newValue = event?.target?.value || (event?.length ? event : "");

      setState(newValue);

      if (props.onChange && typeof props.onChange === "function") {
        props.onChange(newValue);
      }
    },
    [props]
  );

  return (
    <div className="wrapper-input">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        name={props.name}
        id={props.id}
        type={props.type}
        value={state}
        onChange={handleChange}
        autoComplete={props.autocomplete}
      />
    </div>
  );
};

const randomId = `random-id-input-${(1 + Date.now() + Math.random())
  .toString()
  .replace(".", "")}`;

Input.defaultProps = {
  id: randomId,
  type: "text",
};

export default Input;
