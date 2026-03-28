export const messagesMap = {
  vi: () => import("../messages/vi.json").then((m) => m.default),
  en: () => import("../messages/en.json").then((m) => m.default),
};
