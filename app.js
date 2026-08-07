import express from 'express'
import { getPool } from './utils/db.js'
import asyncHandler from '#urils/async-handler.js'
import { AppError } from '#urils/errors.js'
const app = express()
const PORT = 8000
const dbpool = getPool()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/getHabits', async (req, res) => {
    const result = await dbpool.query('SELECT * FROM habits')
    return res.send(result.rows)
});

app.post('/createHabit', asyncHandler(async (req, res) => {

    const habitName = req.body.habitName;

    const query = 'INSERT INTO habits (habit_name) VALUES ($1)';

    await dbpool.query(query, [habitName]);

    res.json({ message: 'Habit created Successfully' });
}));

app.delete('/removeHabit', asyncHandler(async (req, res) => {
    const habitName = req.body.habitName;

    const query = 'DELETE FROM habits WHERE habit_name=$1';

    const deleteOutput = await dbpool.query(query, [habitName]);

    if (deleteOutput.rowCount == 0) {
        throw new AppError("Habit Doesn't Exist", 404);
    }

    res.json({ message: 'Deletion Successful' });
}));


app.patch('/renameHabit', asyncHandler(async (req, res) => {
    const currentHabitName = req.body.currentHabitName;
    const newHabitName = req.body.newHabitName;

    const query = 'UPDATE habits SET habit_name=$1 WHERE habit_name=$2';

    const updateOutput = await dbpool.query(query, [newHabitName, currentHabitName]);

    if (updateOutput.rowCount == 0) {
        throw new AppError("Habit Doesn't Exist", 404);
    }

    res.json({ message: "Habit renamed successfully" });
}));


app.use((err, req, res, next) => {

    let httpStatusCode = err.statusCode || err.status || 500;
    let message = err.message || "Internal Server Error";

    if (err.code === '23505') {
        httpStatusCode = 400;
        message = 'Duplicate error';
    }

    res.status(httpStatusCode).json({
        message: "Something went wrong!",
        error: message
    });
});

app.listen(PORT, () => {
    console.log(`Backend-seekho running on port : ${PORT}`)
})