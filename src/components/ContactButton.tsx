import React from 'react';

interface ContactButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({ 
  label = "Contact Me", 
  className = "", 
  style, 
  ...props 
}) => {
  return (
    <button
      style={style}
      className={`rounded-none border-2 border-[#0C0C0C] bg-white text-[#0C0C0C] font-sans font-bold uppercase tracking-widest px-8 py-3.5 sm:px-10 sm:py-4 md:px-12 md:py-4.5 text-xs sm:text-sm md:text-sm hover:bg-[#0C0C0C] hover:text-white transition-all duration-200 shadow-md active:scale-95 flex items-center justify-center cursor-pointer ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default ContactButton;
