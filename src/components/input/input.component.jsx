import { useCallback, useEffect, useState } from "react";
import "./input.component.css";

const Input = (props) => {
  const randomId = `random-id-input-${(1 + Date.now() + Math.random())
    .toString()
    .replace(".", "")}`;

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
      <label htmlFor={props.id || randomId}>{props.label}</label>
      <input
        id={props.id || randomId}
        name={props.name}
        value={state}
        onChange={handleChange}
        type={props.type || "text"}
        autoComplete={props.autocomplete}
      />
    </div>
  );
};

export default Input;
