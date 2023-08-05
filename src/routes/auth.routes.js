import { Router } from "express"
import validateSchema from "../middlewares/validateSchema.js"
import { signinSchema, signupSchema } from "../schemas/auth.schemas.js"
import { signin, signup } from "../controllers/auth.crontrollers.js"

const authRouter = Router()

authRouter.post("/signup", validateSchema(signupSchema), signup)
authRouter.post("/signin", validateSchema(signinSchema), signin)

export default authRouter