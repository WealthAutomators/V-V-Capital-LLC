/**
 * Downloads unique Unsplash images for V&V Capital LLC.
 * Hero, categories, banners, products (×2), and review photos.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

/** Curated Unsplash photo IDs grouped by theme */
const POOLS = {
  hero: [
    "photo-1618221195710-e982f1f8752b",
    "photo-1600585154526-990dced4db0d",
    "photo-1616486327342-c4ada60c33e5",
  ],
  electronics: [
    "photo-1505740100551-4242580be354",
    "photo-1593642532823-8fa782be72a5",
    "photo-1527814050087-3793815478db",
    "photo-1608043152269-423dbba4e7e1",
    "photo-1572569511254-d8f925fe2cbb",
    "photo-1543515245-324be289ddeb",
    "photo-1484704849700-f032a568e944",
    "photo-1583394838336-acd9777362a6",
    "photo-1625728744080-077785a06511",
    "photo-1590658268037-6bf12165a509",
  ],
  homeKitchen: [
    "photo-1556911221-bff31c812bea",
    "photo-1570172619644-df0cb7bf0a08",
    "photo-1585515320310-259814833e95",
    "photo-1556912172-2b0c790c0b4f",
    "photo-1558618666-fcd25c85cd64",
    "photo-1517668808822-9ebb02f2a0e6",
    "photo-1570222096853-7762faff523e",
    "photo-1585515680365-986b5a5d267a",
    "photo-1556909114-f6e7ad7d5046",
    "photo-1556909174-fda3ad7c4d37",
  ],
  bathroom: [
    "photo-1584622650111-993a426fbf0a",
    "photo-1616486338812-3dadae4b4ace",
    "photo-1620626011764-996317b8d101",
    "photo-1631889992164-882aae16d807",
    "photo-1600566753190-17fedebaa088",
  ],
  toys: [
    "photo-1503454535920-2a2bab2645a2",
    "photo-1558068710-1c8e0857584f",
    "photo-1515488042361-ee00e5178171",
    "photo-1587654780291-39c9404d746b",
    "photo-1596462502278-27bfdc403348",
    "photo-1566576912321-d58ddd7a6088",
    "photo-1558618666-fcd25c85cd64",
  ],
  pets: [
    "photo-1583511655852-d21ac8a622af",
    "photo-1601758228041-f3b2795255f1",
    "photo-1548199973-03cce0cfb87f",
    "photo-1450778869180-41d0601e046e",
    "photo-1516734212186-a967f81ad0d4",
  ],
  beauty: [
    "photo-1522335780783-8b0812a2bb33",
    "photo-1596462502278-27bfdc403348",
    "photo-1570172619644-df0cb7bf0a08",
    "photo-1556228720-195a672e8a03",
    "photo-1620916566561-42b1d7f8d5b3",
    "photo-1612817288484-6f916006177a",
  ],
  sports: [
    "photo-1592432670736-3299669ea351",
    "photo-1571019614242-c5c5dee9f50b",
    "photo-1544367567-0f2fcb009e0b",
    "photo-1518611012118-696072aa579a",
    "photo-1517836357463-d25dfeac3438",
    "photo-1576678927484-cc907957088c",
  ],
  office: [
    "photo-1507003211169-0a1dd7228f2d",
    "photo-1497366216548-37526070297c",
    "photo-1486312338219-ce68d2c6f44d",
    "photo-1524758631624-e2822e304c36",
    "photo-1593062096039-9a26b09da705",
    "photo-1586281380349-632531db7ed4",
  ],
  fashion: [
    "photo-1527864550417-8fd665563061",
    "photo-1572635196237-14bfbfe68983",
    "photo-1523275335684-37898b6baf30",
    "photo-1434389677669-e08b4cac3105",
    "photo-1553062407-98eeb64c6a62",
  ],
  baby: [
    "photo-1515488042361-ee00e5178171",
    "photo-1555252337-59f4fe5e5c77",
    "photo-1519689680058-324335c77eba",
    "photo-1587654780291-39c9404d746b",
    "photo-1596462502278-27bfdc403348",
  ],
  health: [
    "photo-1608571428392-a4c1a89f9949",
    "photo-1601925265168-242426a8c117",
    "photo-1544367567-0f2fcb009e0b",
    "photo-1506126613408-eca07ce68773",
    "photo-1512621776951-a57141f2eefd",
  ],
  lifestyle: [
    "photo-1607082348824-0a6f2a591e89",
    "photo-1600880292089-3d770f7eefb9",
    "photo-1560448204-e02f11c2d0e2",
    "photo-1502672260266-1c1ef1d93688",
    "photo-1555042879-3bbffead5596",
    "photo-1516975080662-de93384bdaf7",
    "photo-1600210492486-724fe5c67fb0",
    "photo-1560448075-71d129397b25",
    "photo-1600607687939-ce8a6c25118c",
    "photo-1600566753086-00f18fb6b3ea",
    "photo-1600585154340-be6161a56a0c",
    "photo-1631049307264-da0ec9d70304",
    "photo-1615873964743-90a0b759fc5e",
    "photo-1600607687644-c7171b42498b",
    "photo-1586023496775-813d975d5192",
    "photo-1564071665922-072f0d6f6bd8",
    "photo-1600585152915-d208bec867a1",
    "photo-1600607687920-4e2a09cf159d",
    "photo-1600585154363-67eb9e2e2099",
    "photo-1505693416388-ac5ce068fe85",
    "photo-1595526114035-0d45ed16cfbf",
    "photo-1604014237800-1c9102c219da",
    "photo-1581578731548-c64695cc6952",
    "photo-1555041169-4ebf927d8357",
    "photo-1585412727319-8e4b7b5c0b0e",
    "photo-1600185365483-26edb4bd4c45",
    "photo-1628177150159-2f8ce6df1f1e",
    "photo-1583847260160-a63b3f677b9a",
    "photo-1563453397-107a7c3efb2e",
    "photo-1661940968217-583e272f6fc6",
    "photo-1725901056426-de7ba9b652e8",
    "photo-1733514432941-6a6954b67d0a",
    "photo-1684445034670-b36aca25c25a",
    "photo-1677354538246-c533b035ae5c",
    "photo-1670930887547-518452a967fb",
    "photo-1664372899275-05bdd18c8516",
    "photo-1679064287065-66207aa15ab7",
    "photo-1676638155455-7db84193f440",
    "photo-1674747086448-2270b41ac808",
    "photo-1556228453-efd6c1ff04f6",
    "photo-1587043862100-01920db231ba",
    "photo-1496890185067-72d7d9af66b1",
    "photo-1589898362790-edba11d34869",
    "photo-1596683705523-eb49540c3934",
    "photo-1602658327972-85bb6521a086",
    "photo-1603400522537-35e25a14bc1e",
    "photo-1616663717839-2fea42e1a1f6",
    "photo-1619263719761-165c773ee5df",
    "photo-1620000190821-abd8f262b86f",
    "photo-1630381260593-45e8f922997b",
    "photo-1639298107786-fc9e5880016f",
    "photo-1639298109207-5a9ccc254481",
    "photo-1666934209606-a955a12edd63",
    "photo-1674924389976-005a3dba2896",
    "photo-1687951812646-efa29195a80d",
    "photo-1724847885015-be191f1a47ef",
    "photo-1523471826770-c437b4636fe6",
    "photo-1558505780-1e584fab3ede",
    "photo-1574421233376-06f2ccf017f7",
    "photo-1590439471364-192aa70c0b53",
    "photo-1609840112990-4265448268d1",
    "photo-1616627502968-858f7b39f574",
    "photo-1617811449482-31093c8cee16",
    "photo-1621468644541-deea173bd43e",
    "photo-1638232928539-6e91c47ddec5",
    "photo-1639298107851-058984903954",
    "photo-1650481093978-6cc58e4649f4",
    "photo-1533759413974-9e15f3b745ac",
    "photo-1595182939836-5d4ba24ae7bf",
    "photo-1608651061499-ff031fbf6645",
    "photo-1664881353843-769f951ff470",
    "photo-1700590906201-2739ba9efbe9",
    "photo-1707291173710-10514ef55814",
    "photo-1716078103276-133ae3e98424",
    "photo-1571896349842-33c89424de2d",
    "photo-1560185127-6ed189bf02f4",
    "photo-1615529328331-f8917597711f",
    "photo-1556228578-8c89e6adf883",
    "photo-1540555700478-4be289fbecef",
    "photo-1600566752355-35792bedcfea",
    "photo-1596394516093-87feb5cb33dd",
    "photo-1519823551278-64ae032d27e0",
    "photo-1600047509807-ba8f88d3cdf7",
    "photo-1631679705879-a6ba6902b779",
    "photo-1523481400522-73651ccf5d4b",
    "photo-1513693902810-1b7c3ceaa280",
    "photo-1600573472592-401b489b3cdc",
    "photo-1584622781867-0d7f090daa3e",
    "photo-1600607688969-a5bfcd6461fe",
    "photo-1515377905543-f15e52645c35",
    "photo-1507652313519-d4e9174996ca",
    "photo-1552320884-9c4fef4ef589",
    "photo-1595514537822-8e284785127e",
    "photo-1527515637465-c94e0ddbfe09",
    "photo-1616628188855-8c7a03445b07",
    "photo-1512621776951-a57141f2eefd",
    "photo-1611892440509-7a25aafad115",
  ],
};

