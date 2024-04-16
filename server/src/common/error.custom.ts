import { HttpException } from "@nestjs/common";
import { BaseResponse, IErrorResponse } from "./error.handle";


export class ErrorCustom extends HttpException {
    constructor(err: IErrorResponse, data?: any) {
        super(err, err.statusCode)

    }
}

export class SuccessCustom extends HttpException {
    constructor(resp: BaseResponse, data?: any) {
        super(resp, resp.statusCode);
    }
}