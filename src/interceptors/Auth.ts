import { Context, Next } from 'koa';

export default async function AuthInterceptor(ctx: Context, next: Next) {
  await next();
}