const CATEGORY_SLUG_POOL = {
  electronics: POOLS.electronics,
  "home-kitchen": POOLS.homeKitchen,
  bathroom: POOLS.bathroom,
  "educational-toys": POOLS.toys,
  "pet-supplies": POOLS.pets,
  beauty: POOLS.beauty,
  "sports-outdoors": POOLS.sports,
  "office-supplies": POOLS.office,
  "fashion-accessories": POOLS.fashion,
  "baby-products": POOLS.baby,
  "toys-games": POOLS.toys,
  "health-wellness": POOLS.health,
};

/** Explicit primary image per product slug for visual relevance */
const PRODUCT_PRIMARY = {
  "wireless-earbuds": "photo-1590658268037-6bf12165a509",
  "bluetooth-speaker": "photo-1608043152269-423dbba4e7e1",
  "smart-power-strip": "photo-1625728744080-077785a06511",
  "electric-kettle": "photo-1585515320310-259814833e95",
  "air-fryer": "photo-1585515680365-986b5a5d267a",
  "coffee-grinder": "photo-1517668808822-9ebb02f2a0e6",
  "bath-towel-set": "photo-1584622650111-993a426fbf0a",
  "shower-caddy-organizer": "photo-1616486338812-3dadae4b4ace",
  "kids-learning-tablet": "photo-1503454535920-2a2bab2645a2",
  "stem-robot-kit": "photo-1558068710-1c8e0857584f",
  "dog-bed": "photo-1583511655852-d21ac8a622af",
  "pet-food-storage": "photo-1601758228041-f3b2795255f1",
  "vitamin-c-serum-set": "photo-1620916566561-42b1d7f8d5b3",
  "hair-care-bundle": "photo-1522335780783-8b0812a2bb33",
  "yoga-mat": "photo-1592432670736-3299669ea351",
  "resistance-bands-set": "photo-1571019614242-c5c5dee9f50b",
  "standing-desk-lamp": "photo-1507003211169-0a1dd7228f2d",
  "ergonomic-mouse-pad": "photo-1497366216548-37526070297c",
  "leather-wallet": "photo-1527864550417-8fd665563061",
  "sunglasses-classic": "photo-1572635196237-14bfbfe68983",
  "baby-monitor": "photo-1555252337-59f4fe5e5c77",
  "soft-plush-blanket": "photo-1519689680058-324335c77eba",
  "building-blocks-set": "photo-1587654780291-39c9404d746b",
  "board-game-family": "photo-1611892440509-7a25aafad115",
  "foam-roller": "photo-1601925265168-242426a8c117",
  "essential-oil-diffuser": "photo-1608571428392-a4c1a89f9949",
};

