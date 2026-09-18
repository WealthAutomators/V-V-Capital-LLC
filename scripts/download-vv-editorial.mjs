/**
 * Download editorial photography for V&V Capital LLC.
 * Contemporary interiors, kitchens, workspaces — no nautical or rustic farmhouse.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");

const TARGETS = [
  { file: "hero/hero-1.jpg", id: "photo-1600210492486-724fe5c67fb0", width: 2000 },
  { file: "collections/at-home.jpg", id: "photo-1618221195710-dd5b85e668ea", width: 1400 },
  { file: "collections/gather.jpg", id: "photo-1600585154526-990dced4db0d", width: 1400 },
  { file: "collections/away.jpg", id: "photo-1600607687644-c7171b42498b", width: 1400 },
  { file: "collections/everyday.jpg", id: "photo-1586023492120-27b2c045efd7", width: 1400 },
  { file: "collections/workspace.jpg", id: "photo-1497366216548-37526070297c", width: 1400 },
  { file: "collections/personal.jpg", id: "photo-1570172619644-df0cb7bf0a08", width: 1400 },
  { file: "collections/apparel.jpg", id: "photo-1489987707025-941f72c20764", width: 1400 },
  { file: "collections/wellness.jpg", id: "photo-1544367563-12122d0c3e2a", width: 1400 },
  { file: "collections/outdoor.jpg", id: "photo-1416879595882-3373a0480b5b", width: 1400 },
  { file: "collections/gifts.jpg", id: "photo-1513885535751-8b9238bd345a", width: 1400 },
  { file: "editorial/residence.jpg", id: "photo-1600607687939-ce8a6c25118c", width: 1800 },
  { file: "editorial/entertaining.jpg", id: "photo-1414235077428-338989a2e8c0", width: 1800 },
  { file: "editorial/campaign.jpg", id: "photo-1556911220-e15b29be8c8f", width: 1800 },
  { file: "editorial/philosophy.jpg", id: "photo-1600585154340-be6161a56a0c", width: 1800 },
];

async function download(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "VVCapitalStore/1.0 (editorial-images)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) throw new Error("File too small");
  return buf;
}

async function main() {
  for (const target of TARGETS) {
    const dest = path.join(PUBLIC, target.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const url = `https://images.unsplash.com/${target.id}?fm=jpg&q=82&w=${target.width}&auto=format&fit=crop`;
    try {
      const buf = await download(url);
      fs.writeFileSync(dest, buf);
      console.log(`✓ ${target.file}`);
    } catch (err) {
      console.error(`✗ ${target.file}: ${err.message}`);
    }
  }
}

main();
