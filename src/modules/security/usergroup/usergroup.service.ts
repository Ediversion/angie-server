import UserGroupModel, {IUserGroup, UserGroupDto} from './usergroup.model'
import * as repo from "../../../utils/repository";
import {Types} from "mongoose";


export const exitsAsync = async (id: string): Promise<boolean> => {
    return await UserGroupModel.exists({_id: new Types.ObjectId(id)})
};

export const createAsync = async (data: any): Promise<IUserGroup> => {
    const dt = UserGroupDto.create(data);
    return await repo.createAsync<IUserGroup>(UserGroupModel, dt)
};

export const getByNameAsync = async (name: string): Promise<IUserGroup> => {
    return UserGroupModel.findOne({name})
};
