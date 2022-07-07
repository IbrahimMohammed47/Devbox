import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
  
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  
    catch(exception: unknown, host: ArgumentsHost): void {
      // In certain situations `httpAdapter` might not be available in the
      // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
  
    const ctx = host.switchToHttp();
    let errRes = {
        msg: "Internal Server error",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    };
    if (typeof exception == 'object'){
        let msg = exception['message']
        if(msg.includes("Unauthorized")){
            errRes = {
                msg,
                statusCode: HttpStatus.UNAUTHORIZED
            }
        }
        else if(msg.includes("duplicate key")){
            errRes = {
                msg,
                statusCode: HttpStatus.CONFLICT
            }
        }
        else if(msg.includes("not found")){
            errRes = {
                msg,
                statusCode: HttpStatus.NOT_FOUND
            }
        }
        else if(msg.includes("invalid input") || msg.includes('violates not-null constraint')){
            errRes = {
                msg,
                statusCode: HttpStatus.BAD_REQUEST
            }
        }
        else if(msg.includes("Bad Request")){            
            errRes = {
                msg: exception['response']['message'].join(' , '),
                statusCode: HttpStatus.BAD_REQUEST
            }
        }
        else{
            console.log(msg)
            errRes = {
                msg: "Internal Server error",
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }
    
    const responseBody = {
        ...errRes,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };  
    httpAdapter.reply(ctx.getResponse(), responseBody, errRes.statusCode);
  }
}
  