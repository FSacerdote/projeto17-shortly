import { Router } from "express"
import validateSchema from "../middlewares/validateSchema.js"
import { urlSchema } from "../schemas/urls.schemas.js"
import { shorten } from "../controllers/urls.controllers.js"

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), shorten)
urlsRouter.get("/urls/:id")
urlsRouter.get("/urls/open/:shortUrl")
urlsRouter.delete("/urls/:id")


export default urlsRouter