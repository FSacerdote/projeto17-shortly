import { db } from "../database/database.connection.js"

export async function getUser(req, res){
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")
    if(!token) return res.sendStatus(401)
    try {
        const userResponse = await db.query(`SELECT * FROM sessions WHERE token=$1;`, [token])
        if(!userResponse.rowCount) return res.sendStatus(401)
        const userId = userResponse.rows[0].userid
        const user = await db.query(`
            SELECT users.id, users.name, COALESCE(CAST(SUM(urls.visitcount) AS INTEGER), 0) AS "visitCount" FROM users 
            LEFT JOIN urls ON users.id = urls.userid  
            WHERE users.id=$1 GROUP BY users.id;
            `, [userId])
        const urls = await db.query(`SELECT id, shorturl, url, visitcount FROM urls WHERE urls.userid=$1`, [userId])
        res.send({...user.rows[0], shortenedUrls: urls.rows})
    } catch (error) {
     res.status(500).send(error.message)
    }
}

export async function getRanking(req, res){
    
}