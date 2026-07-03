import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor
  implements NestInterceptor
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request = context
      .switchToHttp()
      .getRequest();

    const method = request.method;
    const url = request.url;

    const start = Date.now();

    console.log(
      `Incoming ${method} ${url}`,
    );

    return next.handle().pipe(
      tap(() => {
        const duration =
          Date.now() - start;

        console.log(
          `${method} ${url} completed in ${duration} ms`,
        );
      }),
    );
  }
}