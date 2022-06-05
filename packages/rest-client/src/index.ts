import { DefaultService } from "../generated";

async function main() {
  const todos = await DefaultService.getTodos();
  console.log(todos);
}

main();
