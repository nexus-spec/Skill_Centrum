import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

export default new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
<<<<<<< HEAD

entities: [join(__dirname, '..', '**/*.entity.{ts,js}')],
migrations: [join(__dirname, '..', 'migrations/*.{ts,js}')],
  synchronize: false, // IMPORTANT: false when using migrations
=======
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.DB_SYNC === 'false',
>>>>>>> 0ed09e2952877a8295256fafc30c7548e8b3e3f8
});
