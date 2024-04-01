import { Messages } from "../../interfaces";

const defaultMessages: Messages = {
  "en-US": {},
  "pt-BR": {},
};

export const mergeTranslations = (translations: Messages[]): Messages => {
  if (!translations?.length) {
    return defaultMessages;
  }
  const mergeMessages = translations.reduce<Messages>(
    (prevMessages, messages) => {
      const messagesEntries = Object.entries(prevMessages).map(
        ([key, value]) => [
          key,
          {
            ...value,
            ...messages[key as keyof Messages],
          },
        ]
      );
      const messagesMerged = Object.fromEntries(messagesEntries);
      return {
        ...prevMessages,
        ...messagesMerged,
      };
    },
    defaultMessages
  );

  return mergeMessages;
};
