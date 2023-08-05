import { db } from "../database/database.connection.js"
import { nanoid } from "nanoid"

export async function shorten(req, res){
    const {url} = req.body
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")
    
    if (!token) return res.sendStatus(401)
    try {
        const validation =  await db.query(`SELECT * FROM sessions WHERE token=$1`, [token])
        if (!validation.rowCount) return res.sendStatus(401)
        const user = validation.rows[0].userid
        const shortUrl =  nanoid()
        await db.query(`INSERT INTO urls (shorturl, url, userid) VALUES ($1,$2,$3)`, [shortUrl, url, user])
        const response = await db.query(`SELECT * FROM urls WHERE shorturl=$1`, [shortUrl])
        res.status(201).send({id: response.rows[0].id,shortUrl})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getUrlById(req, res){

}

export async function openUrl(req, res){

}

export async function deleteUrl(req, res){

}