import fs from 'fs';
import path from 'path'
import jwt from 'jsonwebtoken'
import { hash } from 'bcrypt'
import { pool } from './db.js'

const __dirname = import.meta.dirname
const { sign } = jwt

const initializieTestDb = () => {
    const sql = fs.readFileSync(path.resolve(__dirname, "../initialdata.sql"), "utf8");
    pool.query(sql)
}

const insertTestUser = (email, password) => {
    hash(password, 10, (error, hashedPassword) => {
        pool.query('insert into account (email,password) values ($1,$2)',
            [email, hashedPassword]
        )
    })
}

const getToken = (email) => {
    return sign({user: email}, process.env.JWT_SECRET_KEY)
}
export { initializieTestDb, insertTestUser, getToken }