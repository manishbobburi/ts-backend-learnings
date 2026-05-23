import express, { Express } from 'express';
import './config/logging';
import { router } from './routes';
import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { routeNotFound } from './middleware/routeNotFound';
import { SERVER_HOSTNAME, SERVER_PORT } from './config/config';

export const app: Express = express();

export const Main = () => {
    logging.info(`-----------------------------------------`);
    logging.info(`Initializing API`);
    logging.info(`-----------------------------------------`);
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    logging.info(`-----------------------------------------`);
    logging.info(`Logging & Configuration`);
    logging.info(`-----------------------------------------`);
    app.use(loggingHandler);
    app.use(corsHandler);

    logging.info(`-----------------------------------------`);
    logging.info(`Define Controller Routing`);
    logging.info(`-----------------------------------------`);
    app.get('/main/healthcheck', (req, res, next) => {
        return res.status(200).json({message: "Hello World!"});
    });

    app.use('/api', router);

    logging.info(`-----------------------------------------`);
    logging.info(`Define Controller Routing`);
    logging.info(`-----------------------------------------`);
    app.use(routeNotFound)

    logging.info(`-----------------------------------------`);
    logging.info(`Start Server`);
    logging.info(`-----------------------------------------`);
    app.listen(SERVER_PORT, () => {
        logging.info(`-----------------------------------------`);
        logging.info('Server Started ' + SERVER_HOSTNAME + ':' + SERVER_PORT);
        logging.info(`-----------------------------------------`);
    });
}

Main();