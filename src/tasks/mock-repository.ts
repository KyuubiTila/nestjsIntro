import { EntityRepository, Repository } from 'typeorm';
import { Task } from './tasks.entity';

@EntityRepository(Task)
export class MockTaskRepository extends Repository<Task> {
  getTasks: jest.Mock;
  findOne: jest.Mock;
  createTask: jest.Mock;

  constructor() {
    super();
    this.getTasks = jest.fn();
    this.findOne = jest.fn();
    this.createTask = jest.fn();
  }
}
