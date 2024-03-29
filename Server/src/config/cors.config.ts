import { CorsOptions } from 'cors';
import { API_URL } from './webServer.config';

export const corsOptions: CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: API_URL,
    preflightContinue: false,
};