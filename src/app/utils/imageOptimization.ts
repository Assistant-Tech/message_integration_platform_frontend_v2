export const getOptimizedImageUrl = (
  baseUrl: string,
  width: number,
  format: 'webp' | 'png' | 'jpg' = 'webp'
) => {
  // For Cloudinary URLs, we can optimize by adding width parameter
  if (baseUrl.includes('cloudinary.com')) {
    const url = new URL(baseUrl);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('f', format);
    url.searchParams.set('q', 'auto');
    return url.toString();
  }
  
  return baseUrl;
};

export const generateSrcSet = (
  baseUrl: string,
  widths: number[],
  format: 'webp' | 'png' | 'jpg' = 'webp'
) => {
  return widths
    .map(width => `${getOptimizedImageUrl(baseUrl, width, format)} ${width}w`)
    .join(', ');
};

export const getResponsiveSizes = (breakpoints: { [key: string]: string }) => {
  return Object.entries(breakpoints)
    .map(([query, size]) => `(${query}) ${size}`)
    .join(', ');
};

// Preload critical images
export const preloadImage = (src: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
}; 