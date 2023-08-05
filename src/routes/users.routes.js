import { Router } from "express"
import { getRanking, getUser } from "../controllers/users.controllers.js"

const usersRouter = Router()

usersRouter.get("/users/me", getUser)
usersRouter.get("/ranking", getRanking)

export default usersRouter