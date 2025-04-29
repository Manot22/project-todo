import Input from "./Input";
import Label from "./Label";

const InputForm = (props) => {
  const { htmlFor, titleLable, placeholder, type, value, name, onChange } =
    props;
  return (
    <>
      <Label htmlFor={htmlFor}>{titleLable}</Label>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
export default InputForm;