const CATEGORY_IMAGES = {
  electronics: "photo-1505740100551-4242580be354",
  "home-kitchen": "photo-1556911221-bff31c812bea",
  bathroom: "photo-1620626011764-996317b8d101",
  "educational-toys": "photo-1566576912321-d58ddd7a6088",
  "pet-supplies": "photo-1548199973-03cce0cfb87f",
  beauty: "photo-1612817288484-6f916006177a",
  "sports-outdoors": "photo-1518611012118-696072aa579a",
  "office-supplies": "photo-1486312338219-ce68d2c6f44d",
  "fashion-accessories": "photo-1523275335684-37898b6baf30",
  "baby-products": "photo-1515488042361-ee00e5178171",
  "toys-games": "photo-1558068710-1c8e0857584f",
  "health-wellness": "photo-1506126613408-eca07ce68773",
};

function unsplashUrl(photoId, width) {
  return `https://images.unsplash.com/${photoId}?fm=jpg&q=85&w=${width}&auto=format&fit=crop`;
}

function parseProducts() {
  const content = fs.readFileSync(path.join(ROOT, "data", "products.ts"), "utf8");
  const blocks = content.split(/\n  \{/);
  const products = [];

  for (const block of blocks.slice(1)) {
    const slug = block.match(/slug: "([^"]+)"/)?.[1];
    const categorySlug = block.match(/categorySlug: "([^"]+)"/)?.[1];
    if (slug && categorySlug) products.push({ slug, categorySlug });
  }

  return products;
}

