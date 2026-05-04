import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: 'dme03gmmd',
  api_key: '531993964366795',
  api_secret: '267ZnkulRcYrxxZiEq7EPxDM48M',
});

// Create a dummy image file (1x1 transparent PNG)
const base64Png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
fs.writeFileSync('test.png', Buffer.from(base64Png, 'base64'));

const key = 'test_dir/er.png';
const parsed = path.parse(key);
// publicId = 'test_dir/er'
const publicId = parsed.dir ? `${parsed.dir}/${parsed.name}` : parsed.name;

cloudinary.uploader.upload('test.png', { public_id: publicId, resource_type: 'auto' })
  .then(result => {
    console.log('Success! URL is:', result.secure_url);
    console.log('Public ID is:', result.public_id);
    console.log('If we request', `https://res.cloudinary.com/dme03gmmd/image/upload/${key}`);
  })
  .catch(err => {
    console.error('Error:', err);
  })
  .finally(() => {
    fs.unlinkSync('test.png');
  });
