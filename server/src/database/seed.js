"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 6, 8]);
                    return [4 /*yield*/, prisma.role.createMany({
                            data: [
                                { role_name: 'Admin' },
                                { role_name: 'Staff' },
                                { role_name: 'Customer' },
                            ],
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma.staff.createMany({
                            data: [
                                {
                                    staff_name: 'John Doe',
                                    gender: 'Male',
                                    birthday: new Date('1990-01-01'),
                                    address: '123 Main St, City',
                                    phone_number: '123456789',
                                    email: 'john@example.com',
                                    position: 'Manager',
                                    salary: 50000.0,
                                    start_date: new Date('2022-01-01'),
                                },
                                {
                                    staff_name: 'Jane Smith',
                                    gender: 'Female',
                                    birthday: new Date('1995-05-15'),
                                    address: '456 Elm St, City',
                                    phone_number: '987654321',
                                    email: 'jane@example.com',
                                    position: 'Sales Associate',
                                    salary: 30000.0,
                                    start_date: new Date('2022-01-15'),
                                },
                            ],
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.createMany({
                            data: [
                                {
                                    username: 'john_doe',
                                    password: 'Aa@$dmin123',
                                    phone_number: '+840934567890',
                                    role_id: 1,
                                    staff_id: 1,
                                },
                                {
                                    username: 'jane_smith',
                                    password: 'Aa@$dmin123',
                                    phone_number: '+849876543210',
                                    role_id: 1,
                                    staff_id: 1,
                                },
                            ],
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.drink.createMany({
                            data: [
                                {
                                    drink_name: 'Coffee',
                                    price: 35000,
                                },
                                {
                                    drink_name: 'Tea',
                                    price: 20000,
                                },
                                {
                                    drink_name: 'Juice',
                                    price: 40000,
                                },
                                {
                                    drink_name: 'Soda',
                                    price: 25000,
                                },
                                {
                                    drink_name: 'Smoothie',
                                    price: 50000,
                                },
                                {
                                    drink_name: 'Espresso',
                                    price: 40000,
                                },
                                {
                                    drink_name: 'Latte',
                                    price: 45000,
                                },
                                {
                                    drink_name: 'Cappuccino',
                                    price: 45000,
                                },
                                {
                                    drink_name: 'Mocha',
                                    price: 50000,
                                },
                                {
                                    drink_name: 'Iced Coffee',
                                    price: 40000,
                                },
                                {
                                    drink_name: 'Iced Tea',
                                    price: 30000,
                                },
                                {
                                    drink_name: 'Lemonade',
                                    price: 35000,
                                },
                                {
                                    drink_name: 'Milkshake',
                                    price: 60000,
                                },
                                {
                                    drink_name: 'Hot Chocolate',
                                    price: 40000,
                                },
                                {
                                    drink_name: 'Fruit Punch',
                                    price: 35000,
                                },
                                {
                                    drink_name: 'Mocktail',
                                    price: 55000,
                                },
                                {
                                    drink_name: 'Energy Drink',
                                    price: 30000,
                                },
                                {
                                    drink_name: 'Coconut Water',
                                    price: 30000,
                                },
                                {
                                    drink_name: 'Sparkling Water',
                                    price: 25000,
                                },
                                {
                                    drink_name: 'Green Tea',
                                    price: 30000,
                                },
                            ],
                        })];
                case 4:
                    _a.sent();
                    // await prisma.$transaction([
                    //     prisma.bill.create({
                    //         data: {
                    //             bill_date: new Date(),
                    //             total_price: 190000,
                    //             created_by: 3, 
                    //             billdetails: {
                    //                 create: [
                    //                     { drink_id: 1, price: 35000, quantity: 2 },
                    //                     { drink_id: 2, price: 40000, quantity: 3 }, 
                    //                 ]     
                    //             },
                    //         },
                    //     }),
                    //     prisma.bill.create({
                    //         data: {
                    //             bill_date: new Date(),
                    //             total_price: 80000,
                    //             created_by: 3, 
                    //             billdetails: {
                    //                 create: [
                    //                     { drink_id: 3, price: 25000, quantity: 2 }, 
                    //                     { drink_id: 4, price: 30000, quantity: 1 }, 
                    //                 ],
                    //             },
                    //         },
                    //     }),
                    // ]);
                    console.log('Seed data created successfully');
                    return [3 /*break*/, 8];
                case 5:
                    error_1 = _a.sent();
                    console.error('Error creating seed data:', error_1);
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, prisma.$disconnect()];
                case 7:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
main();
