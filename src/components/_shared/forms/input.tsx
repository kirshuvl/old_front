import { FieldProps, Field } from "solid-form-handler";
import { Component, JSX, Show, splitProps } from "solid-js";

export type TextInputProps = JSX.InputHTMLAttributes<HTMLInputElement> & FieldProps & { label?: string };

export const TextInput: Component<TextInputProps> = (props) => {
    const [local, rest] = splitProps(props, ["classList", "label", "formHandler"]);

    return (
        <Field
            {...props}
            mode="input"
            render={(field) => (
                <div classList={local.classList}>
                    <Show when={local.label}>
                        <label class="form-label" for={field.props.id}>
                            {local.label}
                        </label>
                    </Show>

                    <input
                        class={`bg-slate-50 rounded-lg w-full border-slate-300 hover:border-blue-500 focus:ring-4 focus:ring-blue-400 px-4 py-3  ${
                            field.props.value !== "" ? "text-black" : "text-gray-500"
                        }`}
                        {...rest}
                        {...field.props}
                        classList={{
                            "is-invalid": field.helpers.error,
                            "form-control": true,
                        }}
                    />
                    <Show when={field.helpers.error}>
                        <div class="invalid-feedback">{field.helpers.errorMessage}</div>
                    </Show>
                </div>
            )}
        />
    );
};
