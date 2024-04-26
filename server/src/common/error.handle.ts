import { HttpException, HttpStatus } from '@nestjs/common';



type TErrorCode = 'PermissionDenied'
    | 'UserNotExits'
    | 'PasswordNotExits'
    | 'ValidIsEmail'
    | 'UserIsExisted'
    | 'DrinksIsNotExisted'




export interface IErrorResponse {
    statusCode: number;
    message: string;
}

export const ERROR_RESPONSE: Record<TErrorCode, IErrorResponse> = {

    PermissionDenied: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Permission Denied',
    },
    UserNotExits: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'User not exits',
    },
    PasswordNotExits: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Password invalid',
    },
    ValidIsEmail: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Email is valid',
    },
    UserIsExisted: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'User is existed'
    },
    DrinksIsNotExisted: {
        statusCode: HttpStatus.BAD_GATEWAY,
        message: 'Drinks is not existed'
    }
}


type TSuccessCode = 'ResponseSuccess' |
    'AdminLoginSuccess' |
    'AdminLogoutSuccess' |
    'AdminCreateSuccess'


export interface BaseResponse {
    statusCode: number;
    message: string;
}

export const SUCCESS_RESPONSE: Record<TSuccessCode, BaseResponse> = {
    ResponseSuccess: {
        statusCode: HttpStatus.OK,
        message: 'Success',
    },
    AdminLoginSuccess: {
        statusCode: HttpStatus.OK,
        message: 'Login successfully',
    },
    AdminLogoutSuccess: {
        statusCode: HttpStatus.OK,
        message: 'Logout successfully',
    },

    AdminCreateSuccess: {
        statusCode: HttpStatus.OK,
        message: 'Admin created successfully',
    }
}

