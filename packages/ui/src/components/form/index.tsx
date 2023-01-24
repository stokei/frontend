import React, { FormEvent, HTMLAttributes } from "react";
import { chakra } from "@chakra-ui/react";

export interface FormProps extends HTMLAttributes<HTMLFormElement> {}
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
