import { chakra, PropsOf, HTMLChakraProps } from "@chakra-ui/react";
import React, { FormEvent } from "react";

export type FormProps = HTMLChakraProps<"form">;
export const Form: React.FC<FormProps> = ({ children, ...props }) => {
  const FormComponent = chakra.form;
  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props?.onSubmit?.(e);
  };
  return (
    <FormComponent {...props} onSubmit={onSubmitForm}>
      {children}
    </FormComponent>
  );
};
