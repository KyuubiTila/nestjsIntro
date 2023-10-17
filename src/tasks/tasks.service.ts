import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create.task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './taskStatus.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTasks(): Promise<Task[]> {
    const tasks = await this.taskRepository.find();
    return tasks;
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: {
        id,
      },
    });
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return found;
  }

  async deleteTaskById(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id of ${id} not found`);
    }
  }
  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { description, title } = createTaskDto;
    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }
}
