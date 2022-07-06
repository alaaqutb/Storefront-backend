import client  from "../database";

export type user ={
    id:number;
    first_name:string;
    last_name:string;
    password:string;
}

export class my_user{
    async index(): Promise<user[]> {
        try {
          const conn = await client.connect()
          const sql = 'SELECT * FROM '
    
          const result = await conn.query(sql)
    
          conn.release()
    
          return result.rows 
        } catch (err) {
          throw new Error(`Could not get books. Error: ${err}`)
        }
      }
}