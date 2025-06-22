import db from '@/app/lib/db';
import { cookies } from 'next/headers';


export async function POST(req){

    const {newScore} = await req.json();
    const userCookie = await cookies();
    const id = userCookie.get('token').value;
    console.log("i got something");
    console.log(newScore);
    console.log(id);
    const q = 'UPDATE users SET simonScore = ? WHERE id = ?';
    await db.query(q, [newScore, id]);
    
}
