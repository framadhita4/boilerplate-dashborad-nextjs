import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import type { DatePickerProps } from '@mui/x-date-pickers';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { Control, FieldValues, Path } from 'react-hook-form';

import { cn } from '@/lib/utils';

import ControllWrapper from './FormControlWrapper';

interface Props<T extends FieldValues, TEnableAccessibleFieldDOMStructure extends boolean = false>
  extends Omit<DatePickerProps<Dayjs, TEnableAccessibleFieldDOMStructure>, 'ref'> {
  name: Path<T>;
  error?: boolean;
  control?: Control<T>;
  helperText?: string;
}

const DatePicker = <T extends FieldValues>({
  label,
  name,
  control,
  className,
  ...props
}: Props<T>) =>
  control ? (
    <ControllWrapper<T>
      name={name}
      control={control}
      render={({ onChange, ...field }) => (
        <>
          <InputLabel error={field.error} disabled={props.disabled} className="mb-1">
            {label}
          </InputLabel>
          <MuiDatePicker
            {...field}
            value={field.value ? dayjs(field.value) : null}
            className={cn({ 'border-red-500': field.error }, className)}
            onChange={(val) => {
              onChange(val?.format(props.format || 'DD-MM-YYYY'));
            }}
            format="YYYY-MM-DD"
            {...props}
          />
          <FormHelperText error={field.error}>{field.helperText}</FormHelperText>
        </>
      )}
    />
  ) : (
    <>
      <InputLabel error={props.error} disabled={props.disabled} className="mb-1">
        {label}
      </InputLabel>
      <MuiDatePicker
        value={props.value ? dayjs(props.value) : null}
        className={cn({ 'border-red-500': props.error }, className)}
        format="YYYY-MM-DD"
        {...props}
      />
      <FormHelperText error={props.error}>{props.helperText}</FormHelperText>
    </>
  );

export default DatePicker;
