import { createClient } from 'redis';

export const redisClient = createClient();

redisClient.connect();

redisClient.on('error', (err) => {
    console.error('Erreur lors de la connexion à Redis:', err);
});

redisClient.on('ready', () => {
    console.log('Connexion à Redis établie');
});

