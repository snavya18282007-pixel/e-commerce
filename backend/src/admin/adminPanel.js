import AdminJS, { ComponentLoader } from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import uploadFeature from '@adminjs/upload';
import { CloudinaryProvider } from './CloudinaryProvider.js';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import Order from '../models/Order.js';
import Category from '../models/Category.js';

AdminJS.registerAdapter(AdminJSMongoose);

const componentLoader = new ComponentLoader();

export const buildAdminRouter = async () => {
  const admin = new AdminJS({
    rootPath: '/admin',
    componentLoader,
    resources: [
      {
        resource: Product,
        options: {
          navigation: { name: 'Catalog', icon: 'Archive' },
          properties: {
            imagePath: { isVisible: false } // Hide the raw path field
          }
        },
        features: [
          uploadFeature({
            componentLoader,
            provider: new CloudinaryProvider(),
            properties: {
              key: 'imagePath',
              file: 'uploadImage'
            },
            validation: { mimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'] }
          })
        ]
      },
      {
        resource: Order,
        options: {
          navigation: { name: 'Orders', icon: 'DeliveryTruck' }
        }
      },
      {
        resource: Category,
        options: {
          navigation: { name: 'Catalog', icon: 'Category' }
        }
      }
    ],
    branding: {
      companyName: 'Project Navi Admin'
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    admin.watch();
  }

  return AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate: async (email, password) => {
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
          return { email, role: 'admin' };
        }
        return null;
      },
      cookieName: 'adminjs',
      cookiePassword: process.env.JWT_SECRET
    },
    null,
    {
      resave: false,
      saveUninitialized: false,
      secret: process.env.JWT_SECRET
    }
  );
};
