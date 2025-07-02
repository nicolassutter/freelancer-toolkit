import {
  type Component,
  createUniqueId,
  type JSX,
  type JSXElement,
  Show,
} from "solid-js";

export const TextInput: Component<
  {
    value?: string;
    label: JSXElement;
    placeholder?: string;
    hint?: JSXElement;
    error?: JSXElement;
    /** @see https://daisyui.com/components/input/ */
    inputClasses?: string;
    onChange?: (value: string) => void;
    onInput?: (value: string) => void;
  } & Pick<JSX.InputHTMLAttributes<{}>, "type">
> = (props) => {
  const id = createUniqueId();
  const inputId = `${id}-label`;
  const hintId = `${id}-hint`;
  const errorOrHint = () => props.error || props.hint;

  return (
    <div class="fieldset">
      <label for={inputId} class="fieldset-legend">
        {props.label}
      </label>
      <input
        id={inputId}
        type={props.type}
        class="input"
        classList={{
          [props.inputClasses ?? ""]: true,
          "input-error": !!props.error,
        }}
        aria-describedby={errorOrHint() ? hintId : undefined}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange?.(e.currentTarget.value)}
        onInput={(e) => props.onInput?.(e.currentTarget.value)}
      />
      <Show when={errorOrHint()}>
        <p
          id={hintId}
          class="label"
          classList={{
            "text-error": !!props.error,
          }}
        >
          {errorOrHint()}
        </p>
      </Show>
    </div>
  );
};
