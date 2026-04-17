import express from 'express'

const app = express()
const PORT =8000
let arr = [1, 2, 3 , 4]
app.get('/', (req, res) =>{
    res.send('Hello World');
})

app.get('/arr', (req, res) => {
    res.send(arr)
})


app.post('/arr', (req, res) => {
    const { value } = req.query;

    if(value === undefined || value.length == 0){
        return res.status(400).send(`Invalid Query Parameter`);
    }

    const numericValue = Number(value);

    console.log(`attempting to push ${numericValue}`);

    if(Number.isNaN(numericValue)){
        return res.status(400).send(`Invalid Input, Valid Decimal Numbers only`);
    }
    
    arr.push(numericValue);
    res.send(`Value : ${value} pushed`);
})

app.delete('/arr', (req, res) => {

    if(arr.length == 0){
        return res.send(`Array is Empty`);
    }
    
    const val = arr.pop();
    return res.send(`Value ${val} deleted`);
})


app.listen(PORT, () => {
    console.log(`Backend-seekho running on port : ${PORT}`)
})