const Button = (props) => {
  const { children, classname, type } = props;
  return (
    <button
      type={type}
      className={`w-full px-2 py-1 cursor-pointer rounded-lg bg-black text-white ${classname}`}
    >
      {children}
    </button>
  );
};

export default Button;
