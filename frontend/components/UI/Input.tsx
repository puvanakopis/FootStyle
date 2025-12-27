type InputProps = {
  label: string;
  placeholder: string;
};

const Input = ({ label, placeholder }: InputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="block w-full rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b] sm:text-sm h-11 px-4"
      />
    </div>
  );
};

export default Input;