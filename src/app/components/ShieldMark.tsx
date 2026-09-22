export function ShieldMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#2B1A12"
        d="M20 3c6 4 12 4 16 5-1 11-4 20-16 29C8 28 5 19 4 8c4-1 10-1 16-5z"
      />
      <path
        fill="#E8B84A"
        d="M20 7c4.5 3 9 3 12.5 3.5-1 8.5-3 15.5-12.5 22.5C11.5 26 9.5 19 8.5 10.5 12 10 15.5 10 20 7z"
      />
      <path fill="#C44520" d="M20 10v20c-6-5-8-11-8.5-17.5C14.5 12 17 11.5 20 10z" />
      <path fill="#6B9B3A" d="M20 10v20c6-5 8-11 8.5-17.5C25.5 12 23 11.5 20 10z" />
      <circle cx="20" cy="18" r="3.2" fill="#F4E4C1" />
      <circle cx="20" cy="18" r="1.4" fill="#2B1A12" />
    </svg>
  );
}
