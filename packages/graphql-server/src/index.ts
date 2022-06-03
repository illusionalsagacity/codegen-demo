import fastify from "fastify";
import mercurius from "mercurius";
import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import process from "process";

import type { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    allTodos: (_, args, ctx) => {
      return [];
    },
    todoById: (_, args, ctx) => {
      return null;
    },
  },
  Mutation: {
    deleteTodo: () => null,
    modifyTodo: (_, args, ctx) => {
      const title = args.input.title ?? "SAMPLE TODO";
      return { ...args.input, title };
    },
    createTodo: (_, args, ctx) => {
      return { ...args.input, id: "new_todo" };
    },
  },
};

async function main() {
  const schema = await loadSchema("./schema.graphql", {
    loaders: [new GraphQLFileLoader()],
  });

  const app = fastify({ logger: true });
  app.register(mercurius, {
    schema,
    resolvers,
  });

  try {
    await app.ready();
    await app.listen(3000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
