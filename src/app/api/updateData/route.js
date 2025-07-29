import db from '@/app/lib/db';
import { cookies } from 'next/headers';


export async function POST(req){

    const {newScore} = await req.json();
    console.log(newScore);
    const userCookie = await cookies();
    const id = userCookie.get('token').value;
    console.log(id);
    const q = 'UPDATE users SET simon_score = ? WHERE id = ?';
    await db.query(q, [newScore, id]);
    
}
