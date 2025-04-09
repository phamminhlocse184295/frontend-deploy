import dayjs from "dayjs";

const getExpiration = () => {
  const expiration = localStorage.expiresAt ?? sessionStorage.expiresAt ?? "";
  const expiresAt = +expiration || "";
  return dayjs(expiresAt);
};

const getExpiresAt = () => {
  if (localStorage.expiresAt) {
    return JSON.parse((localStorage.expiresAt as string) ?? "0");
  }
  if (sessionStorage.expiresAt) {
    return JSON.parse((sessionStorage.expiresAt as string) ?? "0");
  }
  return null;
};

const getAccessToken = (): string | null => {
  return localStorage.accessToken ?? sessionStorage.accessToken ?? null;
};

const getFunctionPermissionCodes = () => {
  return (
    localStorage.functionPermissionCodes ??
    sessionStorage.functionPermissionCodes ??
    null
  );
};

const getUsername = () => {
  return localStorage.username ?? sessionStorage.username ?? null;
};

const isAuthenticated = () => {
  return dayjs().isBefore(getExpiration()) || false;
};

export default {
  getExpiration,
  getExpiresAt,
  getAccessToken,
  getFunctionPermissionCodes,
  getUsername,
  isAuthenticated,
};
