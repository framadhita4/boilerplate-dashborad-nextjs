'use client';

import MuiAutocomplete, { type AutocompleteProps } from '@mui/material/Autocomplete';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

import { Control, FieldValues, Path } from 'react-hook-form';

import ControllWrapper from './FormControlWrapper';

export interface AutocompleteOptionsType {
  label: string;
  value: string;
}

interface Props<T extends FieldValues>
  extends Omit<
    AutocompleteProps<AutocompleteOptionsType, boolean, boolean, boolean>,
    'renderInput'
  > {
  renderInput?: AutocompleteProps<
    AutocompleteOptionsType,
    boolean,
    boolean,
    boolean
  >['renderInput'];
  renderInputProps?: TextFieldProps;
  name: Path<T>;
  control: Control<T>;
}

const AutoComplete = <T extends FieldValues>({
  renderInputProps = {},
  options,
  renderInput,
  name,
  control,
  slotProps,
  ...props
}: Props<T>) => {
  const getValue = (value: any | any[]) => {
    if (Array.isArray(value) || props.multiple) {
      return options.filter((option) => value.includes(option.value)) || [];
    }
    return (
      options.find(
        (option) => option.value === (typeof value === 'string' ? value : value?.value),
      ) || null
    );
  };

  return (
    <ControllWrapper
      name={name}
      control={control}
      render={({ onChange, error, helperText, value, ...field }) => {
        const defaultRenderInput = (params: any) => (
          <TextField error={error} helperText={helperText} {...params} {...renderInputProps} />
        );
        return (
          <MuiAutocomplete
            options={options}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.label || '')}
            renderInput={renderInput || defaultRenderInput}
            isOptionEqualToValue={(option, val) =>
              typeof val === 'string' ? option.value === val : option.value === val.value
            }
            onChange={(event, val) => {
              const typedVal = val as AutocompleteOptionsType | AutocompleteOptionsType[] | null;

              if (Array.isArray(typedVal)) {
                onChange(typedVal.map((d) => d.value));
              } else if (typeof typedVal === 'object' && typedVal !== null) {
                onChange(typedVal.value);
              } else {
                onChange(null);
              }
            }}
            value={getValue(value)}
            slotProps={{
              chip: {
                className: 'max-w-52 truncate mr-1',
              },
              ...slotProps,
            }}
            {...props}
            {...field}
          />
        );
      }}
    />
  );
};

export default AutoComplete;
