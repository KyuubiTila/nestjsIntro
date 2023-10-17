import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/tasks/tasks.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'taskmanagement',
  entities: [Task],
  synchronize: true,
};
