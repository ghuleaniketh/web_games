import db from '@/app/lib/db';
import { v4 as uuidv4 } from 'uuid';


export async function POST(req) {
    try {
        const { username, password } = await req.json();
        const id = uuidv4();
        console.log(username);
        console.log(password);
        console.log(id);

        const q = 'INSERT INTO users (id, username, password) VALUES (?, ?, ?)';
        await db.execute(q, [id, username, password]);

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error('Register Error:', err);
        return new Response(JSON.stringify({ error: 'Registration failed' }), { status: 500 });
    }
}
