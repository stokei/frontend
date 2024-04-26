import formLoginImg from "@/assets/form-login.svg";
import formSignUpImg from "@/assets/form-signup.svg";
import { useSite, useTranslations } from "@/hooks";
import { ComponentType } from "@/services/graphql/stokei";
import { useMemo } from "react";
import { MenuItem } from "../menu-item";
import { Component } from "../types";

export const MenuItemForms = () => {
  const translate = useTranslations();

  const components = useMemo<Component[]>(() => {
    return [
      {
        id: ComponentType.FormLogin,
        avatar: formLoginImg.src,
        parent: "",
        order: 0,
        type: ComponentType.FormLogin,
        acceptTypes: [],
        data: {
          isNew: true,
          tree: [
            {
              parent: "",
              type: ComponentType.Block,
              components: [
                {
                  parent: "",
                  type: ComponentType.FormLogin,
                  components: [],
                },
              ],
            },
          ],
        },
      },
      {
        id: ComponentType.FormSignup,
        avatar: formSignUpImg.src,
        parent: "",
        order: 0,
        type: ComponentType.FormSignup,
        acceptTypes: [],
        data: {
          isNew: true,
          tree: [
            {
              parent: "",
              type: ComponentType.Block,
              components: [
                {
                  parent: "",
                  type: ComponentType.FormSignup,
                  components: [],
                },
              ],
            },
          ],
        },
      },
    ];
  }, []);

  return (
    <MenuItem
      group={{
        title: translate.formatMessage({ id: "forms" }),
        components,
      }}
    />
  );
};
