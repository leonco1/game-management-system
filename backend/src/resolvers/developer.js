import prisma from "./prismaClient/prisma.js";
import User from "./user.js";

const developerCrud = {
    async getAllDevelopers() {
        return await prisma.developer.findMany({include:{
          games:{
            include:{
              genres:true
            }
          }
        }})
    },

    async getDeveloperById(id) {
        id=Number.parseInt(id)
        return await prisma.developer.findUnique({
            where: { id },
           include:{
            games:{
                include:{
                    genres:true
                }
            }
           }
        });
    },
    

    async createDeveloper(parent,args,context,info)
    {
    const name=args.name
    const surname=args.surname
    const gameTitle=args.gameTitle
    const gameGenre=args.gameGenre
    const email=args.email
    const imageURL=args.imageURL
    const description=args.description
    const user=await prisma.user.findUnique({where:{email}, select:{email:true}})
    
    if(!user)
    {
      throw new Error("User with this email does not exist.");
    }
    
    // let genre = await prisma.genre.findFirst({

    const createdDeveloper = await prisma.developer.create({
        data: {
          name,
          surname,
          user:{
            connect:{
              email
            }
          },
          games: {
            connectOrCreate: {
              where: {
                title: gameTitle, 
              },
              create: {
                title: gameTitle, 
                imageURL,
                genres: {
                  connectOrCreate: {
                    where: {
                      name: gameGenre, 
                    },
                    create: {
                      name: gameGenre, 
                    },
                  },
                },
              },
            },
          },
          
        },

        include: {
          games: {
            include: {
              genres: true, 
            },
          },
        },
      });
      
      return createdDeveloper;
      
    },


    async updateDeveloper(parent,args,context,info) {
    const developerId = Number.parseInt(args.id);
    const developer= await this.getDeveloperById(developerId)
    
    const name = args.name!=null? args.name:developer.name
    const surname = args.surname!=null?args.surname:developer.surname
    const gameTitles=args.gameTitles


    const games = gameTitles != null ? await prisma.game.findMany({
        where: {
          title: {
            in: gameTitles
          }
        }
      }) 
    : developer.games;
  
      
    
    
    const updatedDeveloper=  await prisma.developer.update({where:{
            id:developerId
        },data:{
            name,
            surname,
           games:{
            set:games.map(game=>({id:game.id}))
           }
        },include:{games:true}})
    return updatedDeveloper
    },
    
    async deleteDeveloper(parent,args,context,info) {
        const developerId=Number.parseInt(args.id)
       const deletedDeveloper=await prisma.developer.delete({where:{id:developerId}})
       return deletedDeveloper
    }
};

export default developerCrud;
