'use client';

import { JobCategory } from '@/types';
import { cn } from '@/lib/utils';

interface JobFilterProps {
  categories: Record<JobCategory, number>;
  selectedCategory: JobCategory;
  onCategoryChange: (category: JobCategory) => void;
}

export function JobFilter({ categories, selectedCategory, onCategoryChange }: JobFilterProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Categories</h2>

      <div className="flex flex-wrap gap-2">
        {Object.entries(categories).map(([category, count]) => (
          <button
            key={category}
            className={cn(
              'inline-flex items-center rounded-full px-3 py-1 text-sm',
              selectedCategory === category
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            )}
            onClick={() => onCategoryChange(category as JobCategory)}
          >
            {category}
            <span className="ml-1 text-xs">({count})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
