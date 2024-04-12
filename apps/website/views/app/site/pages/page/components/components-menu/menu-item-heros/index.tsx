import { ComponentType } from "@/services/graphql/stokei";
import { useTranslations } from "@stokei/translations";
import { useMemo } from "react";
import { MenuItem } from "../menu-item";
import { Component } from "../types";

export const MenuItemHeros = () => {
  const translate = useTranslations();

  const components = useMemo<Component[]>(() => {
    return [
      {
        id: ComponentType.Hero + "-with-text",
        title: "Douglas",
        avatar: "",
        parent: "",
        order: 1,
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
                      ],
                    },
                    {
                      parent: "",
                      type: ComponentType.HeroMedia,
                      components: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ];
  }, [translate]);

  return (
    <MenuItem
      group={{
        title: translate.formatMessage({ id: "heros" }),
        components,
      }}
    />
  );
};
