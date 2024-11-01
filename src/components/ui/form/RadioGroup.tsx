import React from 'react';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import MuiRadioGroup, { type RadioGroupProps } from '@mui/material/RadioGroup';

import type { Control, FieldValues, Path } from 'react-hook-form';

import ControllWrapper from './FormControlWrapper';

interface Props<T extends FieldValues> extends RadioGroupProps {
  name: Path<T>;
  control?: Control<T>;
  label: string;
  items: { label: string; value: unknown }[];
  disabled?: boolean;
}

const RadioGroup = <T extends FieldValues>({
  label,
  name,
  control,
  items,
  disabled,
  ...props
}: Props<T>) =>
  control ? (
    <ControllWrapper
      name={name}
      control={control}
      render={({ helperText: _, error: __, ...field }) => (
        <>
          <FormLabel className="mb-1">{label}</FormLabel>
          <MuiRadioGroup className="flex-row-center" {...field} {...props}>
            {items.map((item, i) => (
              <FormControlLabel
                value={item.value}
                key={i}
                control={<Radio />}
                label={item.label}
                disabled={disabled}
              />
            ))}
          </MuiRadioGroup>
        </>
      )}
    />
  ) : (
    <>
      <FormLabel className="mb-1">{label}</FormLabel>
      <MuiRadioGroup className="flex-row-center" {...props}>
        {items.map((item, i) => (
          <FormControlLabel
            value={item.value}
            key={i}
            control={<Radio />}
            label={item.label}
            disabled={disabled}
          />
        ))}
      </MuiRadioGroup>
    </>
  );

export default RadioGroup;
