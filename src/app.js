import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import routes from './routes';
import DbConnection from './config/db';

class App {
  constructor() {
    this.server = express();

    this.connectDataBase();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(compression());
    this.server.use(helmet());
    this.server.use(bodyParser.json());
  }

  routes() {
    this.server.use(routes);
  }

  connectDataBase() {
    const dbConnection = new DbConnection();

    dbConnection
      .connect()
      .on('error', console.log.bind(console, 'error connection'));
    dbConnection.connect().once('open', () => {
      console.log('connect on database');
    });
  }
}

export default new App().server;
