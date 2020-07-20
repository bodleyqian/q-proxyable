import { Context, Next } from 'koa';

export default async function ControllerInterceptor(ctx: Context, next: Next) {
  await next();
}
