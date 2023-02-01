import fastify from "fastify";
import mercurius from "mercurius";
import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import fastifyCors from "@fastify/cors";
import process from "node:process";

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

interface QueryRequest {
  operationName?: string;
  query: string;
  variables?: object;
}

function assertIsQueryRequest(body: unknown): asserts body is QueryRequest {
  if (
    Object.prototype.hasOwnProperty.call(body, "query") &&
    typeof (body as QueryRequest).query === "string"
  ) {
    return;
  }
  throw new Error();
}

async function main() {
  const schema = await loadSchema("./schema.graphql", {
    loaders: [new GraphQLFileLoader()],
  });

  const app = fastify({ logger: true });
  app
    .register(mercurius, {
      schema,
      resolvers,
    })
    .register(fastifyCors, { origin: "*" });

  app.post("/", async function (req, res) {
    try {
      assertIsQueryRequest(req.body);
      const response = await res.graphql(req.body.query);
      res.code(200).send(response);
    } catch {
      res.code(500).send("Internal Server Error");
    }
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
