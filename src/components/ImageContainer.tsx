'use client';

import { useState } from 'react';

import Image, { type StaticImageData } from 'next/image';

import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  src: string | StaticImageData;
  alt: string;
}

const ImageContainer = ({ className, src, alt = '', children, ...props }: Props) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);

  return (
    <div
      {...props}
      className={cn('relative overflow-hidden bg-gray-100', className, { 'animate-wave': loading })}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="h-full object-cover object-center"
        loading="lazy"
        onError={() => {
          setImgSrc('/imgs/no_picture.png');
          setLoading(false);
        }}
        onLoadingComplete={() => setLoading(false)}
      />
      {children}
    </div>
  );
};

export default ImageContainer;
