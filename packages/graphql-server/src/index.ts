import fastify from "fastify";
import mercurius from "mercurius";
import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import process from "process";

async function main() {
  const schema = await loadSchema("./schema.graphql", {
    loaders: [new GraphQLFileLoader()],
  });

  const app = fastify({ logger: true });
  app.register(mercurius, {
    schema,
    resolvers: {
      Query: {
        allTodos: (_, params, { reply }) => {
          return [];
        },
        todoById: (_, params, { reply }) => {
          return null;
        },
      },
      Mutation: {
        deleteTodo: () => null,
        modifyTodo: (_, params, { reply }) => {
          return { ...params.input };
        },
        createTodo: (_, params, { reply }) => {
          return { ...params.input, id: "new_todo" };
        },
      },
    },
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
