import 'react-date-range/dist/styles.css'; // Main css file
import './date-range-picker.css';

import React, { useEffect, useState } from 'react';

import { Box, Popover } from '@mui/material';

import dayjs from 'dayjs';
import { DateRange, DateRangeProps } from 'react-date-range';
import { Control, FieldValues, Path } from 'react-hook-form';

import { colors } from '@/constant';

import ControllWrapper from '../FormControlWrapper';
import TextInput from '../TextInput';

export interface DateRangeType {
  start_date: Date;
  end_date: Date;
}

interface DateRangePickerbaseProps extends Omit<DateRangeProps, 'onChange'> {
  value?: DateRangeType;
  onChange?: (val: DateRangeType) => void;
  label?: string;
}

const DateRangePickerBase = ({ value, onChange, label, ...props }: DateRangePickerbaseProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [displayText, setDisplayText] = useState(dayjs().format('MM/DD/YYYY - MM/DD/YYYY'));

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'date-range-picker-popover' : undefined;

  const handleSelect = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;

    // Update the state with new start and end dates
    setDateRange([ranges.selection]);

    if (startDate && endDate) {
      const formattedDate = {
        start_date: dayjs(startDate).format('MM/DD/YYYY'),
        end_date: dayjs(endDate).format('MM/DD/YYYY'),
      };

      setDisplayText(`${formattedDate.start_date} - ${formattedDate.end_date}`);

      if (onChange) onChange({ start_date: startDate, end_date: endDate });
    }
  };

  useEffect(() => {
    if (value) {
      setDisplayText(
        `${dayjs(value.start_date).format('MM/DD/YYYY')} - ${dayjs(value.end_date).format('MM/DD/YYYY')}`,
      );
    }
  }, [value]);

  return (
    <Box display="flex" gap={2}>
      {/* Start Date TextField */}
      <TextInput label={label} value={displayText} onClick={handleClick} />

      {/* Popover for Date Range Picker */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <DateRange
          ranges={dateRange}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          rangeColors={[colors.primary[500]]}
          {...props}
        />
      </Popover>
    </Box>
  );
};

interface Props<T extends FieldValues> extends Omit<DateRangeProps, 'onChange'> {
  name?: Path<T>;
  control?: Control<T>;
  onChange?: (val: DateRangeType) => void;
  value?: DateRangeType;
  label?: string;
}

const DateRangePicker = <T extends FieldValues>({
  name,
  control,
  onChange,
  value,
  ...props
}: Props<T>) => {
  return control ? (
    <ControllWrapper
      name={name as Path<T>}
      control={control}
      render={(params) => (
        <DateRangePickerBase
          value={params.value}
          onChange={(val) => params.onChange(val)}
          {...props}
        />
      )}
    />
  ) : (
    <DateRangePickerBase onChange={onChange} value={value} {...props} />
  );
};

export default DateRangePicker;
