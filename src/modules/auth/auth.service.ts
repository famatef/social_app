import { Request, Response, NextFunction } from "express";
import { IUser } from "../../DB/models/user.model";
import userModel from "../../DB/models/user.model";
import { AppError } from "../../common/utils/globalErrorHandling";
import { HydratedDocument } from "mongoose";
import { DBRepository } from "../../DB/repositories/db.repository";
import { UserRepository } from "../../DB/repositories/user.repositories";
import { GenderEnum } from "../../common/enum/user.enum";

class AuthService {
    private readonly _userRepo = new UserRepository();
    constructor() {
        
    }
    signUp = async (req: Request, res: Response, next: NextFunction) => {
        const {fName,lName,email,password,phone,gender}:IUser = req.body;
        const emailExists = await this._userRepo.findOne({ filter: { email }, options: {} });
        if (emailExists) throw new AppError("Email already exists", 400);
        const user =await this._userRepo.create({ fName, lName, email, password, phone, gender }as Partial<IUser>);
        res.status(200).json({ message: "User signed up successfully", user });

    }
    test = async (req: Request, res: Response, next: NextFunction) => {
        let user = await userModel.insertMany([{ fName: "fam",
               lName: "atef", email: `fam-${Date.now()}@gmail.com`, password: "1234567@", phone: "1234567890", gender: GenderEnum.Male, age: 23, isDeleted: true, role: "user" as IUser["role"], isConfirmed: false }])
            
        res.status(200).json({ user });

    }

        

}
export  default new AuthService();