import { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({
  className,
  src,
  alt,
  fallback,
  size = 'md',
  ...props
}: AvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-full',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
          {fallback ? (
            <span className="text-sm font-medium">{fallback}</span>
          ) : (
            <span className="text-sm font-medium">?</span>
          )}
        </div>
      )}
    </div>
  );
}