/* eslint-disable prettier/prettier */
import { ReactNode } from 'react';

type AlertNotiVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertNotiProps {
  variant?: AlertNotiVariant;
  title: string;
  description?: string;
  show?: boolean;
}

const variantStyles = {
  success: {
    container: 'bg-green-50',
    border: 'bg-green-500',
    icon: 'text-green-500',
    title: 'text-green-800',
    description: 'text-green-700',
  },
  error: {
    container: 'bg-red-50',
    border: 'bg-red-500',
    icon: 'text-red-500',
    title: 'text-red-800',
    description: 'text-red-700',
  },
  warning: {
    container: 'bg-yellow-50',
    border: 'bg-yellow-500',
    icon: 'text-yellow-500',
    title: 'text-yellow-800',
    description: 'text-yellow-700',
  },
  info: {
    container: 'bg-blue-50',
    border: 'bg-blue-500',
    icon: 'text-blue-500',
    title: 'text-blue-800',
    description: 'text-blue-700',
  },
};

const icons: Record<AlertNotiVariant, ReactNode> = {
  success: (
    <svg
      className="mt-0.5 h-5 w-5 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  error: (
    <svg
      className="mt-0.5 h-5 w-5 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  warning: (
    <svg
      className="mt-0.5 h-5 w-5 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0377 2.66667 10.2679 4L3.33975 16C2.56995 17.3333 3.53223 19 5.07183 19Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  info: (
    <svg
      className="mt-0.5 h-5 w-5 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export function AlertNotification({
  variant = 'success',
  title,
  description,
  show = true,
}: AlertNotiProps) {
  if (!show) return null;

  const styles = variantStyles[variant];

  return (
    <div className={`mt-6 flex rounded-lg ${styles.container}`}>
      {/* Colored line on the left */}
      <div className={`w-1.5 rounded-l-lg ${styles.border}`} />

      {/* Content container */}
      <div className="flex items-start gap-3 p-4">
        <span className={styles.icon}>{icons[variant]}</span>
        <div>
          <p className={`font-medium ${styles.title}`}>{title}</p>
          {description && (
            <p className={`text-sm ${styles.description}`}>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
