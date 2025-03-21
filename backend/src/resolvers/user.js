import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from './prismaClient/prisma.js';
import { APP_SECRET,getUserId } from "../utils.js";
const User={
    async  signup(parent,args,context,info) {
            
            const password=await bcrypt.hash(args.password,10)
            console.log(args)
            const user = await context.prisma.user.create({ data: { ...args, password } })
            const token=jwt.sign({userId:user.id},APP_SECRET)
            return {token,user}
        
    },
    async login (parent,args,context,info)
    {
        const user = await context.prisma.user.findUnique({ where: { email: args.email } })
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