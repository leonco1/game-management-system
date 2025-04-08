import prisma from "./prismaClient/prisma.js";
async function getDeveloperIds(developerEmails)
{
    const developers=await prisma.developer.findMany(
        {where:{
            userEmail:{
                in:developerEmails
            }
        }}
    )
    if(!developers || developers.length===0)
        {
            throw Error("No developers found")
        }

     const developerIds = developers.map(developer => ({ id: developer.id }));

     return developerIds

}


const gameCrud=
{
    async getAllGames(parent,args)
    {
        const {cursor,limit}=args
        const queryOptions={
            include:{genres:true},
            orderBy:{id:'asc'},
            take:limit,
        };
        if(cursor)
        {
            queryOptions.skip=1
            queryOptions.cursor={id:Number(cursor)}
            console.log("Cursor:", cursor, );

        }

        const games= await prisma.game.findMany(queryOptions)
        return games
    },

    async getGameById(id)
    {
        id=Number.parseInt(id)
        return  await prisma.game.findUnique({where:{id},include:{developers:true,genres:true}})
    },
    async createGame(parent,args,context,info)
    {
        const title=args.title
        const genreName=args.genreName
        const developerIds=await getDeveloperIds(args.developers)
        const imageURL= args.imageURL
        const description=args.description 
        const newGame= await prisma.game.create({data:{
            title,
            imageURL,
            description,
            developers:{
            set: developerIds
            },
            genres:{
                connect:{
                    name: genreName, 

                }
            }
        }, include:{developers:true,genres:true }})
        return newGame

    },
    async updateGame(parent,args,context,info)
    {
        const id=Number.parseInt(args.id)
        const developerIds=await getDeveloperIds(args.developers)
        const imageURL= args.imageURL
        const description=args.description
        const updatedGame=await prisma.game.update(
            {where:{id},
            data:
            {
                imageURL,
                description,
                developers:{
                    set:developerIds
                }
            },include:{
                developers:{
                    include:{
                        user:{
                            select:{
                                email:true
                            }
                        }
                    }
                },
                genres:true
            }})
        return updatedGame
    },

    async deleteGame(id)
    {
        const gameId=Number.parseInt(id)

        const deletedGame= await prisma.game.delete({where:{
            id:gameId
        }})
         return deletedGame
    }

}
export default gameCrud