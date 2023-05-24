import  bcrypt  from 'bcrypt';
import prisma from "@/app/libs/prismadb"
import { NextResponse } from 'next/server';

// create a user
export async function POST(request:Request) {
    const body = await request.json();
    
    const {email, name, password} = body;
    const hashedPassword = await bcrypt.hash(password, 12);
    let user;
    try {
        user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        });     
    } catch (error) {
        // throw new Error();
        // console.log(error)
        return NextResponse.json("something error happened!");
    }
    return NextResponse.json(user);

}   