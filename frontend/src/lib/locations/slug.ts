export function slugify(text: string): string {
  return text
    .toString()
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildLocationSlug(district: string, neighborhood: string): string {
  return `${slugify(district)}-${slugify(neighborhood)}`;
}

export function neighborhoodSlugFromLocationSlug(locationSlug: string, neighborhoodName?: string): string {
  const parts = locationSlug.split("-");
  if (parts.length > 1) {
    return parts.slice(1).join("-");
  }

  return neighborhoodName ? slugify(neighborhoodName) : "";
}
