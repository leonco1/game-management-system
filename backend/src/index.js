import { ApolloServer } from '@apollo/server';
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

import {
  startServerAndCreateLambdaHandler,
  handlers,
} from '@as-integrations/aws-lambda';
import { ExecutableDefinitionsRule } from 'graphql';



const resolvers={
    Query:{
        getAllDevelopers:developerCrud.getAllDevelopers,
        getDeveloperById:(parent,args,context,info)=>{
          return developerCrud.getDeveloperById(args.id)
        },
        getAllGames:gameCrud.getAllGames,
        getGameById:(parent,args,context,info)=>{
          return gameCrud.getGameById(args.id)
        }
        
     
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
        userId: req?.headers?.authorization ? getUserId(req) : null

      }
    }
})
export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  // We will be using the Proxy V2 handler
  handlers.createAPIGatewayProxyEventV2RequestHandler()
  , {
    listen: { port: 4000 },}

);
