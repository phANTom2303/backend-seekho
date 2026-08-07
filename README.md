# Habit Tracker Full Stack To revise Backend


| Day | Task |
|---|---|
| 1 | Express server from scratch. In-memory array of habits `{id, name, createdAt}`. `GET /habits`, `POST /habits`, `DELETE /habits/:id`. Test with curl/Postman. |
| 2 | Add PostgreSQL. Tables: `habits(id, name, created_at)` and `habit_logs(id, habit_id, date)`. Rewrite the 3 endpoints with raw SQL. Add `POST /habits/:id/log` to mark a habit done today. |
| 3 | Validate habit name (non-empty, max length) manually, then with Zod. Add error-handling middleware (400 vs 404 vs 500). Add request logging middleware. |
| 4 | Add JWT auth from scratch: `users` table, register, login, bcrypt password hashing. Protect habit routes — a user only sees/edits their own habits. |
| 5 | Rate-limit login (brute-force protection). Configure CORS for your future frontend origin. Refactor into `routes/`, `controllers/`, `middleware/`, `models/`. |
| 6 | React (Vite) frontend. Login/Register pages. Auth state in Context, JWT stored and attached to requests. |
| 7 | Dashboard: list habits, checkbox to log "done today," form to add a new habit, proper loading/error states. |
| 8 | Background job: `node-cron` runs nightly, recalculates a "current streak" per habit (checks `habit_logs` for gaps) and writes it to a `streaks` table. |
| 9 | Web scraping: `cheerio` + `axios` scrape a public "quote of the day" page each morning, store it in a `daily_quotes` table. |
| 10 | Integration: nightly cron recalculates streaks, morning scraper fetches the quote, authenticated API serves habits + streaks + quote, React dashboard displays all three. Deploy backend to Railway/Render, frontend to Vercel. |

# Progress : 

SQL based CRUD endpoints for habits.
Add a user table and modify existing tables to have user ids as foreign keys as well.
Then embark on actual habit log CRUD endpoints.

 # Schema as of Now : 

```SQL
CREATE TABLE HABITS (
	habit_id SERIAL PRIMARY KEY,
	habit_name TEXT UNIQUE NOT NULL , 
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```


```SQL
CREATE TABLE habit_logs (
	habit_id INTEGER NOT NULL,
	completion_date DATE NOT NULL,
	
	-- foreign key syntax 
	CONSTRAINT habit_id
	FOREIGN KEY (habit_id)
	REFERENCES habits(habit_id)
);
```

