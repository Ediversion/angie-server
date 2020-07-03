import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTask } from './entities/user_task.entity';
import { RegisterTaskDto } from '../auth/dto/register-task.dto';
import SearchDto from '../shared/dto/search.dto';

@Injectable()
export class UserTaskService {
    constructor(
        @InjectRepository(UserTask)
        private readonly repository: Repository<UserTask>,
    ) { }

    async findAll(req: SearchDto): Promise<UserTask[]> {
        return await this.repository.find(
            {
            // skip: req.skip,
            // take: req.limit,
        });
    }

    async create(data: UserTask): Promise<UserTask> {
        return await this.repository.save(data);
    }

    // async register(dto: RegisterTaskDto): Promise<Task> {
    //     const task = new Task();
    //     task.id = dto.id;
    //     task.ministry = dto.ministry;
    //     task.taskName = dto.taskName;
    //     task.taskDescription = dto.taskDescription
    //     return await this.repository.save(task);
    // }

    findOne(id: number): Promise<UserTask> {
        return this.repository.findOne(id);
    }

    async update(id: UserTask): Promise<UserTask> {
        return await this.repository.save(id);
    }
    
    async remove(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    // async findByName(ministry: string): Promise<Task | undefined> {
    //     return this.repository.findOne(ministry);
    // }

    // async exits(Ministry: string): Promise<boolean> {
    //     const count = await this.repository.count({ where: { Ministry } });
    //     return count > 0;
    // }
}

