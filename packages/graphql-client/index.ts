import { getSdk } from "./types";
import { request } from "graphql-request";
import type { DocumentNode } from "graphql";

const sdk = getSdk(
  <Response, Variables>(
    document: DocumentNode,
    variables: Variables
  ): Promise<Response> => {
    return request({
      url: "http://127.0.0.1:3000/graphql",
      document,
      variables,
    });
  }
);

async function main() {
  const todos = await sdk.AllTodos();
  console.log(todos);
}

main();
