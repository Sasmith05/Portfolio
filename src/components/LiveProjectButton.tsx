import React from 'react';

interface LiveProjectButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  label = "Live Project",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`rounded-none border-2 border-[#0C0C0C] bg-white text-[#0C0C0C] font-sans font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-all duration-200 hover:bg-[#0C0C0C] hover:text-white active:scale-95 flex items-center justify-center cursor-pointer ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default LiveProjectButton;
