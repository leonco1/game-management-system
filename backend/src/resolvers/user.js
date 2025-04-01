import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from './prismaClient/prisma.js';
import { APP_SECRET,getUserId } from "../utils.js";
import { error } from 'console';
const User={
    async signup(parent, args, context, info) {
        if (!args.email || !args.password || !args.name) {
            throw new Error("Missing required fields: email, password, or name");
        }
   
        try {
            const password = await bcrypt.hash(args.password, 10);
            const user = await prisma.user.create({
                data: {
                    email: args.email,
                    name: args.name,
                    password
                }
            });
   
            const token = jwt.sign({ userId: user.id }, APP_SECRET);
            return { token, user }; // Returning both token and user object
   
        } catch (error) {
            console.error("Error creating user:", error); // Log the error for debugging
            throw new Error("Error creating user"); // Return a user-friendly message
        }
    },   
    async login (parent,args,context,info)
    {
        const user = await prisma.user.findUnique({ where: { email: args.email } })
        if(!user)
        {
            throw new Error('No such user found')
        }
        const valid=await bcrypt.compare(args.password,user.password)
        if(!valid)
        {
            throw new Error("Invalid Password")
        }
        const token=jwt.sign({userId:user.id},APP_SECRET)

        return {
            token,
            user
        }
    }
};
export default User