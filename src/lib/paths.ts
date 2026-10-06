const configuredBase = import.meta.env.BASE_URL || "/";
const basePath = configuredBase === "/" ? "" : configuredBase.replace(/\/$/, "");

/** Prefix an internal URL with Astro's configured deployment base path. */
export function sitePath(path = "/") {
  if (!path || path.startsWith("#") || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path)) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (basePath && (normalized === basePath || normalized.startsWith(`${basePath}/`))) {
    return normalized;
  }
  return `${basePath}${normalized}`;
}

export function routePath(pathname: string) {
  if (basePath && pathname.startsWith(basePath)) {
    const stripped = pathname.slice(basePath.length);
    return stripped || "/";
  }
  return pathname;
}
