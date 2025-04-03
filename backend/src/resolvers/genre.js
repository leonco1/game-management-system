
import prisma from "./prismaClient/prisma.js";


const genreCrud={
    async  getAllGenres()
    {
        return await prisma.genre.findMany()
    },
    async createGenre(parent,args,context,info)
    {
        const name=args.name
        const newGenre=prisma.genre.create({data:{
            name
        }})
        return newGenre
    }
}
export default genreCrud