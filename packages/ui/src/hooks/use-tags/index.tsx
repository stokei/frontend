import { useCallback, useState } from "react";

export interface UseTagsTagItem {
  id: string;
  label: string;
  onRemove: () => void;
}

export const useTags = () => {
  const [tags, setTags] = useState<UseTagsTagItem[]>([]);

  const onAddTag = useCallback((tag: UseTagsTagItem) => {
    if (!tag) {
      return;
    }
    setTags((oldTags) => {
      const existsTag = oldTags?.some((currentTag) => currentTag.id === tag.id);
      if (!existsTag) {
        return [...oldTags, tag];
      }
      return oldTags;
    });
  }, []);

  const onAddTags = useCallback((newTags: UseTagsTagItem[]) => {
    if (!newTags?.length) {
      return;
    }
    setTags((oldTags) => {
      const newTagsToAdd = newTags?.filter((currentNewTag) => {
        if (!oldTags?.length) {
          return true;
        }
        const existsTag = oldTags?.some(
          (currentOldTag) => currentOldTag.id === currentNewTag.id
        );
        return !existsTag;
      });
      if (newTagsToAdd?.length) {
        return [...oldTags, ...newTagsToAdd];
      }
      return oldTags;
    });
  }, []);

  const onRemoveTag = useCallback((tagId: string) => {
    if (!tagId) {
      return;
    }
    setTags((oldTags) =>
      oldTags?.filter((currentTag) => currentTag.id !== tagId)
    );
  }, []);

  const onClearTags = useCallback(() => setTags([]), []);

  return {
    tags,
    onAddTag,
    onAddTags,
    onRemoveTag,
    onClearTags,
  };
};
