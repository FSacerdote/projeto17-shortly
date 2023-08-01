export default function validateSchema (schema) {
    return (req,res,next)=>{
        const schemaValidation = schema.validate(req.body, {abortEarly: false})
        if(schemaValidation.error){
            const errors = schemaValidation.error.details.map((detail)=> detail.message)
            res.status(422).send(errors)
        }
        next()
    }
}