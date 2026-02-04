type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  loading?: boolean; // optional visual loading state
  disabled?: boolean; // allows external disabling
  className?: string;
  variant?: "solid" | "outline";
};

const Button = ({
  children,
  onClick,
  type = "button",
  fullWidth = false,
  loading = false,
  disabled = false,
  className = "",
  variant = "solid",
}: ButtonProps) => {
  const isDisabled = disabled || loading; // disable if loading or externally disabled

  const baseClasses = `${
    fullWidth ? "w-full" : "inline-block"
  } rounded-lg font-medium text-sm h-11 px-6 focus:outline-none focus:ring-2`;

  const variantClasses =
    variant === "solid"
      ? `bg-[#ee2b4b] text-white hover:bg-[#d0213e] focus:ring-[#ee2b4b]`
      : `bg-transparent border border-[#ee2b4b] text-[#ee2b4b] hover:bg-[#ee2b4b] hover:text-white focus:ring-[#ee2b4b]`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${variantClasses} ${className} ${
        isDisabled ? "cursor-not-allowed opacity-70" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
