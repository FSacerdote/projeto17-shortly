import { db } from "../database/database.connection.js"

export async function signup (req, res){
    const {name, email, password, confirmPassword} = req.body
    try {
        if(password !== confirmPassword) return res.sendStatus(422)
        const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
        if(user.rowCount) return res.sendStatus(409)
        db.query(`INSERT INTO users (name, email, password) VALUES ($1,$2,$3);`, [name, email, password])
        res.send(201)
    } catch (error) {
       res.status(500).send(error.message) 
    }
}

export async function signin (req, res){
    
}