'use client';

/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import 'react-day-picker/style.css';

import { useEffect, useRef, useState } from 'react';

import { Box, IconButton, Popover } from '@mui/material';

import dayjs from 'dayjs';
import { ChevronLeft } from 'lucide-react';
import { DayPicker, DayPickerProps, getDefaultClassNames, Modifiers } from 'react-day-picker';
import { Control, FieldValues, Path } from 'react-hook-form';

import { cn } from '@/lib/utils';

import ControllWrapper from './FormControlWrapper';
import TextInput from './TextInput';

export interface DateRangType {
  from: string;
  to: string;
}

interface DatePickerBaseProps extends Omit<DayPickerProps, 'onChange'> {
  label?: string;
  onChange?: (val: string) => void;
  value?: string;
  error?: boolean;
  helperText?: string;
}

const getButtonProps = (modifiers: Modifiers): any => {
  if (modifiers.range_middle) {
    return {
      color: 'secondary',
      variant: 'dashed',
    };
  }

  if (modifiers.selected) {
    return {
      color: 'primary',
      variant: 'contained',
    };
  }

  if (modifiers.today) {
    return {
      variant: 'outlined',
    };
  }

  return {};
};

const DatePickerBase = ({
  className,
  label,
  mode = 'single',
  onChange,
  value,
  error,
  helperText,
  ...props
}: DatePickerBaseProps) => {
  const [textInputValue, setTextInputValue] = useState('');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedDateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [selectedDateMultiple, setSelectedDateMultiple] = useState<Date[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'date-range-picker-popover' : undefined;

  const handleSelectSingle = (date: Date | undefined) => {
    if (date) {
      const text = dayjs(date).format('YYYY-MM-DD');

      setSelectedDate(date);
      setTextInputValue(text);
      onChange?.(text);
      handleClose();
    }
  };

  const handleSelectRange = (
    range: { from: Date | undefined; to: Date | undefined } | undefined,
  ) => {
    if (range && range.from && range.to) {
      const text = `${dayjs(range.from).format('YYYY-MM-DD')} to ${dayjs(range.to).format('YYYY-MM-DD')}`;

      setDateRange(range);
      setTextInputValue(text);
      onChange?.(text);
    }
  };

  const handleSelectMultiple = (dates: Date[] | undefined) => {
    if (dates) {
      const text = dates.map((date) => dayjs(date).format('YYYY-MM-DD')).join(', ');

      setSelectedDateMultiple(dates);
      setTextInputValue(text);
      onChange?.(text);
    }
  };

  useEffect(() => {
    if (typeof value !== 'undefined') {
      if (mode === 'single') {
        setSelectedDate(dayjs(value || undefined).toDate());
        setTextInputValue(value);
      } else if (mode === 'range') {
        const [from, to] = value.split(' to ');

        setDateRange({
          from: dayjs(from || undefined).toDate(),
          to: dayjs(to || undefined).toDate(),
        });
        setTextInputValue(value);
      } else if (mode === 'multiple') {
        const dates = value.split(', ').map((date) => dayjs(date).toDate());
        setSelectedDateMultiple(dates);
        setTextInputValue(value);
      }
    }
  }, [value]);

  return (
    <>
      <Box className={cn(className)}>
        <TextInput
          label={label}
          fullWidth
          value={textInputValue}
          error={error}
          helperText={helperText}
          slotProps={{
            input: {
              onClick: handleClick,
              readOnly: true,
            },
          }}
        />
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            className: 'p-2',
          },
        }}
      >
        <DayPicker
          {...props}
          mode={mode}
          selected={
            (mode === 'single'
              ? selectedDate
              : mode === 'range'
                ? selectedDateRange
                : selectedDateMultiple) as any
          }
          onSelect={
            (mode === 'single'
              ? handleSelectSingle
              : mode === 'range'
                ? handleSelectRange
                : handleSelectMultiple) as any
          }
          classNames={{
            ...getDefaultClassNames(),
            month_caption: 'pl-3 my-2 text-lg',
          }}
          components={{
            DayButton: (buttonProps) => {
              const { day, modifiers, onClick } = buttonProps;
              return (
                <IconButton
                  {...getButtonProps(modifiers)}
                  onClick={onClick}
                  className="h-11 w-11 text-sm"
                >
                  {dayjs(day.date).format('DD')}
                </IconButton>
              );
            },
            NextMonthButton: ({ onClick }) => (
              <IconButton color="primary" onClick={onClick}>
                <ChevronLeft className="rotate-180" />
              </IconButton>
            ),
            PreviousMonthButton: ({ onClick }) => (
              <IconButton color="primary" onClick={onClick}>
                <ChevronLeft />
              </IconButton>
            ),
          }}
        />
      </Popover>
    </>
  );
};
interface Props<T extends FieldValues> extends Omit<DayPickerProps, 'onChange'> {
  control?: Control<T>;
  name: Path<T>;
  label?: string;
  value?: string;
  onChange?: (val: string) => void;
}

const DatePicker = <T extends FieldValues>({ control, name, ...props }: Props<T>) => {
  return control ? (
    <ControllWrapper
      name={name}
      control={control}
      render={(params) => <DatePickerBase {...params} {...props} />}
    />
  ) : (
    <DatePickerBase {...props} />
  );
};

export default DatePicker;
