/**
 * Second-pass editorial replacements with fuller Unsplash IDs.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");

const TARGETS = [
  {
    file: "collections/personal.jpg",
    ids: [
      "photo-1507652313519-d4e9174996dd",
      "photo-1584622650111-993a426fbf0a",
      "photo-1552321554-5fefe8cdd17e",
      "photo-1631889993959-41b4e9c6e3c4",
      "photo-1600566752355-35792bedcfea",
    ],
  },
  {
    file: "collections/gifts.jpg",
    ids: [
      "photo-1512909006721-3d6018887383",
      "photo-1607344643674-9850252d2089",
      "photo-1549465220-1a8b9238cd48",
      "photo-1481393710559-0d7d078bb0c0",
    ],
  },
  {
    file: "collections/away.jpg",
    ids: [
      "photo-1590874106584-8ccbabf8627b",
      "photo-1479064555552-3ef4979f8908",
      "photo-1523381210434-271e8be1f52b",
    ],
  },
  {
    file: "collections/everyday.jpg",
    ids: [
      "photo-1556912173-46c336c7fd55",
      "photo-1616047006789-b7af370a7e97",
      "photo-1556909114-f6e7ad7d3136",
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
