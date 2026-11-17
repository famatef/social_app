import {Router} from 'express';
import AS from './auth.service';
import { validation } from '../../common/middleware/validation';
import { signUpSchema } from './auth.validation';
const authRouter = Router();
authRouter.post("/signup",validation(signUpSchema),AS.signUp);
authRouter.get("/test",AS.test)
export default authRouter;
