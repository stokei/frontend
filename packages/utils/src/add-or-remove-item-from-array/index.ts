export const addOrRemoveItemFromArray = <TItem = any>(
  list: TItem[],
  itemToAddOrRemove: TItem,
  key?: keyof TItem
) => {
  const compareItems = (item1: TItem, item2: TItem) => {
    if (!key) {
      return item1 === item2;
    }
    return item1[key] === item2[key];
  };
  const existsItem = list?.some((currentItem) =>
    compareItems(currentItem, itemToAddOrRemove)
  );
  if (existsItem) {
    const listWithoutCurrentItem = list?.filter(
      (currentItem) => !compareItems(currentItem, itemToAddOrRemove)
    );
    return listWithoutCurrentItem;
  }
  return [...list, itemToAddOrRemove];
};
