export default function InputField({
  label,
  error,
  placeholder,
  onChange,
  value,
  maxLength,
}) {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (e.target.type === "number") {
      if (inputValue.length <= maxLength) {
        onChange(e);
      }
    } else {
      onChange(e);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <label className="text-[10px] text-neutral-smokey-grey font-bold tracking-widest">
          {label}
        </label>
        {error && (
          <span className="text-xs text-primary-light-red font-light italic">
            {error}
          </span>
        )}
      </div>
      <div className="relative flex items-center">
        <input
          className={`border px-3 py-2 text-2xl ${
            error ? "border-primary-light-red" : ""
          } font-bold rounded-lg outline-none placeholder:text-2xl placeholder:text-neutral-smokey-grey max-w-[100px]`}
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
