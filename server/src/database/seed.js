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
                    _a.trys.push([0, 17, 18, 20]);
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
                                    staff_name: 'Anh Duy',
                                    gender: 'Male',
                                    birthday: new Date('1990-01-01'),
                                    address: '123 Main St, City',
                                    phone_number: '+84934567890',
                                    email: 'john@example.com',
                                    position: 'Manager',
                                    salary: 50000.0,
                                    start_date: new Date('2022-01-01'),
                                    deleted: false
                                },
                                {
                                    staff_name: 'Duy Tran',
                                    gender: 'Female',
                                    birthday: new Date('1995-05-15'),
                                    address: '456 Elm St, City',
                                    phone_number: '+849876543210',
                                    email: 'jane@example.com',
                                    position: 'Sales Associate',
                                    salary: 30000.0,
                                    start_date: new Date('2022-01-15'),
                                    deleted: false
                                },
                            ],
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.createMany({
                            data: [
                                {
                                    username: 'AnhDuy',
                                    password: 'Aa@$dmin123',
                                    phone_number: '+840934567890',
                                    role_id: 1,
                                    staff_id: 1,
                                },
                                {
                                    username: 'DuyTran',
                                    password: 'Aa@$dmin123',
                                    phone_number: '+849876543210',
                                    role_id: 1,
                                    staff_id: 2,
                                },
                            ],
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.drink.createMany({
                            data: [
                                {
                                    drink_name: 'Espresso Coffee',
                                    price: 40000,
                                    image_url: 'https://res.cloudinary.com/debdujr1m/image/upload/v1716972266/t0ptzeqpzrn7equhjjk4.jpg ',
                                },
                                {
                                    drink_name: 'Matcha Tea',
                                    price: 20000,
                                    image_url: 'https://res.cloudinary.com/debdujr1m/image/upload/v1716971850/ty7rghqtqljni8alodb8.jpg ',
                                },
                                {
                                    drink_name: 'Orange Juice',
                                    price: 40000,
                                    image_url: 'https://res.cloudinary.com/debdujr1m/image/upload/v1716971829/eljk9ycjoflcgbbbcchd.jpg ',
                                },
                                {
                                    drink_name: 'Latte Coffee',
                                    price: 45000,
                                    image_url: 'https://res.cloudinary.com/debdujr1m/image/upload/v1716971841/dosacyc4azr97vuiyy8m.jpg ',
                                },
                                {
                                    drink_name: 'Cappuccino Coffee',
                                    price: 45000,
                                    image_url: 'https://res.cloudinary.com/debdujr1m/image/upload/v1716971832/zdoggkoxu1nsn742h5nt.webp ',
                                },
                                {
                                    drink_name: 'Lemonade',
                                    price: 35000,
                                    image_url: 'https://res.cloudinary.com/debdujr1m/image/upload/v1716971177/mfbzz0qfjzotz3lgxdru.jpg ',
                                },
                            ],
                        })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, prisma.equipmentType.createMany({
                            data: [
                                {
                                    equipmenttype_id: 1,
                                    equipmenttype_name: 'ingredient_type',
                                },
                                {
                                    equipmenttype_id: 2,
                                    equipmenttype_name: 'coffee_brewing_tool_type',
                                },
                                {
                                    equipmenttype_id: 3,
                                    equipmenttype_name: 'shop_equipment_type',
                                },
                            ],
                        })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, prisma.storage.createMany({
                            data: [
                                //nguyên liệu 
                                {
                                    goods_name: 'Arabica coffee beans',
                                    arrival_date: new Date('2024-01-01T00:00:00'),
                                    cost_price: 180000.0,
                                    quantity: 10.0,
                                    goods_unit: 'kilogram',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 1,
                                },
                                {
                                    goods_name: 'Robusta coffee beans',
                                    arrival_date: new Date('2024-01-01T00:00:00'),
                                    cost_price: 150000.0,
                                    quantity: 10.0,
                                    goods_unit: 'kilogram',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 1,
                                },
                                {
                                    goods_name: 'Green tea leaves',
                                    arrival_date: new Date('2024-01-05T00:00:00'),
                                    cost_price: 120000.0,
                                    quantity: 20.0,
                                    goods_unit: 'kilogram',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 1,
                                },
                                {
                                    goods_name: 'Lemon',
                                    arrival_date: new Date('2024-01-05T00:00:00'),
                                    cost_price: 100000.0,
                                    quantity: 10.0,
                                    goods_unit: 'kilogram',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 1,
                                },
                                {
                                    goods_name: 'Milk',
                                    arrival_date: new Date('2024-01-10T00:00:00'),
                                    cost_price: 50000.0,
                                    quantity: 25.0,
                                    goods_unit: 'millilitre',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 1,
                                },
                                {
                                    goods_name: 'Matcha powder',
                                    arrival_date: new Date('2024-01-15T00:00:00'),
                                    cost_price: 1000000.0,
                                    quantity: 5.0,
                                    goods_unit: 'kilogram',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 1,
                                },
                                {
                                    goods_name: 'White Sugar',
                                    arrival_date: new Date('2024-01-15T00:00:00'),
                                    cost_price: 300000.0,
                                    quantity: 10.0,
                                    goods_unit: 'kilogram',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 1,
                                },
                                {
                                    goods_name: 'Peppermint leaves',
                                    arrival_date: new Date('2024-01-25T00:00:00'),
                                    cost_price: 60000.0,
                                    quantity: 20.0,
                                    goods_unit: 'kilogram',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 1,
                                },
                                {
                                    goods_name: 'Orange',
                                    arrival_date: new Date('2024-01-25T00:00:00'),
                                    cost_price: 10000.0,
                                    quantity: 30.0,
                                    goods_unit: 'kilogram',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 1,
                                },
                                //dụng cụ pha chế
                                {
                                    goods_name: 'Spoon',
                                    arrival_date: new Date('2024-01-25T00:00:00'),
                                    cost_price: 1000000.0,
                                    quantity: 100.0,
                                    goods_unit: 'piece',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 2,
                                },
                                {
                                    goods_name: 'Shaker',
                                    arrival_date: new Date('2024-01-25T00:00:00'),
                                    cost_price: 1200000.0,
                                    quantity: 80.0,
                                    goods_unit: 'piece',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 2,
                                },
                                {
                                    goods_name: 'Jigger',
                                    arrival_date: new Date('2024-01-25T00:00:00'),
                                    cost_price: 800000.0,
                                    quantity: 120.0,
                                    goods_unit: 'piece',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 2,
                                },
                                {
                                    goods_name: 'Muddler',
                                    arrival_date: new Date('2024-01-25T00:00:00'),
                                    cost_price: 900000.0,
                                    quantity: 90.0,
                                    goods_unit: 'piece',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 2,
                                },
                                {
                                    goods_name: 'Strainer',
                                    arrival_date: new Date('2024-01-25T00:00:00'),
                                    cost_price: 1500000.0,
                                    quantity: 70.0,
                                    goods_unit: 'piece',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 2,
                                },
                                {
                                    goods_name: 'Broom',
                                    arrival_date: new Date('2024-01-25T00:00:00'),
                                    cost_price: 350000.0,
                                    quantity: 5.0,
                                    goods_unit: 'piece',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 3,
                                },
                                {
                                    goods_name: 'Espresso Machine',
                                    arrival_date: new Date('2024-01-25T00:00:00'),
                                    cost_price: 7000000.0,
                                    quantity: 2.0,
                                    goods_unit: 'piece',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 3,
                                },
                                {
                                    goods_name: 'Coffee Grinder',
                                    arrival_date: new Date('2024-01-25T00:00:00'),
                                    cost_price: 4000000.0,
                                    quantity: 1.0,
                                    goods_unit: 'piece',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 3,
                                },
                                {
                                    goods_name: 'Milk Frother',
                                    arrival_date: new Date('2024-01-25T00:00:00'),
                                    cost_price: 1500000.0,
                                    quantity: 3.0,
                                    goods_unit: 'piece',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 3,
                                },
                                {
                                    goods_name: 'Syrup Bottles',
                                    arrival_date: new Date('2024-01-25T00:00:00'),
                                    cost_price: 300000.0,
                                    quantity: 10.0,
                                    goods_unit: 'bottle',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 3,
                                },
                                {
                                    goods_name: 'Cleaning tools',
                                    arrival_date: new Date('2024-01-25T00:00:00'),
                                    cost_price: 300000.0,
                                    quantity: 3.0,
                                    goods_unit: 'set',
                                    created_by: 1,
                                    deleted_by: null,
                                    equipmenttype_id: 3,
                                }
                            ],
                        })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, prisma.ingredient.createMany({
                            data: [
                                {
                                    storage_id: 1,
                                    ingredient_name: 'Arabica coffee beans'
                                },
                                {
                                    storage_id: 2,
                                    ingredient_name: 'Robusta coffee beans',
                                },
                                {
                                    storage_id: 3,
                                    ingredient_name: 'Green tea leaves',
                                },
                                {
                                    storage_id: 4,
                                    ingredient_name: 'Lemon',
                                },
                                {
                                    storage_id: 5,
                                    ingredient_name: 'Milk',
                                },
                                {
                                    storage_id: 6,
                                    ingredient_name: 'Matcha powder',
                                },
                                {
                                    storage_id: 7,
                                    ingredient_name: 'White Sugar',
                                },
                                {
                                    storage_id: 8,
                                    ingredient_name: 'Peppermint leaves',
                                },
                                {
                                    storage_id: 9,
                                    ingredient_name: 'Orange',
                                },
                            ]
                        })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, prisma.coffeeBrewingTool.createMany({
                            data: [
                                {
                                    storage_id: 10,
                                    brewingtool_name: 'Spoon',
                                },
                                {
                                    storage_id: 11,
                                    brewingtool_name: 'Shaker',
                                },
                                {
                                    storage_id: 12,
                                    brewingtool_name: 'Jigger',
                                },
                                {
                                    storage_id: 13,
                                    brewingtool_name: 'Muddler',
                                },
                                {
                                    storage_id: 14,
                                    brewingtool_name: 'Strainer',
                                },
                            ]
                        })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, prisma.shopEquipment.createMany({
                            data: [
                                {
                                    storage_id: 15,
                                    equipment_name: 'Broom',
                                },
                                {
                                    storage_id: 16,
                                    equipment_name: 'Espresso Machine',
                                },
                                {
                                    storage_id: 17,
                                    equipment_name: 'Coffee Grinder',
                                },
                                {
                                    storage_id: 18,
                                    equipment_name: 'Milk Frother',
                                },
                                {
                                    storage_id: 19,
                                    equipment_name: 'Syrup Bottles',
                                },
                                {
                                    storage_id: 20,
                                    equipment_name: 'Cleaning tools',
                                },
                            ]
                        })];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, prisma.drinksDetails.createMany({
                            data: [
                                {
                                    drink_id: 1,
                                    ingredient_id: 1,
                                    ingredient_weight: 0.2
                                },
                                {
                                    drink_id: 1,
                                    ingredient_id: 8,
                                    ingredient_weight: 0.2
                                },
                                {
                                    drink_id: 2,
                                    ingredient_id: 6,
                                    ingredient_weight: 0.05
                                },
                                {
                                    drink_id: 2,
                                    ingredient_id: 7,
                                    ingredient_weight: 0.3
                                },
                                {
                                    drink_id: 3,
                                    ingredient_id: 8,
                                    ingredient_weight: 0.2
                                },
                                {
                                    drink_id: 3,
                                    ingredient_id: 9,
                                    ingredient_weight: 0.5
                                },
                                {
                                    drink_id: 4,
                                    ingredient_id: 1,
                                    ingredient_weight: 0.2
                                },
                                {
                                    drink_id: 4,
                                    ingredient_id: 6,
                                    ingredient_weight: 0.4
                                },
                                {
                                    drink_id: 5,
                                    ingredient_id: 2,
                                    ingredient_weight: 0.2
                                },
                                {
                                    drink_id: 5,
                                    ingredient_id: 8,
                                    ingredient_weight: 0.2
                                },
                                {
                                    drink_id: 6,
                                    ingredient_id: 4,
                                    ingredient_weight: 0.2
                                },
                                {
                                    drink_id: 6,
                                    ingredient_id: 8,
                                    ingredient_weight: 0.3
                                },
                            ]
                        })];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, prisma.bill.createMany({
                            data: [
                                {
                                    bill_date: new Date(),
                                    total_price: 35000.0,
                                    created_by: 1,
                                },
                                {
                                    bill_date: new Date(),
                                    total_price: 60000.0,
                                    created_by: 1,
                                }
                            ]
                        })];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, prisma.billDetails.createMany({
                            data: [
                                {
                                    bill_id: 1,
                                    drink_id: 1,
                                    price: 10000.0,
                                    quantity: 2,
                                },
                                {
                                    bill_id: 1,
                                    drink_id: 2,
                                    price: 15000.0,
                                    quantity: 1,
                                },
                                {
                                    bill_id: 2,
                                    drink_id: 3,
                                    price: 20000.0,
                                    quantity: 3,
                                },
                            ]
                        })];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, prisma.menu.createMany({
                            data: [
                                {
                                    menu_name: "Coffee menu"
                                },
                                {
                                    menu_name: "Juice menu"
                                }
                            ]
                        })];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, prisma.menuDetails.createMany({
                            data: [
                                {
                                    menu_id: 1,
                                    drink_id: 1
                                },
                                {
                                    menu_id: 1,
                                    drink_id: 4
                                },
                                {
                                    menu_id: 1,
                                    drink_id: 5
                                },
                                {
                                    menu_id: 2,
                                    drink_id: 2
                                },
                                {
                                    menu_id: 2,
                                    drink_id: 3
                                },
                                {
                                    menu_id: 2,
                                    drink_id: 6
                                },
                            ]
                        })
                        // Lấy thời gian hiện tại
                    ];
                case 14:
                    _a.sent();
                    // Lấy thời gian hiện tại
                    return [4 /*yield*/, prisma.attendance.createMany({
                            data: [
                                {
                                    staff_id: 1,
                                    date: new Date("2024-05-30"),
                                    check_in_time: new Date(),
                                    status: 'Login',
                                    notes: 'Checked in on time'
                                },
                                {
                                    staff_id: 1,
                                    date: new Date(),
                                    check_out_time: new Date(),
                                    status: 'Logout',
                                    notes: 'Checked in on time'
                                },
                            ]
                        })];
                case 15:
                    // Lấy thời gian hiện tại
                    _a.sent();
                    return [4 /*yield*/, prisma.dailyReport.createMany({
                            data: [
                                {
                                    date: new Date(),
                                    content: "đủ tiền hôm nay",
                                    created_at: new Date(),
                                    user_id: 1
                                },
                                {
                                    date: new Date(),
                                    content: "Vỡ 2 cái ly thuỷ tinh",
                                    created_at: new Date(),
                                    user_id: 1
                                }
                            ]
                        })];
                case 16:
                    _a.sent();
                    console.log('Seed data created successfully');
                    return [3 /*break*/, 20];
                case 17:
                    error_1 = _a.sent();
                    console.error('Error creating seed data:', error_1);
                    return [3 /*break*/, 20];
                case 18: return [4 /*yield*/, prisma.$disconnect()];
                case 19:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 20: return [2 /*return*/];
            }
        });
    });
}
main();
