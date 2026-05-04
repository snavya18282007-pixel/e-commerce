export const getOptimizedImageUrl = (product, options = {}) => {
  const { width = 500, quality = 'auto', format = 'auto' } = options;
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const cloudinaryName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  let url = '';
  
  if (!product.imagePath) {
    url = product.images?.[0] || 'https://placehold.co/600x750?text=Gift+Item';
  } else if (product.imagePath.startsWith('http')) {
    url = product.imagePath;
  } else if (cloudinaryName) {
    url = `https://res.cloudinary.com/${cloudinaryName}/image/upload/f_${format},q_${quality},w_${width}/${product.imagePath}`;
  } else {
    url = `${baseUrl}/public/uploads/${product.imagePath}`;
  }

  // Handle unsplash images in demo data
  if (url.includes('unsplash.com')) {
    if (!url.includes('f_auto') && !url.includes('auto=format')) url += `&auto=format`;
    if (!url.includes('q_auto') && !url.includes('q=')) url += `&q=80`;
    if (!url.includes('w_') && !url.includes('w=')) url += `&w=${width}`;
  }
  
  return url;
};
