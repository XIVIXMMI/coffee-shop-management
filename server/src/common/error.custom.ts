import { HttpException } from "@nestjs/common";
import { BaseResponse, IErrorResponse } from "./error.handle";


export class ErrorCustom extends HttpException {
    constructor(err: IErrorResponse, data?: any) {
        super(err, err.statusCode)
       
    }
}

export class SuccessCustom  {
    constructor(res: BaseResponse, data?: any) {
        this.statusCode = res.statusCode
        this.message = res.message
        this.data = data
    }
    statusCode: number;
    message: string;
    data?: any
}