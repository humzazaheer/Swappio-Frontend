export const Input = ({
  type = "text",
  name,
  value = "",
  onChange,
  onBlur,
  className = "",
  id,
  tag = "input",
  placeholder,
  required = false,
  accept,
  label,
  readOnly = false,
  disabled = false,
  checked = false,
  parentclasses = true,
  error,
  options = [],
  ...props
}) => {
  const handleChange = (e) => {
    if (onChange) onChange(e);
  };

  const baseClasses =
    "h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300";

  const classes = `${parentclasses ? baseClasses : ""} ${
    tag === "textarea" ? "h-auto min-h-[100px]" : ""
  } ${className}`;

  const commonProps = {
    id,
    name,
    onChange: handleChange,
    onBlur,
    readOnly,
    disabled,
    className: classes,
    placeholder,
    required,
    ...props,
  };

  // 🎯 TEXTAREA
  if (tag === "textarea") {
    return (
      <>
        {label && (
          <label htmlFor={name} className="text-black/70">
            {label}
          </label>
        )}
        <textarea {...commonProps} value={value || ""} rows={4} />
        {error && <div className="text-red-500 text-md mt-1">{error}</div>}
      </>
    );
  }

  // 🎯 SELECT (dropdown)
  if (tag === "select") {
    return (
      <>
        {label && (
          <label
            htmlFor={name}
            className="text-left mb-1 block text-md font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <select {...commonProps} value={value}>
          <option value="">-- Select --</option>
          {options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
        {error && <div className="text-red-500 text-md mt-1">{error}</div>}
      </>
    );
  }

  // 🎯 RADIO (multiple radio options)
  if (type === "radio") {
    return (
      <div className="flex items-center space-x-2 mt-2">
        <input
          {...commonProps}
          type="radio"
          value={value}
          checked={checked}
          className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
        />
        {label && (
          <label
            htmlFor={id || name}
            className="text-md font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        {error && <div className="text-red-500 text-md mt-1">{error}</div>}
      </div>
    );
  }

  // 🎯 DEFAULT INPUT (text, email, password, etc.)
  const inputProps = {
    ...commonProps,
    type,
    autoComplete: type === "password" ? "new-password" : "on",
    accept: type === "file" ? accept : undefined,
    inputMode: getInputMode(type),
    checked: type === "checkbox" ? checked : undefined,
    value: type !== "file" ? value || "" : undefined,
  };

  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="text-left mb-1 block text-md font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input {...inputProps} />
      {error && <div className="text-red-500 text-md mt-1">{error}</div>}
    </>
  );
};

// Helper function to determine inputMode
const getInputMode = (type) => {
  switch (type) {
    case "email":
      return "email";
    case "tel":
      return "tel";
    case "url":
      return "url";
    case "number":
      return "numeric";
    case "search":
      return "search";
    default:
      return undefined;
  }
};
