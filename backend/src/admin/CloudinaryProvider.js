import { BaseProvider } from '@adminjs/upload';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

export class CloudinaryProvider extends BaseProvider {
  constructor() {
    super('project_navi');
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async upload(file, key) {
    try {
      if (process.env.CLOUDINARY_CLOUD_NAME) {
         await cloudinary.uploader.upload(file.path, { public_id: key, resource_type: 'auto' });
      } else {
         // Fallback to local if no cloudinary keys (useful for local dev before they set it up)
         const dest = path.join(process.cwd(), 'public', 'uploads', key);
         fs.mkdirSync(path.dirname(dest), { recursive: true });
         fs.copyFileSync(file.path, dest);
      }
    } catch(err) {
      console.error('Upload Error', err);
    } finally {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    }
    return true;
  }

  async delete(key, bucket) {
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      await cloudinary.uploader.destroy(key);
    } else {
       const dest = path.join(process.cwd(), 'public', 'uploads', key);
       if (fs.existsSync(dest)) fs.unlinkSync(dest);
    }
  }

  async path(key, bucket) {
    if (process.env.CLOUDINARY_CLOUD_NAME) {
       return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${key}`;
    }
    return `http://localhost:5000/public/uploads/${key}`;
  }
}
