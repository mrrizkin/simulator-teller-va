import { HTMLProps } from "react";

export const TextInput = (props: HTMLProps<HTMLInputElement>) => {
  return (
    <input
      type="text"
      className="block bg-transparent border-3 border-gray-500 rounded-md p-2 w-[300px] outline-none focus:border-blue-500"
      {...props}
    />
  );
};

export const Label = (props: HTMLProps<HTMLLabelElement>) => {
  return (
    <label {...props} className="text-xl block font-bold mb-4">
      {props.children}
    </label>
  );
};
