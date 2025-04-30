import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const HourCustomValidator = createParamDecorator(
  (data: keyof Request, ctx: ExecutionContext) => {
    const context = ctx.switchToHttp();
    const request: Request = context.getRequest();
  },
);
