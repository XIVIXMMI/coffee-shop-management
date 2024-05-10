import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import * as multer from 'multer';

@Injectable()
export class FormDataInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest<Request>();

        // Check if the request is multipart/form-data
        const isFormData = request.headers['content-type'].includes('multipart/form-data');

        if (isFormData) {
            // Configure multer for form-data parsing
            const upload = multer().any();

            // Parse form data
            await new Promise<void>((resolve, reject) => {
                upload(request, null, async (err: any) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
        }

        return next.handle();
    }
}