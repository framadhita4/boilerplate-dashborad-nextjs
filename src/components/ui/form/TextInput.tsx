import React from 'react';

// import InputLabel from '@mui/material/InputLabel';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

import type { Control, FieldValues, Path } from 'react-hook-form';

import ControllWrapper from './FormControlWrapper';

interface Props<T extends FieldValues> extends Omit<TextFieldProps, 'outlined'> {
  name?: Path<T>;
  control?: Control<T>;
}

const TextInput = <T extends FieldValues>({ placeholder, name, control, ...props }: Props<T>) =>
  control ? (
    <ControllWrapper<T>
      name={name as Path<T>}
      control={control}
      render={({ ...field }) => (
        <TextField hiddenLabel placeholder={placeholder} {...field} {...props} />
      )}
    />
  ) : (
    <TextField hiddenLabel placeholder={placeholder} {...props} />
  );

export default TextInput;
