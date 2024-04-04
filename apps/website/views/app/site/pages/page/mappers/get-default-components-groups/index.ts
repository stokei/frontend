import { ComponentType } from "@/services/graphql/stokei";
import { ComponentGroup } from "../../components/components-menu/types";
import { I18nKey } from "@/interfaces/i18n-key";
import { FormatMessage } from "@stokei/translations";

export interface GetDefaultComponentsGroups {
  formatMessage: FormatMessage<I18nKey>;
}

export const getDefaultComponentsGroups = ({
  formatMessage,
}: GetDefaultComponentsGroups): ComponentGroup[] => [
  {
    title: formatMessage({ id: "heros" }),
    components: [
      {
        id: ComponentType.Hero + "-with-text",
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
                            value: formatMessage({ id: "title" }),
                          },
                          components: [],
                        },
                        {
                          parent: "",
                          type: ComponentType.Text,
                          data: {
                            value: formatMessage({ id: "description" }),
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
    ],
  },
];
