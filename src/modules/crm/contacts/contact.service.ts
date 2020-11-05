import ContactModel from "./contact.model";
import IBaseQuery from "../../../data/BaseQuery";

import {hasValue} from "../../../utils/validation";

import * as repo from "../../../utils/repository";
import {IContact} from "../types";
import {dataToContact} from "./contact.dto";
import {parseNumber} from "../../../utils/numberHelpers";

export const exitsAsync = async (id: string): Promise<boolean> => {
    return repo.exitsAsync<IContact>(ContactModel, id)
};

export const createPersonAsync = async (data: any): Promise<IContact> => {
    const dt = dataToContact(data);
    return await repo.createAsync<IContact>(ContactModel, dt)
};

// TODO Add validation
export const createAsync = async (data: any): Promise<IContact> => {
    return await repo.createAsync<IContact>(ContactModel, data)
};

export const searchAsync = async (q: IBaseQuery): Promise<IContact[]> => {
    const filter: any = createQuery(q)
    return ContactModel.find(filter, null, {skip: parseNumber(q.skip), limit: parseNumber(q.limit)});
};

export const createQuery = (q: IBaseQuery) => {
    const filter: any = {}
    if (hasValue(q.query)) {
        const regex = {$regex: new RegExp(q.query), $options: 'i'}
        filter['$or'] = [
            {'person.firstName': regex},
            {'person.lastName': regex},
            {'person.middleName': regex}
        ]
    }
    return filter
}

export const getByIdAsync = async (id: string): Promise<IContact> => {
    return repo.getByIdAsync<IContact>(ContactModel, id)
};

export const deleteAsync = async (id: string): Promise<IContact> => {
    return repo.deleteAsync<IContact>(ContactModel, id)
};
