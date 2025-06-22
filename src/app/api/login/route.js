import db from '@/app/lib/db';

export async function POST(req){

    try{
        const {username,password} = await req.json();
        console.log(username);
    const q = `SELECT * FROM users WHERE username = ?`
    let data = await db.query(q,[username]);
    console.log(data[0]);
    return new Response(JSON.stringify(data[0]), { status: 200 });
    }catch (err){
        return new Response(JSON.stringify({error:"User not found!! Plz Enter valid username."}),{status:500});
    }
    
}