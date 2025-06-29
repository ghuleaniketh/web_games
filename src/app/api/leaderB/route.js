import db from '@/app/lib/db'

export async function GET(){
    const q = 'SELECT * FROM users ORDER BY simonScore DESC ';
    const [data] = await db.query(q);
    return Response.json(data, { status: 200 }); 
}