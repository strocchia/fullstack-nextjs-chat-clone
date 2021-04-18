const faker = require("faker");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const fakeNewUsers = [...new Array(2)].map(() => {
    return {
      name: faker.name.findName(),
      email: faker.internet.email(),
      image: faker.image.image(),
      tweets: {
        create: {
          body: faker.animal.cat(),
        },
      },
    };
  });

  for (let fakeness of fakeNewUsers) {
    const user = await prisma.user.create({ data: fakeness });
    console.log(user);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
