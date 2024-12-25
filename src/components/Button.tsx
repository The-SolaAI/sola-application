import React, { ReactNode } from 'react';

interface ButtonProps {
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  children,
  onClick,
  className,
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2.5 rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 ${className}`}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
