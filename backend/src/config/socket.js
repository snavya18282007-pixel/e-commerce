import { Server } from 'socket.io';

let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || '*'
    }
  });

  io.on('connection', (socket) => {
    socket.on('join:user', (userId) => {
      socket.join(`user:${userId}`);
    });

    socket.on('join:admin', () => {
      socket.join('admin');
    });
  });

  return io;
};

export const getSocket = () => {
  if (!io) {
    throw new Error('Socket.io is not initialized');
  }
  return io;
};
