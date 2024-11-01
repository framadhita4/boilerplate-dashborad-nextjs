import {
  type Control,
  Controller,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from 'react-hook-form';

export interface RenderProps extends ControllerRenderProps<FieldValues, string> {
  error: boolean;
  helperText: string | undefined;
}

interface Props<T extends FieldValues> {
  name: Path<T>;
  control?: Control<T, object>;
  render: ({
    error,
    helperText,
    name,
    onBlur,
    onChange,
    ref,
    value,
    disabled,
  }: RenderProps) => React.ReactElement;
}

const ControllWrapper = <T extends FieldValues>({ name, control, render }: Props<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, formState: { errors } }) =>
      render({
        ...field,
        error: !!errors[name],
        helperText: (errors[name]?.message as string) || undefined,
      })
    }
  />
);

export default ControllWrapper;
