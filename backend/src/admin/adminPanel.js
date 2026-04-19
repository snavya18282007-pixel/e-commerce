import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Category from '../models/Category.js';

AdminJS.registerAdapter(AdminJSMongoose);

export const buildAdminRouter = async () => {
  const admin = new AdminJS({
    rootPath: '/admin',
    resources: [
      {
        resource: Product,
        options: {
          navigation: { name: 'Catalog', icon: 'Archive' }
        }
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
