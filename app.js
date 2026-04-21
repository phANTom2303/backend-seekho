import express from 'express'
import { getPool } from './db.js'

const app = express()
const PORT = 8000
const dbpool = getPool()

console.log((await dbpool.query('SELECT NOW()')).rows)

let arr = [1, 2, 3, 4]


function validateNumberMiddleWare(req, res, next) {
    const { value } = req.query;

    if (value === undefined || value.length == 0) {
        return res.status(400).send(`Invalid Query Parameter`);
    }

    const numericValue = Number(value);

    console.log(`attempting to push ${numericValue}`);

    if (Number.isNaN(numericValue)) {
        return res.status(400).send(`Invalid Input, Valid Decimal Numbers only`);
    }

    req.numericValue = numericValue
    next()
}

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/arr', async (req, res) => {
    const result = await dbpool.query('SELECT * FROM DATA')
    return res.send(result.rows)
})


app.post('/arr', validateNumberMiddleWare, async (req, res) => {

    const numericValue = req.numericValue

    const query = 'INSERT INTO DATA (number) VALUES ($1)'

    await dbpool.query(query, [numericValue])

    res.send(`Value : ${numericValue} pushed`);
})

app.delete('/arr', validateNumberMiddleWare, async (req, res) => {
    const numericValue = req.numericValue

    const query = 'DELETE FROM DATA WHERE number=$1'
    const result = await dbpool.query(query, [numericValue])

    if (result.rowCount == 0)
        return res.send(`Value ${numericValue} doesn't exist`)
    else
        return res.send(`Value ${numericValue} deleted`);
})


app.listen(PORT, () => {
    console.log(`Backend-seekho running on port : ${PORT}`)
})