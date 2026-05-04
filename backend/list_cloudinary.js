import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dme03gmmd',
  api_key: '531993964366795',
  api_secret: '267ZnkulRcYrxxZiEq7EPxDM48M',
});

cloudinary.api.resources({ max_results: 10 })
  .then(result => {
    console.log('Resources:');
    result.resources.forEach(r => console.log(r.public_id, r.format, r.url));
  })
  .catch(err => {
    console.error('Error:', err);
  });
