import { PrismaClient } from '../generated/prisma/index.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import Database from 'better-sqlite3';
import * as bcrypt from 'bcryptjs';

const sqlite = new Database('./dev.db');
const adapter = new PrismaBetterSqlite3({ url: './dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seed...');

  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  const tenant = await prisma.tenant.create({
    data: {
      name: 'Empresa Demo',
    },
  });

  await prisma.user.create({
    data: {
      email: 'admin@demo.com',
      name: 'Usuario Administrador',
      password: hashedPassword,
      telephone: '88888888',
      tenantId: tenant.id,
    },
  });

  console.log('🌱 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });