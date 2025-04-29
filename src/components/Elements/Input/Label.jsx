const Label = (props) => {
  const { children, htmlFor } = props;
  return (
    <label htmlFor={htmlFor} className="text-gray-500 text-sm">
      {children}
    </label>
  );
};
export default Label;
