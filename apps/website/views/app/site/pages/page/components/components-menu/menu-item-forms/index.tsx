import formLoginImg from "@/assets/form-login.svg";
import formSignUpImg from "@/assets/form-signup.svg";
import heroWithFormLoginLeftImg from "@/assets/hero-with-form-login-left.svg";
import heroWithFormLoginRightImg from "@/assets/hero-with-form-login-right.svg";
import heroWithFormSignUpLeftImg from "@/assets/hero-with-form-signup-left.svg";
import heroWithFormSignUpRightImg from "@/assets/hero-with-form-signup-right.svg";
import { useSite, useTranslations } from "@/hooks";
import { ComponentType } from "@/services/graphql/stokei";
import { useMemo } from "react";
import { MenuItem } from "../menu-item";
import { Component } from "../types";

export const MenuItemForms = () => {
  const translate = useTranslations();
  const { site } = useSite();

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
      {
        id: ComponentType.Hero + "-with-form-login-left",
        avatar: heroWithFormLoginLeftImg.src,
        parent: "",
        order: 0,
        type: ComponentType.Hero,
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
                  type: ComponentType.Hero,
                  components: [
                    {
                      parent: "",
                      type: ComponentType.HeroMedia,
                      components: [
                        {
                          parent: "",
                          type: ComponentType.FormLogin,
                          components: [],
                        }
                      ],
                    },
                    {
                      parent: "",
                      type: ComponentType.HeroContent,
                      components: [
                        {
                          parent: "",
                          type: ComponentType.Title,
                          data: {
                            value: translate.formatMessage({ id: "title" }),
                          },
                          components: [],
                        },
                        {
                          parent: "",
                          type: ComponentType.Text,
                          data: {
                            value: translate.formatMessage({
                              id: "description",
                            }),
                          },
                          components: [],
                        },
                        {
                          parent: "",
                          type: ComponentType.Button,
                          data: {
                            pageId: site?.signUpPage?.id,
                            text: translate.formatMessage({
                              id: "signUp",
                            }),
                          },
                          components: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        id: ComponentType.Hero + "-with-form-login-right",
        avatar: heroWithFormLoginRightImg.src,
        parent: "",
        order: 0,
        type: ComponentType.Hero,
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
                  type: ComponentType.Hero,
                  components: [
                    {
                      parent: "",
                      type: ComponentType.HeroContent,
                      components: [
                        {
                          parent: "",
                          type: ComponentType.Title,
                          data: {
                            value: translate.formatMessage({ id: "title" }),
                          },
                          components: [],
                        },
                        {
                          parent: "",
                          type: ComponentType.Text,
                          data: {
                            value: translate.formatMessage({
                              id: "description",
                            }),
                          },
                          components: [],
                        },
                        {
                          parent: "",
                          type: ComponentType.Button,
                          data: {
                            pageId: site?.signUpPage?.id,
                            text: translate.formatMessage({
                              id: "signUp",
                            }),
                          },
                          components: [],
                        },
                      ],
                    },
                    {
                      parent: "",
                      type: ComponentType.HeroMedia,
                      components: [
                        {
                          parent: "",
                          type: ComponentType.FormLogin,
                          components: [],
                        }
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        id: ComponentType.Hero + "-with-form-signup-left",
        avatar: heroWithFormSignUpLeftImg.src,
        parent: "",
        order: 0,
        type: ComponentType.Hero,
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
                  type: ComponentType.Hero,
                  components: [
                    {
                      parent: "",
                      type: ComponentType.HeroMedia,
                      components: [
                        {
                          parent: "",
                          type: ComponentType.FormSignup,
                          components: [],
                        }
                      ],
                    },
                    {
                      parent: "",
                      type: ComponentType.HeroContent,
                      components: [
                        {
                          parent: "",
                          type: ComponentType.Title,
                          data: {
                            value: translate.formatMessage({ id: "title" }),
                          },
                          components: [],
                        },
                        {
                          parent: "",
                          type: ComponentType.Text,
                          data: {
                            value: translate.formatMessage({
                              id: "description",
                            }),
                          },
                          components: [],
                        },
                        {
                          parent: "",
                          type: ComponentType.Button,
                          data: {
                            pageId: site?.loginPage?.id,
                            text: translate.formatMessage({
                              id: "login",
                            }),
                          },
                          components: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        id: ComponentType.Hero + "-with-form-signup-right",
        avatar: heroWithFormSignUpRightImg.src,
        parent: "",
        order: 0,
        type: ComponentType.Hero,
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
                  type: ComponentType.Hero,
                  components: [
                    {
                      parent: "",
                      type: ComponentType.HeroContent,
                      components: [
                        {
                          parent: "",
                          type: ComponentType.Title,
                          data: {
                            value: translate.formatMessage({ id: "title" }),
                          },
                          components: [],
                        },
                        {
                          parent: "",
                          type: ComponentType.Text,
                          data: {
                            value: translate.formatMessage({
                              id: "description",
                            }),
                          },
                          components: [],
                        },
                        {
                          parent: "",
                          type: ComponentType.Button,
                          data: {
                            pageId: site?.loginPage?.id,
                            text: translate.formatMessage({
                              id: "login",
                            }),
                          },
                          components: [],
                        },
                      ],
                    },
                    {
                      parent: "",
                      type: ComponentType.HeroMedia,
                      components: [
                        {
                          parent: "",
                          type: ComponentType.FormSignup,
                          components: [],
                        }
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ];
  }, [site?.loginPage?.id, site?.signUpPage?.id, translate]);

  return (
    <MenuItem
      group={{
        title: translate.formatMessage({ id: "forms" }),
        components,
      }}
    />
  );
};
