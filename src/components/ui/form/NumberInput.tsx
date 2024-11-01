'use client';

import { ChangeEvent, forwardRef } from 'react';

import type { TextFieldProps } from '@mui/material/TextField';

import type { Control, FieldValues, Path } from 'react-hook-form';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

import TextInput from './TextInput';

interface Props<T extends FieldValues> extends Omit<TextFieldProps, 'outlined'> {
  name: Path<T>;
  control?: Control<T>;
}

const NumberFormatCustom = forwardRef<NumericFormatProps, NumericFormatProps>((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      allowLeadingZeros
      thousandSeparator=","
      onValueChange={(values) => {
        if (onChange) {
          onChange({
            target: {
              name: props.name || '',
              value: values.floatValue || 0,
            },
          } as unknown as ChangeEvent<HTMLInputElement>);
        }
      }}
    />
  );
});

const NumberInput = <T extends FieldValues>({ name, control, InputProps, ...props }: Props<T>) => {
  return (
    <TextInput
      name={name as Path<T>}
      control={control}
      {...props}
      InputProps={{ ...InputProps, inputComponent: NumberFormatCustom as any }}
    />
  );
};

export default NumberInput;
