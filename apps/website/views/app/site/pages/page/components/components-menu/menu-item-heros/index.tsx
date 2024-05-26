import { ComponentType } from "@/services/graphql/stokei";
import { useMemo } from "react";
import heroWithTextImg from "@/assets/hero-with-text.svg";
import heroWithImageLeftImg from "@/assets/hero-with-image-left.svg";
import heroWithImageRightImg from "@/assets/hero-with-image-right.svg";
import heroWithVideoLeftImg from "@/assets/hero-with-video-left.svg";
import heroWithVideoRightImg from "@/assets/hero-with-video-right.svg";
import heroWithFormLoginLeftImg from "@/assets/hero-with-form-login-left.svg";
import heroWithFormLoginRightImg from "@/assets/hero-with-form-login-right.svg";
import heroWithFormSignUpLeftImg from "@/assets/hero-with-form-signup-left.svg";
import heroWithFormSignUpRightImg from "@/assets/hero-with-form-signup-right.svg";
import { MenuItem } from "../menu-item";
import { Component } from "../types";
import { useSite, useTranslations } from "@/hooks";

export const MenuItemHeros = () => {
  const translate = useTranslations();
  const { site } = useSite();

  const components = useMemo<Component[]>(() => {
    return [
      {
        id: ComponentType.Hero + "-with-text",
        avatar: heroWithTextImg.src,
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
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        id: ComponentType.Hero + "-with-image-left",
        avatar: heroWithImageLeftImg.src,
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
                          type: ComponentType.Image,
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
        id: ComponentType.Hero + "-with-image-right",
        avatar: heroWithImageRightImg.src,
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
                          type: ComponentType.Image,
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
        id: ComponentType.Hero + "-with-video-left",
        avatar: heroWithVideoLeftImg.src,
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
                          type: ComponentType.Video,
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
        id: ComponentType.Hero + "-with-video-right",
        avatar: heroWithVideoRightImg.src,
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
                          type: ComponentType.Video,
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
        title: translate.formatMessage({ id: "headlineSections" }),
        components,
      }}
    />
  );
};