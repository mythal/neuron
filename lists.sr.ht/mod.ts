import { type Body } from "https://deno.land/x/oak@v11.1.0/body.ts";

export async function render(data: Body) : Promise<string> {
  if (data.type != "json") {
    throw "Wrong body";
  }
  const val = await data.value;
  const email = val?.data?.webhook?.email;

  const name = email?.sender?.canonicalName ?? 'Somebody';
  const subject = email?.subject ?? "No subject";
  
  return `${name} has a new post [${subject}].`
}
