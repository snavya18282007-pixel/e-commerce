import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: 'dme03gmmd',
  api_key: '531993964366795',
  api_secret: '267ZnkulRcYrxxZiEq7EPxDM48M',
});

// Create a dummy file
fs.writeFileSync('test.jpg', 'dummy content');

cloudinary.uploader.upload('test.jpg', { public_id: 'test_image', resource_type: 'auto' })
  .then(result => {
    console.log('Success!', result);
  })
  .catch(err => {
    console.error('Error:', err);
  })
  .finally(() => {
    fs.unlinkSync('test.jpg');
  });
