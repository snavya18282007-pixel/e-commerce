export const getOptimizedImageUrl = (product, options = {}) => {
  const { width = 500, quality = 'auto', format = 'auto' } = options;
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const cloudinaryName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  if (!product) return 'https://placehold.co/600x750?text=No+Product';

  let url = '';
  
  // 1. Prioritize imagePath (set by AdminJS or our controllers)
  if (product.imagePath) {
    if (product.imagePath.startsWith('http')) {
      url = product.imagePath;
    } else if (product.imagePath.includes('uploads/') || !cloudinaryName) {
      // If it contains "uploads/" or no Cloudinary is set, assume local
      url = `${baseUrl}/public/uploads/${product.imagePath.replace('public/uploads/', '')}`;
    } else {
      // Assume it's a Cloudinary public ID
      url = `https://res.cloudinary.com/${cloudinaryName}/image/upload/f_${format},q_${quality},w_${width}/${product.imagePath}`;
    }
  } 
  // 2. Fallback to images array
  else if (product.images && product.images.length > 0) {
    url = product.images[0];
    // If relative path in images array, prepend baseUrl
    if (url && !url.startsWith('http')) {
      url = `${baseUrl}/public/uploads/${url.replace('public/uploads/', '')}`;
    }
  } 
  // 3. Final Fallback
  else {
    url = 'https://placehold.co/600x750?text=Gift+Item';
  }

  // Handle unsplash/external images for optimization if possible
  if (url.includes('unsplash.com')) {
    if (!url.includes('f_auto') && !url.includes('auto=format')) url += `&auto=format`;
    if (!url.includes('q_auto') && !url.includes('q=')) url += `&q=80`;
    if (!url.includes('w_') && !url.includes('w=')) url += `&w=${width}`;
  }
  
  return url;
};
