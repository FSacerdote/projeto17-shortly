import { db } from "../database/database.connection.js"
import { nanoid } from "nanoid"

export async function shorten(req, res){
    const {url} = req.body
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")
    
    if (!token) return res.sendStatus(401)
    try {
        const validation =  await db.query(`SELECT * FROM sessions WHERE token=$1;`, [token])
        if (!validation.rowCount) return res.sendStatus(401)
        const user = validation.rows[0].userid
        const shortUrl =  nanoid()
        await db.query(`INSERT INTO urls (shorturl, url, userid) VALUES ($1,$2,$3);`, [shortUrl, url, user])
        const response = await db.query(`SELECT * FROM urls WHERE shorturl=$1;`, [shortUrl])
        res.status(201).send({id: response.rows[0].id,shortUrl})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getUrlById(req, res){
    const {id} = req.params
    try {
        const url = await db.query(`SELECT id, shorturl, url FROM urls WHERE id=$1;`, [id])
        if(!url.rowCount) return res.sendStatus(404)
        res.send(url.rows[0])
    } catch (error) {
        res.status(500).send(req, res)
    }
}

export async function openUrl(req, res){
    const {shortUrl} = req.params
    try {
        const response = await db.query(`SELECT * FROM urls WHERE shorturl=$1;`, [shortUrl])
        if(!response.rowCount) return res.sendStatus(404)
        await db.query(`UPDATE urls SET visitCount=$1 WHERE shorturl=$2;`, [response.rows[0].visitcount + 1, shortUrl])
        const url = response.rows[0].url
        res.redirect(200, url)
    } catch (error) {
        res.status(500).send(req, res)
    }
}

export async function deleteUrl(req, res){
    const {id} = req.params
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")
    
    if (!token) return res.sendStatus(401)
    try {
        const validation =  await db.query(`SELECT * FROM sessions WHERE token=$1;`, [token])
        if (!validation.rowCount) return res.sendStatus(401)
        const user = validation.rows[0].userid
        const url = await db.query(`SELECT * FROM urls WHERE id=$1;`, [id])
        if(!url.rowCount) return res.sendStatus(404)
        if(url.rows[0].userid !== user) return res.sendStatus(401)
        await db.query(`DELETE FROM urls WHERE id=$1;`, [id])
        res.sendStatus(204)
    } catch (error) {
        res.status(500).send(error.message)
    }
}