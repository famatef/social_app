import { Model, PopulateOptions} from "mongoose";
import type {QueryFilter, QueryOptions} from 'mongoose';
import userModel, { IUser } from "../models/user.model";
import { DBRepository } from "./db.repository";
export class UserRepository extends DBRepository<IUser> {
    constructor(public readonly model: Model<IUser>= userModel) {
        super(model);
    }
}