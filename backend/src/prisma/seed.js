import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

async function main() {

    
    
        const genres = [
            { name: "Action" },
            { name: "Adventure" },
            { name: "Shooter" },
            { name: "Fighting" },
            { name: "Horror" },
            { name: "Puzzle" },
            { name: "Platformer" },
            { name: "Racing" },
            { name: "Simulation" },
            { name: "Strategy" },
            { name: "Sports" },
            { name: "MMORPG" },
            { name: "Survival" },
            { name: "Stealth" },
            { name: "Rhythm" },
            { name: "Open World" },
            { name: "Metroidvania" },
            { name: "Roguelike" },
            { name: "Visual Novel" },
            { name: "Hack and Slash" },
            { name: "Tower Defense" }
        ];
    
        for (const genre of genres) {
            const genreName=await prisma.genre.create({
                data: {name:genre.name}
            });
            console.log(genreName)
        }
    
    
    
    

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

