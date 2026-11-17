import type {Model} from 'mongoose';
import type {QueryFilter, ProjectionType, QueryOptions} from 'mongoose';
import type {PopulateOptions} from 'mongoose';
export abstract class DBRepository<T> {
    constructor(public readonly model: Model<T>) {}
    create = async (data : Partial<T>) => {
        return await this.model.create([data]);
    }
    findOne = async (
        { filter, options = {} }: { filter: QueryFilter<T>; options: QueryOptions<T> },
        projection?: ProjectionType<T>
    ) => {
        return await this.model.findOne(filter, projection, options);
    }
find =async ({filter,options={}}:{
    filter: QueryFilter<T>,
    options: QueryOptions<T>
}) => {
    let query = this.model.find(filter)
    if(options?.select) query = query.select(options?.select)
    if(options?.limit) query = query.limit(options?.limit)
    if(options?.skip) query = query.skip(options?.skip)
    if(options?.populate) query = query.populate(options?.populate as PopulateOptions)
    return await query.exec()
}
findById = async ({id,options={}}:{
    id:any,
    options: QueryOptions<T>
}) => {
    return await this.model.findById(id, options);
}
findByIdAndUpdate = async ({id,update,options={}}:{
    id:any,
    update: Partial<T>,
    options: QueryOptions<T>
}) => {
    return await this.model.findByIdAndUpdate(id, update, {new: true, runValidators: true, ...options});
}
findOneAndUpdate = async ({filter,update,options={}}:{
    filter: QueryFilter<T>,
    update: Partial<T>,
    options: QueryOptions<T>
}) => {
    return await this.model.findOneAndUpdate(filter, update, {new: true, runValidators: true, ...options});
}
deleteMany = async ({filter}:{
    filter: QueryFilter<T>
}) => {
    return await this.model.deleteMany(filter);
}
}

