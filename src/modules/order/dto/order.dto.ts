import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum Priority {
  trivial = '1',
  medium = '2',
  high = '3',
}

export enum Status {
  open = 'open',
  working = 'working',
  done = 'done',
}

export class OrderDto {
  @IsNotEmpty()
  @IsString()
  obs: string;

  @IsDate()
  time: Date;

  @IsEnum(Priority)
  priority: Priority;

  @IsEnum(Status)
  status: Status;
}
