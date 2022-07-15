import mongoose from 'mongoose';

class DbConnection {
  constructor() {
    mongoose.connect(
      'mongodb+srv://dbTest:%40Mayk2022@cluster0.zrv8j.mongodb.net/dbTest'
    );
  }

  connect() {
    const db = mongoose.connection;

    return db;
  }
}

export default DbConnection;
