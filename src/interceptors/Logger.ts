import { Context, Next } from 'koa';

export default async function LoggerInterceptor(ctx: Context, next: Next) {
  await next();
}
