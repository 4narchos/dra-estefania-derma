export function getBaseUrl() {
  const raw = import.meta.env.BASE_URL || "/";
  return raw.endsWith("/") ? raw : raw + "/";
}
