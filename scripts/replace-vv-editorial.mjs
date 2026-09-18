/**
 * Replace mismatched collection/editorial photos with semantically correct ones.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");

const TARGETS = [
  {
    file: "collections/gather.jpg",
    ids: [
      "photo-1600585152220-90363fe7e115",
      "photo-1600566753190-17f0baa2a6c3",
      "photo-1556909114-f6e7ad7d3136",
      "photo-1600489005224-42c6fc2f7090",
    ],
  },
  {
    file: "collections/away.jpg",
    ids: [
      "photo-1553062407-98eeb64c6a62",
      "photo-1479064555552-3ef4979f8908",
      "photo-1523381210434-271e8be1f52b",
      "photo-1441986300917-64674bd600d8",
    ],
  },
  {
    file: "collections/everyday.jpg",
    ids: [
      "photo-1594026112284-02bb6f3352fe",
      "photo-1556912173-3bb406d1e803",
      "photo-1616046229478-9901c5536a45",
      "photo-1556909172-54557c7e50bf",
    ],
  },
  {
    file: "collections/workspace.jpg",
    ids: [
      "photo-1593062096033-9a26b09da705",
      "photo-1518455027359-f3f8164ba6bd",
      "photo-1486312338219-ce68d2c6f44d",
      "photo-1497215728101-856f4ea42174",
    ],
  },
  {
    file: "collections/personal.jpg",
    ids: [
      "photo-1608248543803-ba4f8d86c2b3",
      "photo-1571781926291-c477ebfd024b",
      "photo-1620916566398-39f1143ab7be",
      "photo-1631730351925-0b3d2144d3a5",
    ],
  },
  {
    file: "collections/gifts.jpg",
    ids: [
      "photo-1549465220-1a8b9238cd48",
      "photo-1513201099705-a9746e1e201f",
      "photo-1544441893-675973e31985",
      "photo-1481391032119-d89fee407e44",
    ],
  },
  {
    file: "editorial/entertaining.jpg",
    ids: [
      "photo-1466978913421-dad2ebd01d17",
      "photo-1470337458703-46ad1756a187",
      "photo-1510812431401-41d2bd2722f3",
      "photo-1600566753086-00f18fb6b3ea",
    ],
  },
];

async function download(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "VVCapitalStore/1.0 (editorial-images)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) throw new Error(`File too small (${buf.length})`);
  return buf;
}

async function main() {
  for (const target of TARGETS) {
    const dest = path.join(PUBLIC, target.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    let saved = false;
    for (const id of target.ids) {
      const url = `https://images.unsplash.com/${id}?fm=jpg&q=82&w=1600&auto=format&fit=crop`;
      try {
        const buf = await download(url);
        fs.writeFileSync(dest, buf);
        console.log(`✓ ${target.file} ← ${id} (${buf.length} bytes)`);
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
