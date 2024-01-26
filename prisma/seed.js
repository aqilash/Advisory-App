import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: "test@gmail.com" },
    update: {},
    create: {
      name: "user1",
      email: "test@gmail.com",
      role_type: "a",
      password: "test1234",
      listings: {
        create: [
          {
            name: "Top of the Rock",
            latitude: 40.75945511772404,
            longitude: -73.97937651647949,
          },
          {
            name: "Petronas Twin Towers",
            latitude: 3.157811831884703,
            longitude: 101.712182044144,
          },
        ],
      },
    },
  });
  const user2 = await prisma.user.upsert({
    where: { email: "test2@gmail.com" },
    update: {},
    create: {
      name: "user2",
      email: "test2@gmail.com",
      role_type: "a",
      password: "test2",
      listings: {
        create: [
          {
            name: "Griffith Observatory",
            latitude: 34.11859395236509,
            longitude: -118.3003613167086,
          },
          {
            name: "Gardens Mall",
            latitude: 3.118748747578534,
            longitude: 101.6759568414367,
          },
        ],
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
