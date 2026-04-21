import { getPool, terminatePool } from "./db.js";

const dbPool = getPool();

console.log(await dbPool.query('delete from data where number=$1', [3]))

await terminatePool();