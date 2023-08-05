import { Router } from "express"
import { getUser } from "../controllers/users.controllers.js"

const usersRouter = Router()

usersRouter.get("/users/me", getUser)
usersRouter.get("/ranking")

export default usersRouter