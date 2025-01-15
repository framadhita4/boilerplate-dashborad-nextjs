import React, { useRef } from 'react';

import { Typography } from '@mui/material';

import { Camera } from 'lucide-react';
import { Control, FieldValues, Path } from 'react-hook-form';

import ImageContainer from '@/components/ImageContainer';
import ControllWrapper from '@/components/ui/form/FormControlWrapper';

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  value?: string | File;
}

const ProfileImageInput = <T extends FieldValues>({
  control,
  name,
  value: initialValue,
}: Props<T>) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      fileInputRef.current?.click();
    }
  };

  return (
    <ControllWrapper
      name={name}
      control={control}
      render={({ onChange, value, error, helperText }) => {
        return (
          <>
            <input
              type="file"
              name=""
              className="hidden"
              ref={fileInputRef}
              onChange={(event) => {
                onChange(event.target.files?.[0]);
              }}
            />
            <div
              className={`size-52 cursor-pointer overflow-hidden rounded-full border border-dashed p-3 ${error ? 'border-red-500' : 'border-gray-200'}`}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              {value ? (
                <ImageContainer
                  src={typeof value === 'string' ? value : URL.createObjectURL(value)}
                  alt={value?.name}
                  className="size-full rounded-full"
                >
                  <div className="relative flex size-full flex-col items-center justify-center rounded-full bg-black/70 p-3 text-white opacity-0 transition hover:opacity-100">
                    <Camera className="size-16 text-white" strokeWidth={1.5} />
                    <Typography variant="body2" className="text-white">
                      Update photo
                    </Typography>
                  </div>
                </ImageContainer>
              ) : (
                <div
                  className={`flex size-full flex-col items-center justify-center rounded-full transition hover:opacity-70 ${error ? 'bg-red-100/70' : 'bg-gray-100'}`}
                >
                  <Camera
                    className={`size-16 ${error ? 'text-red-500' : 'text-gray-400'}`}
                    strokeWidth={1.5}
                  />
                  <Typography
                    variant="body2"
                    className={`${error ? 'text-red-500' : 'text-gray-400'}`}
                  >
                    Upload photo
                  </Typography>
                </div>
              )}
            </div>

            {error && (
              <Typography variant="body2" className="max-w-52 text-center text-red-500">
                {helperText}
              </Typography>
            )}

            <Typography variant="body2" className="max-w-52 text-center">
              Allowed *.jpeg, *.jpg, *.png, *.gif max size of 5 Mb
            </Typography>
          </>
        );
      }}
    />
  );
};

export default ProfileImageInput;
