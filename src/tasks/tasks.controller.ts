import { CreateTaskDto } from './dto/create.task.dto';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { getTaskFilterDto } from './dto/get_task_filter.dto';
import { TaskStatusValidationPipe } from './pipes/task_status_validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: getTaskFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTaskWithFilters(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    this.taskService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ) {
    return this.taskService.updateTaskStatus(id, status);
  }

  @Post()
  // Validation Pipes
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }
}
