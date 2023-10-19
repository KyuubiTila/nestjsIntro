import { TaskStatus } from './../taskStatus.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  // parameters validation
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export class UpdateTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
