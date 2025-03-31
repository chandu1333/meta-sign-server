const crypto = require("crypto");
const fs = require("fs");
const privateKey = fs.readFileSync("private.pem", "utf8");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Only POST allowed");
  }

  const publicKeyFromMeta = req.body.public_key;
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(publicKeyFromMeta);
  sign.end();
  const signature = sign.sign(privateKey, "base64");

  res.status(200).json({ signature });
}