function buildTargets() {
  const products = parseProducts();
  const targets = [];

  targets.push({ file: "hero/hero-1.jpg", width: 2000, photoId: POOLS.hero[0] });
  targets.push({ file: "banners/about.jpg", width: 1600, photoId: "photo-1607082348824-0a6f2a591e89" });
  targets.push({ file: "banners/featured.jpg", width: 1600, photoId: "photo-1616486327342-c4ada60c33e5" });

  for (const [slug, photoId] of Object.entries(CATEGORY_IMAGES)) {
    targets.push({ file: `categories/${slug}.jpg`, width: 800, photoId });
  }

  for (const product of products) {
    const primaryId = PRODUCT_PRIMARY[product.slug];
    const pool = CATEGORY_SLUG_POOL[product.categorySlug] || POOLS.lifestyle;
    const secondaryId = pool.find((id) => id !== primaryId) || pool[1] || pool[0];

    targets.push({
      file: `products/${product.slug}-1.jpg`,
      width: 900,
      photoId: primaryId,
      categorySlug: product.categorySlug,
    });
    targets.push({
      file: `products/${product.slug}-2.jpg`,
      width: 900,
      photoId: secondaryId,
      categorySlug: product.categorySlug,
    });
  }

  const reviewPool = [...POOLS.lifestyle, ...POOLS.electronics, ...POOLS.homeKitchen];
  for (let i = 1; i <= 8; i++) {
    targets.push({
      file: `reviews/review-${i}.jpg`,
      width: 600,
      photoId: reviewPool[i - 1] || reviewPool[0],
    });
  }

  return targets;
}

async function download(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "VVCapitalLLC/1.0 (image-setup)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error("File too small");
  return buf;
}

function getFallbackPool() {
  return [...new Set(Object.values(POOLS).flat())];
}

async function main() {
  const targets = buildTargets();
  console.log(`Downloading ${targets.length} Unsplash images...\n`);

  const usedPhotoIds = new Set();
  const usedHashes = new Set();
  const fallbackPool = getFallbackPool();
  let fallbackIndex = 0;

  const getFallback = (exclude) => {
    while (fallbackIndex < fallbackPool.length) {
      const id = fallbackPool[fallbackIndex++];
      if (!usedPhotoIds.has(id) && id !== exclude) return id;
    }
    return null;
  };

  let success = 0;
  let failed = 0;

  for (const target of targets) {
    const dest = path.join(PUBLIC, target.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });

    let saved = false;
    const tryIds = [target.photoId, getFallback(target.photoId)].filter(Boolean);

    for (const photoId of tryIds) {
      if (usedPhotoIds.has(photoId)) continue;

      try {
        const buf = await download(unsplashUrl(photoId, target.width));
        const hash = crypto.createHash("sha256").update(buf).digest("hex");

        if (usedHashes.has(hash)) {
          console.warn(`  skip duplicate: ${target.file}`);
          usedPhotoIds.add(photoId);
          continue;
        }

        fs.writeFileSync(dest, buf);
        usedPhotoIds.add(photoId);
        usedHashes.add(hash);
        saved = true;
        success++;
        console.log(`✓ ${target.file} ← ${photoId}`);
        break;
      } catch (err) {
        console.warn(`  retry ${target.file} (${photoId}): ${err.message}`);
      }
    }

    if (!saved) {
      for (let attempt = 0; attempt < 20 && !saved; attempt++) {
        const photoId = getFallback();
        if (!photoId || usedPhotoIds.has(photoId)) continue;

        try {
          const buf = await download(unsplashUrl(photoId, target.width));
          const hash = crypto.createHash("sha256").update(buf).digest("hex");
          if (usedHashes.has(hash)) continue;

          fs.writeFileSync(dest, buf);
          usedPhotoIds.add(photoId);
          usedHashes.add(hash);
          saved = true;
          success++;
          console.log(`✓ ${target.file} ← ${photoId} (fallback)`);
        } catch {
          /* continue */
        }
      }
    }

    if (!saved) {
      failed++;
      console.error(`✗ failed: ${target.file}`);
    }
  }

  console.log(`\nDone: ${success} downloaded, ${failed} failed, ${usedPhotoIds.size} unique photos`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
