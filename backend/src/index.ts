import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import { connectDB } from './db/connect.js';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './schema/resolvers/index.js';
import { buildContext } from './types/context.js';
import { cloudinary } from './config/cloudinary.js';
import bodyParser from 'body-parser';

async function bootstrap() {
  await connectDB();
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(express.json({ limit: '2mb' }));

  // Cloudinary upload signature for authenticated uploads
  app.post('/api/cloudinary/signature', bodyParser.json(), (req, res) => {
    try {
      const { folder = 'xyz-lms', resource_type = 'auto' } = req.body || {};
      const timestamp = Math.floor(Date.now() / 1000);
      const paramsToSign: Record<string, any> = { timestamp, folder };
      const signature = cloudinary.utils.api_sign_request(paramsToSign, env.CLOUDINARY.API_SECRET);
      res.json({ cloudName: env.CLOUDINARY.CLOUD_NAME, apiKey: env.CLOUDINARY.API_KEY, timestamp, folder, resource_type, signature });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'signature_failed' });
    }
  });

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  app.use('/graphql', expressMiddleware(server, { context: buildContext }));

  app.get('/', (_req, res) => res.send('XYZ LMS Backend is running. GraphQL at /graphql'));

  app.listen(env.PORT, () => {
    console.log(`Server listening on http://localhost:${env.PORT}`);
  });
}

bootstrap().catch((e) => {
  console.error(e);
  process.exit(1);
});
