import db from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req){

    try{
        const {username,password} = await req.json();
        const q = `SELECT * FROM users WHERE username = ?`
        let data = await db.query(q,[username]);
        return new NextResponse(JSON.stringify(data[0]), { status: 200 });
        }catch (err){
            return new NextResponse(JSON.stringify({error:"User not found!! Plz Enter valid username."}),{status:500});
    }
    
}