import { Router } from "express"
import validateSchema from "../middlewares/validateSchema.js"
import { urlSchema } from "../schemas/urls.schemas.js"
import { deleteUrl, getUrlById, openUrl, shorten } from "../controllers/urls.controllers.js"

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), shorten)
urlsRouter.get("/urls/:id", getUrlById)
urlsRouter.get("/urls/open/:shortUrl", openUrl)
urlsRouter.delete("/urls/:id", deleteUrl)


export default urlsRouter