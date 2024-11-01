import React from 'react';

import { Switch as MuiSwitch, SwitchProps } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

import type { Control, FieldValues, Path } from 'react-hook-form';

import ControllWrapper from './FormControlWrapper';

interface Props<T extends FieldValues> extends SwitchProps {
  name: Path<T>;
  control?: Control<T>;
  label?: string;
}

const Switch = <T extends FieldValues>({ label, name, control, ...props }: Props<T>) =>
  control ? (
    <ControllWrapper
      name={name}
      control={control}
      render={({ helperText: _, error: __, ...field }) => (
        <FormControlLabel
          control={<MuiSwitch defaultChecked={field.value} {...field} {...props} />}
          label={label}
        />
      )}
    />
  ) : (
    <FormControlLabel control={<MuiSwitch {...props} />} label={label} />
  );

export default Switch;
