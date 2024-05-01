import { useGetAppCatalogsQuery } from "@/components/select-catalogs/graphql/catalogs.query.graphql.generated";
import { useCurrentApp } from "@/hooks";
import { ComponentType, OrderBy } from "@/services/graphql/stokei";
import { useTranslations } from "@stokei/translations";
import { useMemo } from "react";
import { MenuItem } from "../menu-item";
import { Component, ComponentGroup } from "../types";

export const MenuItemCatalogs = () => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const [{ data: dataGetCatalogs, fetching: isLoadingGetCatalogs }] =
    useGetAppCatalogsQuery({
      pause: !currentApp,
      variables: {
        orderBy: {
          title: OrderBy.Asc,
        },
        where: {
          AND: {
            parent: {
              equals: currentApp?.id,
            },
          },
        },
      },
    });
  const catalogsList = useMemo(
    () => dataGetCatalogs?.catalogs?.items || [],
    [dataGetCatalogs?.catalogs?.items]
  );

  const catalogGroup = useMemo<ComponentGroup>(() => {
    const groupTitle = translate.formatMessage({ id: "catalogs" });
    return {
      title: groupTitle,
      components: catalogsList.map<Component>((catalog, order) => ({
        id: catalog.id,
        title: catalog.title,
        order,
        parent: "",
        type: ComponentType.Catalog,
        data: {
          isNew: true,
          tree: [
            {
              parent: "",
              type: ComponentType.Block,
              components: [
                {
                  parent: "",
                  type: ComponentType.Catalog,
                  data: {
                    catalog: catalog.id,
                  },
                },
              ],
            },
          ],
        },
      })),
    };
  }, [catalogsList, translate]);

  return <MenuItem group={catalogGroup} />;
};
