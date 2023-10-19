import { CreateTaskDto, UpdateTaskDto } from './dto/create.task.dto';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Task } from './tasks.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks() {
    return this.taskService.getTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    console.log(updateTaskDto);
    return this.taskService.updateTaskStatus(id, updateTaskDto.status);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }
}
