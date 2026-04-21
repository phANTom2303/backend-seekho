import 'dotenv/config'
import pg from 'pg'
const { Pool } = pg
const dbuser = process.env.PGUSER
const dbpass = process.env.PGPASSWORD
const dbhost = process.env.PGHOST
const dbport = process.env.PGPORT
const dbdatabase = process.env.PGDATABASE

//Uncomment for debugging
// console.log(dbuser)
// console.log(dbpass)
// console.log(dbhost)
// console.log(dbport)
// console.log(dbdatabase)

const pool = new Pool({
    user: dbuser,
    password: dbpass,
    host: dbhost,
    port: dbport,
    database: dbdatabase,
})

function getPool() {
    return pool
}

async function terminatePool() {
    await pool.end()
    console.log("Pool terminated")
}


export {
    getPool,
    terminatePool
}