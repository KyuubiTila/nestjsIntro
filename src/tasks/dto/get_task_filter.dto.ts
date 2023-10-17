import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../taskStatus.enum';

export class getTaskFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGESS, TaskStatus.OPEN])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
