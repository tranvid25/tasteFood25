"use client";

const ACCESS_TOKEN = "access_token";

export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + ACCESS_TOKEN + "=([^;]+)"));
  if (match) return match[2];
  return null;
};

export const setAccessToken = (token: string, expiresDays: number = 7) => {
  if (typeof window === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + (expiresDays * 24 * 60 * 60 * 1000));
  const expires = "; expires=" + date.toUTCString();
  document.cookie = ACCESS_TOKEN + "=" + (token || "") + expires + "; path=/; SameSite=Lax";
};

export const removeAccessToken = () => {
  if (typeof window === "undefined") return;
  document.cookie = ACCESS_TOKEN + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
