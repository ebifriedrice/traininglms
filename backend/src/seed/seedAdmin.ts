import { connectDB } from '../db/connect.js';
import { User } from '../models/User.js';
import { hashPassword } from '../utils/crypto.js';

async function run() {
  await connectDB();
  const email = process.env.ADMIN_EMAIL || 'admin@xyz.test';
  const name = process.env.ADMIN_NAME || 'Super Admin';
  const password = process.env.ADMIN_PASSWORD || 'Admin@12345';
  let admin = await User.findOne({ email, role: 'ADMIN' });
  if (!admin) {
    admin = await User.create({ name, email, role: 'ADMIN', passwordHash: hashPassword(password) });
    console.log('Created admin:', email, 'password:', password);
  } else {
    console.log('Admin already exists:', email);
  }
  process.exit(0);
}

run().catch((e) => { console.error(e); process.exit(1); });
