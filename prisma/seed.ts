import db from "../src/db";

async function seedUsers() {
  try {
    await db.user.upsert({
      where: { username: "alice" },
      update: {},
      create: {
        username: "alice",
        password: "1111",
      },
    })
    await db.user.upsert({
      where: { username: "kumar" },
      update: {},
      create: {
        username: "kumar",
        password: "2222",
      },
    })
  } catch (error) {
    console.error("Error seeding users: ", error);
    throw error;
  }
}

async function seedDatabase() {
  try {
    await seedUsers();
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    db.$disconnect();
  }
}

seedDatabase().catch((error) => {
  console.error('An unexpected error occurred during seeding:', error);
  process.exit(1);
});
