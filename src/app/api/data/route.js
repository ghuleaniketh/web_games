import db from '@/app/lib/db';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req){
    
    const cookieStore = await cookies();
    const token = cookieStore.get('token').value;
    const q = 'SELECT * FROM users WHERE id = ?'
    let data = await db.query(q,[token]);
    return new NextResponse(JSON.stringify(data[0]),{status:200});
}