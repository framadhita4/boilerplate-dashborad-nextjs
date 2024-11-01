'use client';

import React, { useEffect, useRef } from 'react';

import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize, { type TextareaAutosizeProps } from '@mui/material/TextareaAutosize';

import type { Control, FieldValues, Path } from 'react-hook-form';

import { cn } from '@/lib/utils';

import ControllWrapper from './FormControlWrapper';

interface Props<T extends FieldValues> extends TextareaAutosizeProps {
  error?: boolean;
  label?: string;
  control?: Control<T>;
  name: Path<T>;
}

const TextAreaInput = <T extends FieldValues>({
  label,
  name,
  placeholder,
  className,
  error,
  control,
  ...props
}: Props<T>) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    // const textarea = textareaRef.current;
    // console.log("🚀 ~ autoResize ~ textarea:", textarea);
    // if (textarea) {
    // 	console.log(textarea.scrollHeight);
    // 	textarea.style.minHeight = "auto";
    // 	textarea.style.minHeight = `${textarea.scrollHeight}px`;
    // }
  };

  useEffect(() => {
    autoResize(); // Initial resize when the component mounts
  }, []);

  return control ? (
    <ControllWrapper
      name={name}
      control={control}
      render={({ helperText, error: validationError, ...field }) => (
        <>
          {label && (
            <InputLabel error={error || validationError} className="mb-1">
              {label}
            </InputLabel>
          )}
          <TextareaAutosize
            placeholder={placeholder || label}
            className={`${cn('!p-4', className)} ${error || validationError ? 'error' : ''}`}
            onInput={autoResize}
            {...field}
            {...props}
            ref={textareaRef}
          />
          <FormHelperText error={error || validationError}>{helperText}</FormHelperText>
        </>
      )}
    />
  ) : (
    <>
      {label && (
        <InputLabel error={error} className="mb-1">
          {label}
        </InputLabel>
      )}
      <TextareaAutosize
        placeholder={placeholder || label}
        className={`${cn('!p-4', className)} ${error ? 'error' : ''}`}
        onInput={autoResize}
        {...props}
        ref={textareaRef}
      />
    </>
  );
};

export default TextAreaInput;
