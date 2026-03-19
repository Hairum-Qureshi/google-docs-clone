import { UserPayload } from './user-payload.type';

export type AuthRequest = Request & {
  user?: UserPayload;
};
