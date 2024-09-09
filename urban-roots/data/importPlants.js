const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();
const plants = JSON.parse(fs.readFileSync('plantes.json', 'utf-8'));

async function main() {
  for (const plant of plants) {
    await prisma.plant.create({
      data: plant,
    });
  }
  console.log('Données importées avec succès !');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
