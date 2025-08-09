import db from '@/app/lib/db'

export async function GET(){
    const q = 'SELECT * FROM users ORDER BY simon_score DESC ';
    const data = await db.query(q);
    return Response.json(data[0], { status: 200 }); 
}