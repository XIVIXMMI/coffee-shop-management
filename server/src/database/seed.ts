import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.role.createMany({
            data: [
                { role_name: 'Admin' },
                { role_name: 'Staff' },
                { role_name: 'Customer' },
            ],
        });

        await prisma.staff.createMany({
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
        });

        await prisma.user.createMany({
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
        });

        await prisma.drink.createMany({
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
        });

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
    } catch (error) {
        console.error('Error creating seed data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
