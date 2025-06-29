import db from '@/app/lib/db';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';


export async function POST(req){

    const {newScore} = await req.json();
    const userCookie = await cookies();
    const id = userCookie.get('token').value;
    const q = 'UPDATE users SET simonScore = ? WHERE id = ?';
    await db.query(q, [newScore, id]);
    
}
