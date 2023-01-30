import { forwardRef } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslations } from "../../hooks";
import { Button } from "../button";
import { FormHelperText } from "../form-helper-text";
import { Icon } from "../icon";
import { Input, InputProps } from "../input";
import { InputGroup } from "../input-group";
import { InputRightElement } from "../input-right-element";

export interface InputPasswordProps extends InputProps {}

export const InputPassword: React.FC<InputPasswordProps> = forwardRef(
  ({ ...props }, ref) => {
    const translate = useTranslations();
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
          <Input {...props} onChange={onChange} type="password" ref={ref} />
          <InputRightElement width="auto" paddingX="2">
            <Button
              size="xs"
              onClick={onToggleShowPasswordClicked}
              colorScheme="gray"
            >
              {translate.formatMessage({ id: isShow ? "hide" : "show" })}
            </Button>
          </InputRightElement>
        </InputGroup>
        {isShow && <FormHelperText>{showPasswordValue}</FormHelperText>}
      </>
    );
  }
);
