const Button = (props) => {
  const {
    children,
    classname = "bg-black",
    type = "button",
    onClick = () => {},
  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-1 cursor-pointer rounded-lg ${classname} `}
    >
      {children}
    </button>
  );
};

export default Button;
