import { HTMLProps } from "react";

export const TextInput = (props: HTMLProps<HTMLInputElement>) => {
  let { className, ...rest } = props;

  let defaultClassName =
    "block bg-transparent rounded-md w-full outline-none focus:border-blue-500";

  return (
    <input
      type="text"
      className={`${defaultClassName} ${className}`}
      {...rest}
    />
  );
};

export const Label = (props: HTMLProps<HTMLLabelElement>) => {
  let { className, ...rest } = props;

  let defaultClassName = "block font-bold mb-4";

  return (
    <label {...rest} className={`${defaultClassName} ${className}`}>
      {props.children}
    </label>
  );
};
