import { db } from "./db";
import { sectors, brands, systemStatus, legalDocuments } from "@shared/schema";
import { COMPREHENSIVE_BRAND_DATA } from "@shared/schema";
import { FRUITFUL_CRATE_DANCE_SECTORS } from "@shared/fruitful-crate-dance-ecosystem";

export async function seedDatabase() {
  console.log("🌱 Seeding database with comprehensive brand data...");

  try {
    // Check if data already exists
    const existingBrands = await db.select().from(brands).limit(1);
    if (existingBrands.length > 0) {
      console.log("✅ Database already seeded, skipping...");
      return;
    }

    // Clear existing data
    await db.delete(brands);
    await db.delete(sectors);
    await db.delete(systemStatus);

    // Comprehensive sector definitions matching the reference HTML
    const comprehensiveSectorMappings = [
      { key: "agriculture", name: "Agriculture & Biotech", emoji: "🌱", brands: 84, nodes: 12 },
      { key: "banking", name: "Banking & Finance", emoji: "🏦", brands: 60, nodes: 10 },
      { key: "logistics", name: "Logistics & Packaging", emoji: "📦", brands: 30, nodes: 10 },
      { key: "professional", name: "Professional Services", emoji: "💼", brands: 30, nodes: 8 },
      { key: "saas", name: "SaaS & Licensing", emoji: "💻", brands: 20, nodes: 8 },
      { key: "nft", name: "NFT & Ownership", emoji: "🎨", brands: 20, nodes: 8 },
      { key: "quantum", name: "Quantum Protocols", emoji: "⚛️", brands: 20, nodes: 8 },
      { key: "ritual", name: "Ritual & Culture", emoji: "🎭", brands: 20, nodes: 8 },
      { key: "nutrition", name: "Nutrition & Food Chain", emoji: "🍎", brands: 20, nodes: 8 },
      { key: "zerowaste", name: "Zero Waste", emoji: "♻️", brands: 20, nodes: 8 },
      { key: "voice", name: "Voice & Audio", emoji: "🎤", brands: 12, nodes: 8 },
      { key: "wellness", name: "Wellness Tech & Nodes", emoji: "🧘", brands: 12, nodes: 8 },
      { key: "utilities", name: "Utilities & Energy", emoji: "⚡", brands: 12, nodes: 8 },
      { key: "creative", name: "Creative Tech", emoji: "🎨", brands: 10, nodes: 10 }
    ];

    const createdSectors = new Map();

    // Insert comprehensive sectors matching the reference HTML
    for (const mapping of comprehensiveSectorMappings) {
      const [sector] = await db.insert(sectors).values({
        name: mapping.name,
        emoji: mapping.emoji,
        description: `${mapping.name} solutions and infrastructure`,
        brandCount: mapping.brands,
        subnodeCount: mapping.nodes
      }).returning();

      createdSectors.set(mapping.key, sector);
    }

    // Add Fruitful Crate Dance sectors
    for (const [sectorKey, sectorData] of Object.entries(FRUITFUL_CRATE_DANCE_SECTORS)) {
      const [sector] = await db.insert(sectors).values({
        name: sectorData.name,
        emoji: sectorData.name.split(' ')[0],
        description: sectorData.description,
        brandCount: sectorData.brands.length,
        subnodeCount: Math.floor(sectorData.brands.length * 0.3)
      }).returning();

      createdSectors.set(`fruitful_${sectorKey}`, sector);
    }

    // Insert brands from comprehensive data
    let brandCount = 0;
    for (const [sectorKey, sectorData] of Object.entries(COMPREHENSIVE_BRAND_DATA)) {
      const sector = createdSectors.get(sectorKey);
      if (sector) {
        for (let i = 0; i < sectorData.brands.length; i++) {
          const brandName = sectorData.brands[i];
          await db.insert(brands).values({
            name: brandName,
            description: `Professional ${sectorData.name.replace(/[🔥🌱🏭🧠⚡🏦💊🎨🛡️🌐🏢🚗🎓📱🧪🔬⚖️🏠🌍🍎🌿📊🎯🛒📦🧮💼🔌⚙️🌊💡🎮🔒]/g, '').trim()} solution powered by ${brandName}`,
            sectorId: sector.id,
            integration: ["VaultMesh™", "HotStack", "FAA.ZONE™"][i % 3],
            status: ["active", "maintenance", "active"][i % 3],
            isCore: true,
            parentId: null,
            metadata: { 
              featured: i < 3,
              sector: sectorKey,
              planVersions: sectorData.planVersions
            }
          });
          brandCount++;
        }
      }
    }

    // Add Fruitful Crate Dance brands
    for (const [sectorKey, sectorData] of Object.entries(FRUITFUL_CRATE_DANCE_SECTORS)) {
      const sector = createdSectors.get(`fruitful_${sectorKey}`);
      if (sector) {
        for (let i = 0; i < sectorData.brands.length; i++) {
          const brandName = sectorData.brands[i];
          await db.insert(brands).values({
            name: brandName,
            description: `Fruitful Crate Dance ecosystem brand: ${brandName}`,
            sectorId: sector.id,
            integration: ["VaultMesh™", "HotStack", "FAA.ZONE™"][i % 3],
            status: "active",
            isCore: true,
            parentId: null,
            metadata: { 
              featured: i < 5,
              sector: `fruitful_${sectorKey}`,
              ecosystem: "fruitful-crate-dance"
            }
          });
          brandCount++;
        }
      }
    }

    // Insert system status
    await db.insert(systemStatus).values([
      { service: "VaultMesh™", status: "online" },
      { service: "HotStack", status: "maintenance" },
      { service: "FAA.ZONE™", status: "online" },
      { service: "SecureSign™", status: "online" },
      { service: "King Price Integration", status: "active" }
    ]);

    console.log(`✅ Database seeded successfully!`);
    console.log(`📊 Created ${createdSectors.size} sectors`);
    console.log(`🏷️ Created ${brandCount} brands`);
    console.log(`⚙️ Created 5 system status entries`);

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}