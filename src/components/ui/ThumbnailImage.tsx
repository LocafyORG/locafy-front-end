import React from 'react';
import { FaImage } from 'react-icons/fa';

export interface ThumbnailImageProps {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  fallbackIcon?: React.ReactNode;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
  onClick?: () => void;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
}

export const ThumbnailImage: React.FC<ThumbnailImageProps> = ({
  src,
  alt = "Thumbnail",
  width = 120,
  height = 80,
  fallbackIcon = <FaImage className="text-gray-400 text-2xl" />,
  className = "",
  imageClassName = "object-cover",
  fallbackClassName = "bg-gray-100",
  onClick,
  loading = 'lazy',
  decoding = 'async',
}) => {
  if (src) {
    return (
      <img
        src={src}
        width={width}
        height={height}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={`ui-thumbnail-image rounded ${imageClassName} ${onClick ? 'cursor-pointer' : ''} ${className}`}
        onClick={onClick}
      />
    );
  }

  return (
    <div 
      className={`ui-thumbnail-image w-[${typeof width === 'number' ? width + 'px' : width}] h-[${typeof height === 'number' ? height + 'px' : height}] ${fallbackClassName} rounded flex items-center justify-center ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {fallbackIcon}
    </div>
  );
}; 