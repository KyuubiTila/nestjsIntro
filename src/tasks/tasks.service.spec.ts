import { TasksService } from './tasks.service';
import { describe } from 'node:test';
import { Test } from '@nestjs/testing';
import { Task } from './tasks.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockTaskRepository } from './mock-repository';

const mockUser = { id: 12, username: 'User1' };

describe('TaskService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useClass: MockTaskRepository,
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    taskRepository = module.get<MockTaskRepository>(getRepositoryToken(Task));
  });

  describe('getTaskById', () => {
    it('calls taskRepository.findOne() and successfully return and retrieve the task', async () => {
      const mockTask = {
        title: 'Test Task ',
        description: 'this is our task',
      };
      taskRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById(1, mockUser);
      expect(result).toEqual(mockTask);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: mockUser.id,
        },
      });
    });

    it('throws an error as task is not found', () => {
      expect(taskRepository.findOne).not.toHaveBeenCalled();
    });
  });

  describe('createTask', () => {
    it('calls taskRepository.createTask() and successfully return the result', async () => {
      // const mockTask = {
      //   id: 1,
      //   title: 'test task',
      //   description: 'test description',
      //   user: mockUser,
      // };
      taskRepository.createTask.mockResolvedValue('mockTask');

      expect(taskRepository.createTask).not.toHaveBeenCalled();

      const createTaskDto = {
        description: 'test description',
        title: 'test task',
      };
      const result = await tasksService.createTask(createTaskDto, mockUser);
      expect(taskRepository.createTask).toHaveBeenCalledWith(
        createTaskDto,
        mockUser,
      );
      expect(result).toEqual('mockTask');
    });
  });
});
