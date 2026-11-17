import mongoose from "mongoose";
import { GenderEnum, RoleEnum } from "../../common/enum/user.enum";
import { hashSync } from "bcrypt";
import { boolean } from "zod";

 export interface IUser {
    fName: string;
    lName: string;
    email: string;
    password: string;
    age: number;
    phone?: string;
    gender:string;
    role: string;
    isConfirmed: boolean;
    profileImage?: string;
    isDeleted:boolean
}
const userSchema = new mongoose.Schema<IUser>(
    {
        fName: { type: String, required: true, trim: true ,minlength: 2, maxlength: 50},
        lName: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
        age: { type: Number,min: 18, max: 100},
        phone: { type: String },
        gender: { type: String, enum: [GenderEnum.Male, GenderEnum.Female], default: GenderEnum.Male },
        role: { type: String, enum: [RoleEnum.Admin, RoleEnum.User], default: RoleEnum.User },
        isConfirmed: { type: Boolean, default: false },
        profileImage: { type: String },
        isDeleted:Boolean,

    },
    {
        timestamps: true,
        strictQuery: true
    }
);
userSchema.pre("insertMany", async function (docs) {
    console.log("pre insertMany");
    console.log(this);
    console.log(docs);
    for (const doc of docs) {
        doc.password = hashSync(doc.password,12);
    }
})



const userModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default userModel;