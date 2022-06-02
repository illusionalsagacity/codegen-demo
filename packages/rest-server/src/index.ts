import fastify from "fastify";
import sensible from "@fastify/sensible";
import process from "process";
import openapiGlue from "fastify-openapi-glue";
import path from "path";
import type { FastifyReply, FastifyRequest } from "fastify";

const unimplementedHandler = (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  reply.notImplemented();
};

const app = fastify({ logger: true });
app.register(sensible).register(openapiGlue, {
  specification: path.resolve(process.cwd(), "schema.yaml"),
  noAdditional: true,
  service: {
    deleteTodo: unimplementedHandler,
    putTodo: unimplementedHandler,
    getTodo: unimplementedHandler,
    postTodo: unimplementedHandler,
    getTodos: unimplementedHandler,
  },
});

const start = async () => {
  try {
    await app.listen(3000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
