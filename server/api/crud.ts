import type { IncomingMessage, ServerResponse } from 'http'
import sqlite3 from "sqlite3"
import { open } from "sqlite"

export default async (request: IncomingMessage, response: ServerResponse) => {
  sqlite3.verbose()
  const db = await open({
    filename: '/app/database.db',
    driver: sqlite3.Database
  })
  await db.run("CREATE TABLE IF NOT EXISTS test(id, name, date)")

  if (request.method == 'POST') {
    const row = await db.get("SELECT COUNT(*) + 1 id FROM test")
    await db.run("INSERT INTO test VALUES(?, 'abc', '2021/12/07')", row.id)
  }
  return await db.all("SELECT * FROM test")
}

/*
each
row
rows
column
columns
create

type Test = {id:number,name:string,date:Date}
db.create(Test)
db.insert(Test, {id: 1, name: 'abc', date: new Date()})
db.update(Test, {name: 'ABC', date: new Date()}, "id = 1")
db.each<Test>('SELECT * FROM test')
*/