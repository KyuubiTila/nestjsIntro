import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  // parameters validation
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
