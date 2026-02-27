// Reusable loading spinner component
// Can be used when fetching data from Supabase

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export function LoadingSpinner({ size = 'md', message }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'size-6',
    md: 'size-12',
    lg: 'size-16',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
      />
      {message && (
        <p className="mt-4 text-sm text-gray-500 font-medium">{message}</p>
      )}
    </div>
  );
}
