import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");

const TARGETS = [
  { file: "collections/at-home.jpg", ids: ["photo-1616486338812-3dadae4b4ace", "photo-1631679707269-588f6963d4a2", "photo-1600585152915-d208bec867a1"] },
  { file: "collections/away.jpg", ids: ["photo-1600047509807-ba8f88d3cdf7", "photo-1560185127-6ed189bf02f4", "photo-1505693416388-ac5ce068fe85"] },
  { file: "collections/everyday.jpg", ids: ["photo-1555041169-4ebf927d8357", "photo-1595526114035-0d45ed16cfbf", "photo-1583847260160-a63b3f677b9a"] },
  { file: "collections/personal.jpg", ids: ["photo-1556228720-195a672e8a03", "photo-1600185365483-26edb4bd4c45", "photo-1513693902810-1b7c3ceaa280"] },
  { file: "collections/apparel.jpg", ids: ["photo-1441984904996-e0b6ba687e04", "photo-1523381210434-271e8be1f52b", "photo-1556905055-8f358a7a47b2"] },
  { file: "collections/wellness.jpg", ids: ["photo-1518611012118-696072aa579a", "photo-1571019613454-1cb2f99b2d8b", "photo-1545205597-3d9d02c29597"] },
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
    let saved = false;
    for (const id of target.ids) {
      const url = `https://images.unsplash.com/${id}?fm=jpg&q=82&w=1400&auto=format&fit=crop`;
      try {
        const buf = await download(url);
        fs.writeFileSync(dest, buf);
        console.log(`✓ ${target.file} ← ${id}`);
        saved = true;
        break;
      } catch (err) {
        console.warn(`  retry ${id}: ${err.message}`);
      }
    }
    if (!saved) console.error(`✗ ${target.file}`);
  }
}

main();
