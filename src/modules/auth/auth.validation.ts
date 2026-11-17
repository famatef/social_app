import * as z from 'zod';
import { GenderEnum } from "../../common/enum/user.enum";

export const signUpSchema = {
    body: z.strictObject({
        fName: z.string().min(2).max(20).trim(),
        lName: z.string().min(2).max(20).trim(),
        email: z.string().email(),
        password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        cpassword: z.string(),
        gender: z.enum(GenderEnum).optional(),
        phone: z.string()
}).superRefine((val, ctx) => {
    if(val.password!==val.cpassword){
        ctx.addIssue({
            code:"custom",
            message:"Password and Confirm Password do not match",
            origin:["cpassword"]
        });
    }
})
}
