import { type ParentComponent, JSX } from "solid-js";

export const Button: ParentComponent<
  { classes?: string } & JSX.ButtonHTMLAttributes<{}>
> = (props) => {
  return (
    <button class="btn" classList={{ [props.classes ?? ""]: true }}>
      {props.children}
    </button>
  );
};
