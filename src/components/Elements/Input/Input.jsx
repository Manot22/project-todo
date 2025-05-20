const Input = (props) => {
  const { type, placeholder, name, value, onChange } = props;
  return (
    <input
      type={type}
      className="w-full rounded-md border border-gray-200 px-2 py-1 text-gray-200"
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
    />
  );
};
export default Input;
