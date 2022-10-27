import { HTMLProps } from "react";

const HackButton = (props: HTMLProps<HTMLButtonElement>) => {
  let { className, type, ...rest } = props;
  let defaultClassName = "btn-hacktober";

  return (
    <button
      type={
        type === "button"
          ? type
          : type === "submit"
          ? type
          : type === "reset"
          ? type
          : undefined
      }
      className={`${defaultClassName} ${className}`}
      {...rest}
    >
      {props.children}
    </button>
  );
};

export default HackButton;
