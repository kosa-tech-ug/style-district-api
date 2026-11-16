// Style District → Relworx static-IP relay (Vercel). Env: FIXIE_URL, RELAY_SECRET
import { ProxyAgent, fetch } from "undici";
const agent = new ProxyAgent(process.env.FIXIE_URL);
export default async function handler(req, res) {
  if (req.headers["x-relay-secret"] !== process.env.RELAY_SECRET) return res.status(401).json({ success: false, message: "Unauthorized relay call" });
  const path = String(req.query.path || "");
  if (!path.startsWith("/")) return res.status(400).json({ success: false, message: "Bad path" });
  const r = await fetch(`https://payments.relworx.com/api${path}`, {
    method: req.method,
    dispatcher: agent,
    headers: { "Content-Type": "application/json", Accept: req.headers["accept"] || "application/vnd.relworx.v2", Authorization: req.headers["authorization"] || "" },
    body: ["GET", "HEAD"].includes(req.method) ? undefined : JSON.stringify(req.body ?? {}),
  });
  res.status(r.status).setHeader("Content-Type", "application/json").send(await r.text());
}
