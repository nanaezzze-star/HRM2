interface DownIconProps {
  className?: string;
}

export default function DownIcon({ className }: DownIconProps) {
  return (
    <svg
      className={className || "w-4 h-4 text-gray-700 ml-1"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}