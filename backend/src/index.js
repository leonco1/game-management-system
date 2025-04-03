import { ApolloServer } from 'apollo-server';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import prisma from './resolvers/prismaClient/prisma.js'
import { getUserId } from './utils.js';
import developerCrud from './resolvers/developer.js';
import User from './resolvers/user.js';
import gameCrud from './resolvers/game.js';
import genreCrud from './resolvers/genre.js'


const resolvers={
    Query:{
        getAllDevelopers:developerCrud.getAllDevelopers,
        getDeveloperById:(parent,args,context,info)=>{
          return developerCrud.getDeveloperById(args.id)
        },
        getAllGames:gameCrud.getAllGames,
        getGameById:(parent,args,context,info)=>{
          return gameCrud.getGameById(args.id)
        },
        getAllGenres:genreCrud.getAllGenres
        
        
        // genres:()=>genres,
        // games:()=>games
    },
    Mutation:{
      createDeveloper: (parent, args, context, info) => 
        developerCrud.createDeveloper(parent, args, context, info),
      updateDeveloper: (parent, args, context, info) => 
        developerCrud.updateDeveloper(parent, args, context, info),
      deleteDeveloper: (parent, args, context, info) => 
        developerCrud.deleteDeveloper(parent, args, context, info),
       createGame:(parent,args,context,info)=>gameCrud.createGame(parent,args,context,info),
       updateGame:(parent,args,context,info)=>gameCrud.updateGame(parent,args,context,info),
       deleteGame:(parent,args,context,info)=>gameCrud.deleteGame(args.id),
       createGenre:(parent,args,context,info)=>genreCrud.createGenre(parent,args,context,info),
      signup:(parent,args,context,info)=>User.signup(parent,args,context,info),
      login:(parent,args,context,info)=>User.login(parent,args,context,info),
        },
        

  }


const server=new ApolloServer({
  cors:true,
    typeDefs:fs.readFileSync(path.join(__dirname,'schema.graphql'),'utf8'),
    resolvers,
    context:({req})=>{
      return {
        ...req,
        prisma,
        userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
      }
    }
})

server.listen().then(({url})=>console.log(`Server is running on ${url}`))