import { SmallBot } from "https://deno.land/x/smallbot_matrix@0.1.2/mod.ts";

const TOKEN = Deno.env.get("TOKEN") ?? Deno.exit(-1);
const ROOM_ID = Deno.env.get("ROOM_ID") ?? Deno.exit(-1);
const BOT = new SmallBot({
  accessToken: TOKEN,
  homeserverUrl: "https://github.com/mythal/neuron",
  eventHandler: async (_client, _roomId, _event) => {},
});

export async function sendMessage(msg: string): Promise<void> {
  await BOT.sendMessage(ROOM_ID, "m.text", msg);
}
