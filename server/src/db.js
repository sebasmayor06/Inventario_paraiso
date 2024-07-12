import pg from 'pg'
import dotenv from 'dotenv';

dotenv.config();

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
    DB_PORT
} = process.env

export const pool= new pg.Pool({

    user: DB_USER,
    host:DB_HOST,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT

})
