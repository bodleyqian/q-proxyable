import { Context, Next } from 'koa';

export default async function StaticInterceptor(ctx: Context, next: Next) {
  await next();
}
