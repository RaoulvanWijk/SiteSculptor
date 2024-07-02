export const getValidSubdomain = (host: string | null) => {
  const mainDomains = ["avklo.com", "localhost:3000"];
  let subdomain: string | null = null;
  if (!host && typeof window !== "undefined") {
    host = window.location.host;
  }
  if (!host || mainDomains.some((domain) => host === domain) || !host.includes(".")) {
    return;
  }

  const candidate = host.split(".")[0];
  if (candidate) {
    subdomain = candidate;
  }
  return subdomain;
};
