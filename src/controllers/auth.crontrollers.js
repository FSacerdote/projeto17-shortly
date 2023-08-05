import { db } from "../database/database.connection.js"
import bcrypt, { compareSync } from "bcrypt"
import {v4 as uuid} from "uuid"

export async function signup (req, res){
    const {name, email, password, confirmPassword} = req.body
    try {
        if(password !== confirmPassword) return res.sendStatus(422)
        const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
        if(user.rowCount) return res.sendStatus(409)
        await db.query(`INSERT INTO users (name, email, password) VALUES ($1,$2,$3);`, [name, email, bcrypt.hashSync(password,10)])
        res.sendStatus(201)
    } catch (error) {
       res.status(500).send(error.message) 
    }
}

export async function signin (req, res){
    const {email, password} = req.body
    try {
        const response = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
        if(!response.rowCount) return res.sendStatus(401)
        const user = response.rows[0]
        const passwordValidation = compareSync(password, user.password)
        if(!passwordValidation) return res.sendStatus(401)
        const token = uuid()
        await db.query(`INSERT INTO sessions (token, userid) VALUES ($1, $2)`, [token, user.id])
        res.send({token})
    } catch (error) {
        res.status(500).send(error.message)
    }
}