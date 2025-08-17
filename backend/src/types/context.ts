import { parseAuthHeader } from '../middlewares/auth.js';

export type GraphQLContext = {
  user: null | { uid: string; role: 'ADMIN' | 'STUDENT'; sessionId: string };
  req: any;
  res: any;
};

export async function buildContext({ req, res }: any): Promise<GraphQLContext> {
  const auth = req.headers['authorization'] as string | undefined;
  const payload = parseAuthHeader(auth || '');
  return { user: payload ? { uid: payload.uid, role: payload.role, sessionId: payload.sessionId } : null, req, res };
}
