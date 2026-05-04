export const getOptimizedImageUrl = (product, options = {}) => {
  const { width = 500, quality = 'auto', format = 'auto' } = options;
  
  // Try to get API URL from env, fallback to localhost only if we're actually on localhost
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const envApiUrl = import.meta.env.VITE_API_URL;
  const baseUrl = envApiUrl || (isLocal ? 'http://localhost:5000' : ''); 
  
  const cloudinaryName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  if (!product) return 'https://placehold.co/600x750?text=No+Product';

  let url = '';
  
  // 1. Prioritize imagePath (set by AdminJS or our controllers)
  if (product.imagePath) {
    if (product.imagePath.startsWith('http')) {
      url = product.imagePath;
    } else if (product.imagePath.includes('uploads/') || !cloudinaryName) {
      // Ensure we have an absolute path. If baseUrl is missing on production, 
      // it will at least try to fetch from the current domain's root.
      const cleanPath = product.imagePath.replace('public/uploads/', '').replace(/^\//, '');
      url = baseUrl ? `${baseUrl}/public/uploads/${cleanPath}` : `/public/uploads/${cleanPath}`;
    } else {
      // Assume it's a Cloudinary public ID
      url = `https://res.cloudinary.com/${cloudinaryName}/image/upload/f_${format},q_${quality},w_${width}/${product.imagePath}`;
    }
  } 
  // 2. Fallback to images array
  else if (product.images && product.images.length > 0) {
    url = product.images[0];
    if (url && !url.startsWith('http')) {
      const cleanPath = url.replace('public/uploads/', '').replace(/^\//, '');
      url = baseUrl ? `${baseUrl}/public/uploads/${cleanPath}` : `/public/uploads/${cleanPath}`;
    }
  } 
  // 3. Final Fallback
  else {
    url = 'https://placehold.co/600x750?text=Gift+Item';
  }

  // Handle unsplash/external images for optimization if possible
  if (url && url.includes('unsplash.com')) {
    if (!url.includes('f_auto') && !url.includes('auto=format')) url += `&auto=format`;
    if (!url.includes('q_auto') && !url.includes('q=')) url += `&q=80`;
    if (!url.includes('w_') && !url.includes('w=')) url += `&w=${width}`;
  }
  
  return url;
};
