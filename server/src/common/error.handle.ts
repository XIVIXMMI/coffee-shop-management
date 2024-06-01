import { HttpException, HttpStatus } from '@nestjs/common';



type TErrorCode = 'PermissionDenied'
    | 'UserNotExits'
    | 'PasswordNotExits'
    | 'ValidIsEmail'
    | 'UserIsExisted'
    | 'DrinksIsNotExisted'
    | 'MenuIsNotExisted'
    |   'RoleIsNotExisted'
    |   'StaffIsNotExisted'
    |   'IngredientIsNotExisted'
    |   'ToolIsNotExisted'
    |   'ItemIsNotExisted'
    |   'EquipmentTypeIsNotExisted'
    |   'NotEnoughWeight'
    |   'BillIsNotExisted'
    |   'CreateFailed'
    |   'UpdatingFailed'
    |   'DeletingFailed'
    |   'UserWasLogin'
    |   "UserWasLogout"

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
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Drinks is not existed'
    },
    MenuIsNotExisted: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Menu is not existed'
    },
    RoleIsNotExisted: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Role is not existed'
    },
    StaffIsNotExisted: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Staff is not existed'
    },
    IngredientIsNotExisted: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Ingredient is not existed'
    },
    ToolIsNotExisted: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Tool is not existed'
    },
    ItemIsNotExisted: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Item is not existed'
    },
    EquipmentTypeIsNotExisted: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Equipment type is not existed'
    },
    NotEnoughWeight: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Not enough weight '
    },
    BillIsNotExisted: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bill is not existed'
    },
    CreateFailed: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'creating is failed'
    },
    UpdatingFailed: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'updating is failed'
    },
    DeletingFailed: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'deleting is failed'
    },
    UserWasLogin:{
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'User was Log In'
    },
    UserWasLogout:{
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'User was Log Out'
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

