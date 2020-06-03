import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {UsersService} from './users.service';
import SearchDto from '../shared/dto/search.dto';
import {User} from './user.entity';
import {ApiTags} from '@nestjs/swagger';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {UserListDto} from "./dto/user-list.dto";

@ApiTags("Users")
@Controller('api/users')
export class UsersController {
    constructor(private readonly service: UsersService) {
    }

    @Get()
    async findAll(@Query() req: SearchDto): Promise<UserListDto[]> {
        return this.service.findAll(req);
    }

    @Post()
    async create(@Body()data: CreateUserDto): Promise<User> {
        const toSave = new User();
        toSave.contactId = data.contactId
        toSave.username = data.username
        toSave.password = data.password
        toSave.roles = data.roles
        toSave.hashPassword()
        return await this.service.create(toSave);
    }

    @Put()
    async update(@Body()data: UpdateUserDto): Promise<UserListDto> {
        return await this.service.update(data);
    }

    @Get(":id")
    async findOne(@Param('id') id: number): Promise<UserListDto> {
        return await this.service.findOne(id);
    }

    @Delete(":id")
    async remove(@Param('id') id: number): Promise<void> {
        await this.service.remove(id);
    }
}

