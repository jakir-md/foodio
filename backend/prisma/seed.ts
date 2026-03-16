import { PrismaClient, Role, OrderStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting database seeding...");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);
  const userPassword = await bcrypt.hash(process.env.USER_PASS, 10);

  const admin = await prisma.user.create({
    data: {
      email: process.env.ADMIN_EMAIL,
      name: "Foodio Admin",
      password: adminPassword,
      address: "123 Admin Dhaka City",
      role: Role.ADMIN,
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: process.env.USER_EMAIL,
      name: "John Doe",
      password: userPassword,
      address: "456 Customer Rangpur City",
      role: Role.USER,
    },
  });
  console.log("Users created (1 Admin, 1 Customer)");

  const starters = await prisma.category.create({ data: { name: "Starters" } });
  const mains = await prisma.category.create({
    data: { name: "Main Courses" },
  });
  const desserts = await prisma.category.create({ data: { name: "Desserts" } });
  console.log("3 Categories created");

  const menuData = [
    {
      name: "Garlic Bread",
      description: "Crispy and buttery.",
      price: 10,
      image:
        "https://res.cloudinary.com/dymemmfp6/image/upload/v1773665021/foodio_products/otqpjllmdqs2hupftjke.png",
      categoryId: starters.id,
    },
    {
      name: "Caesar Salad",
      description: "Fresh romaine with parmesan.",
      price: 8,
      image:
        "https://res.cloudinary.com/dymemmfp6/image/upload/v1773665180/foodio_products/pfh4mmrteg2ciblvw90u.png",
      categoryId: starters.id,
    },
    {
      name: "Margherita Pizza",
      description: "Classic tomato and mozzarella.",
      price: 15,
      image:
        "https://res.cloudinary.com/dymemmfp6/image/upload/v1773640550/foodio_products/ph7hxk3fimz8dbpemmfk.png",
      categoryId: mains.id,
    },
    {
      name: "Grilled Salmon",
      description: "Wild-caught salmon with asparagus.",
      price: 20,
      image:
        "https://res.cloudinary.com/dymemmfp6/image/upload/v1773664968/foodio_products/dp3av5cbtfmykkaep78p.png",
      categoryId: mains.id,
    },
    {
      name: "Chicken Parmesan",
      description: "Breaded chicken with marinara.",
      price: 18,
      image:
        "https://res.cloudinary.com/dymemmfp6/image/upload/v1773665297/foodio_products/gsymh63vqtbvdate7x9c.png",
      categoryId: mains.id,
    },
    {
      name: "Beef Burger",
      description: "Juicy patty with cheddar.",
      price: 16,
      image:
        "https://res.cloudinary.com/dymemmfp6/image/upload/v1773665116/foodio_products/y2tcznbzifne2s8rv7ai.png",
      categoryId: mains.id,
    },
    {
      name: "Chocolate Lava Cake",
      description: "Gooey center with vanilla ice cream.",
      price: 15,
      image:
        "https://res.cloudinary.com/dymemmfp6/image/upload/v1773665297/foodio_products/gsymh63vqtbvdate7x9c.png",
      categoryId: desserts.id,
    },
    {
      name: "Tiramisu",
      description: "Coffee-flavored Italian dessert.",
      price: 10,
      image:
        "https://res.cloudinary.com/dymemmfp6/image/upload/v1773664968/foodio_products/dp3av5cbtfmykkaep78p.png",
      categoryId: desserts.id,
    },
  ];

  const createdItems = [];
  for (const item of menuData) {
    const created = await prisma.menuItem.create({ data: item });
    createdItems.push(created);
  }
  console.log("8 Menu Items created");

  await prisma.order.create({
    data: {
      userId: customer.id,
      status: OrderStatus.PENDING,
      totalAmount: createdItems[0].price * 2 + createdItems[2].price * 1,
      orderItems: {
        create: [
          {
            menuItemId: createdItems[0].id,
            quantity: 2,
            price: createdItems[0].price,
          },
          {
            menuItemId: createdItems[2].id,
            quantity: 1,
            price: createdItems[2].price,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: customer.id,
      status: OrderStatus.PREPARING,
      totalAmount: createdItems[3].price * 1,
      orderItems: {
        create: [
          {
            menuItemId: createdItems[3].id,
            quantity: 1,
            price: createdItems[3].price,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: customer.id,
      status: OrderStatus.COMPLETED,
      totalAmount: createdItems[5].price * 5 + createdItems[6].price * 3,
      orderItems: {
        create: [
          {
            menuItemId: createdItems[5].id,
            quantity: 5,
            price: createdItems[5].price * 5,
          },
          {
            menuItemId: createdItems[6].id,
            quantity: 3,
            price: createdItems[6].price * 3,
          },
        ],
      },
    },
  });
  console.log("3 Orders created for the customer");

  console.log(" Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
