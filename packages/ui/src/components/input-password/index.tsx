import { useState } from "react";
import { FormHelperText } from "../form-helper-text";
import { Icon } from "../icon";
import { Input, InputProps } from "../input";
import { InputGroup } from "../input-group";
import { InputRightElement } from "../input-right-element";

export interface InputPasswordProps extends InputProps {}

export const InputPassword: React.FC<InputPasswordProps> = ({ ...props }) => {
  const [isShow, setIsShow] = useState(false);
  const [showPasswordValue, setShowPasswordValue] = useState("");

  const onChange = (e: any) => {
    if (props.onChange) {
      props.onChange(e);
    }
    setShowPasswordValue(e.target.value);
  };

  const onToggleShowPasswordClicked = () => {
    setIsShow((show) => !show);
  };

  return (
    <>
      <InputGroup>
        <Input {...props} onChange={onChange} type="password" />
        <InputRightElement>
          <Icon
            cursor="pointer"
            name={!isShow ? "passwordHide" : "passwordShow"}
            onClick={onToggleShowPasswordClicked}
          />
        </InputRightElement>
      </InputGroup>
      {isShow && <FormHelperText>{showPasswordValue}</FormHelperText>}
    </>
  );
};
