import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    console.log(`${req.method} ${req.url} – ${new Date().toISOString()}`);
    return next
      .handle()
      .pipe(tap(() => console.log(`Handled in ${Date.now() - now}ms`)));
  }
}
