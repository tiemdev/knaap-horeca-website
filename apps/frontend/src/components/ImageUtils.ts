export function getImageUrl(imagePath: string): string {
  const basePath = import.meta.env.VITE_BASE_PATH || '/'
  return `${basePath}${imagePath}`
}
