// Massive Brand Multiplier - Sync Admin Panel + Expand to 6,000+ Brands
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { brands, sectors, adminPanelBrands } from './shared/schema.ts';
import { eq } from 'drizzle-orm';
import ws from "ws";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema: { brands, sectors, adminPanelBrands } });

// Expansion patterns for massive brand creation
const BRAND_VARIANTS = [
  'Pro™', 'Elite™', 'Master™', 'Enterprise™', 'Global™', 'Ultra™',
  'Prime™', 'Nexus™', 'Quantum™', 'Supreme™', 'Advanced™', 'Premium™',
  'Core™', 'Plus™', 'Max™', 'Infinity™', 'Genesis™', 'Phoenix™',
  'Titan™', 'Matrix™', 'Fusion™', 'Alpha™', 'Beta™', 'Omega™'
];

const SECTOR_PREFIXES = [
  'Mega', 'Super', 'Hyper', 'Ultra', 'Omni', 'Multi', 'Dynamic',
  'Smart', 'Intelligent', 'Advanced', 'Professional', 'Universal'
];

const TECH_SUFFIXES = [
  'Hub', 'Lab', 'Works', 'Systems', 'Solutions', 'Technologies',
  'Network', 'Platform', 'Engine', 'Framework', 'Portal', 'Gateway'
];

function createBrandVariations(baseBrand, count = 8) {
  const variations = [];
  const baseName = baseBrand.brandName.replace(/[™®©]/g, '');
  
  // Start with original
  variations.push({
    name: baseBrand.brandName,
    isCore: true,
    tier: 'A++',
    pricing: 299.99
  });
  
  // Add variants
  for (let i = 1; i < count; i++) {
    let variantName;
    let tier = 'A';
    let pricing = 149.99;
    
    if (i <= BRAND_VARIANTS.length) {
      variantName = `${baseName} ${BRAND_VARIANTS[i - 1]}`;
      tier = i <= 3 ? 'A+' : i <= 6 ? 'A' : 'B+';
      pricing = i <= 3 ? 199.99 : i <= 6 ? 149.99 : 99.99;
    } else if (i <= BRAND_VARIANTS.length + SECTOR_PREFIXES.length) {
      const prefixIndex = i - BRAND_VARIANTS.length - 1;
      variantName = `${SECTOR_PREFIXES[prefixIndex]} ${baseName}™`;
      tier = 'A';
      pricing = 129.99;
    } else {
      variantName = `${baseName} ${Math.floor(Math.random() * 999) + 1}™`;
      tier = 'B+';
      pricing = 79.99;
    }
    
    variations.push({
      name: variantName,
      isCore: i <= 2,
      tier: tier,
      pricing: pricing
    });
  }
  
  return variations;
}

async function massiveBrandMultiplier() {
  console.log('🚀 Starting MASSIVE Brand Multiplier (Target: 6,000+ brands)...');

  try {
    // Get all admin panel brands
    const adminBrands = await db.select().from(adminPanelBrands);
    console.log(`📊 Found ${adminBrands.length} authentic admin panel brands`);
    
    // Get sectors mapping
    const allSectors = await db.select().from(sectors);
    const sectorMap = {};
    allSectors.forEach(sector => {
      // Create multiple mapping patterns
      const cleanName1 = sector.name.replace(/^[🌱🏦📦🧾🔑🔁⛏️🖋️♻️🎪🎬🌟🤝🪙🌐⚙️🦁🥦🔋✂📡🧠🎮📚🏗️⚖📖☰🎙️✿✴️☯🧺🧭👥💡🔧🎯🔮🛡️⚗️🎨🎵🔬💰🌍📱💎🎪🕺]\s*/g, '').trim();
      const cleanName2 = sector.name.replace(/[🌱🏦📦🧾🔑🔁⛏️🖋️♻️🎪🎬🌟🤝🪙🌐⚙️🦁🥦🔋✂📡🧠🎮📚🏗️⚖📖☰🎙️✿✴️☯🧺🧭👥💡🔧🎯🔮🛡️⚗️🎨🎵🔬💰🌍📱💎🎪🕺\s]/g, '').trim();
      
      sectorMap[cleanName1] = sector.id;
      sectorMap[cleanName2] = sector.id;
      sectorMap[sector.name] = sector.id;
      
      // Special mappings for common mismatches
      if (cleanName1.includes('Motion')) sectorMap['Motion, Media & Sonic'] = sector.id;
      if (cleanName1.includes('Food')) sectorMap['Food, Soil & Farming'] = sector.id;
      if (cleanName1.includes('Banking')) sectorMap['Banking & Finance'] = sector.id;
    });

    console.log('🗺️  Sector mapping completed');

    let totalBrandsCreated = 0;
    let totalSubnodesCreated = 0;

    // Group admin brands by sector
    const brandsBySector = {};
    adminBrands.forEach(brand => {
      if (!brandsBySector[brand.sectorName]) {
        brandsBySector[brand.sectorName] = [];
      }
      brandsBySector[brand.sectorName].push(brand);
    });

    console.log(`🏗️  Processing ${Object.keys(brandsBySector).length} sectors`);

    for (const [sectorName, sectorBrands] of Object.entries(brandsBySector)) {
      const sectorId = sectorMap[sectorName] || sectorMap[sectorName.replace(/,/g, '')] || sectorMap[sectorName.replace(/&/g, 'and')];
      
      if (!sectorId) {
        console.log(`⚠️  No sector match for: "${sectorName}", creating variations...`);
        // Try to find partial matches
        const partialMatch = allSectors.find(s => 
          s.name.toLowerCase().includes(sectorName.toLowerCase().split(' ')[0]) ||
          sectorName.toLowerCase().includes(s.name.toLowerCase().split(' ')[1])
        );
        if (partialMatch) {
          console.log(`✅ Found partial match for ${sectorName}: ${partialMatch.name}`);
          sectorMap[sectorName] = partialMatch.id;
        } else {
          continue;
        }
      }

      console.log(`🏭 Processing ${sectorName}: ${sectorBrands.length} base brands`);

      // Determine expansion factor (aim for 6000+ total across all sectors)
      const expansionFactor = Math.max(8, Math.floor(6500 / adminBrands.length));
      console.log(`📈 Using ${expansionFactor}x expansion for ${sectorName}`);

      let sectorCoreCount = 0;
      let sectorSubnodeCount = 0;

      for (const baseBrand of sectorBrands) {
        const variations = createBrandVariations(baseBrand, expansionFactor);
        
        for (const variant of variations) {
          try {
            const newBrand = await db.insert(brands).values({
              name: variant.name,
              description: `Advanced ${variant.name} management system for ${sectorName} with comprehensive VaultMesh™ integration and omnilevel operational excellence. Original admin panel brand: ${baseBrand.brandName}`,
              sectorId: sectorMap[sectorName],
              integration: variant.tier === 'A++' ? 'VaultMesh™' : variant.tier === 'A+' ? 'HotStack' : 'SecureSign™',
              status: 'active',
              isCore: variant.isCore,
              metadata: {
                category: sectorName,
                tier: variant.tier,
                features: [`${variant.name.split(' ')[0]} Analytics`, `${variant.name.split(' ')[0]} Security`, `${variant.name.split(' ')[0]} Management`],
                integrations: ['VaultMesh™', 'SecureSign™', 'PulseTrade™', 'OmniGrid™'],
                pricing: variant.pricing,
                originalAdminBrand: baseBrand.brandName,
                adminBrandId: baseBrand.id,
                expansion: true
              }
            }).returning();

            if (variant.isCore) {
              sectorCoreCount++;
              totalBrandsCreated++;
            }

            // Create 4-6 subnodes for each brand
            const subnodeCount = Math.floor(Math.random() * 3) + 4; // 4-6 subnodes
            for (let j = 0; j < subnodeCount; j++) {
              await db.insert(brands).values({
                name: `${variant.name.replace(/[™®©]/g, '')} Node ${j + 1}™`,
                description: `Specialized ${variant.name} processing subnode for enhanced ${sectorName.toLowerCase()} operations.`,
                sectorId: sectorMap[sectorName],
                parentId: newBrand[0].id,
                integration: 'HotStack',
                status: 'active',
                isCore: false,
                metadata: {
                  category: `${sectorName} - Subnode`,
                  parentBrand: variant.name,
                  nodeType: j % 2 === 0 ? 'processing' : 'analytics',
                  tier: 'B',
                  pricing: 49.99,
                  subnodeLevel: j + 1,
                  originalParent: baseBrand.brandName
                }
              });

              sectorSubnodeCount++;
              totalSubnodesCreated++;
            }
          } catch (error) {
            console.log(`⚠️  Error creating brand ${variant.name}:`, error.message);
          }
        }
      }

      // Update sector counts
      try {
        const allSectorBrands = await db.select().from(brands)
          .where(eq(brands.sectorId, sectorMap[sectorName]));
        
        const coreCount = allSectorBrands.filter(b => !b.parentId).length;
        const subnodeCount = allSectorBrands.filter(b => b.parentId).length;
        
        await db.update(sectors)
          .set({ 
            brandCount: coreCount,
            subnodeCount: subnodeCount 
          })
          .where(eq(sectors.id, sectorMap[sectorName]));

        console.log(`✅ ${sectorName}: ${coreCount} core + ${subnodeCount} subnodes`);
      } catch (error) {
        console.log(`⚠️  Error updating sector ${sectorName}:`, error.message);
      }
    }

    // Final count
    const finalCount = await db.select().from(brands);
    const finalCoreCount = finalCount.filter(b => !b.parentId).length;
    const finalSubnodeCount = finalCount.filter(b => b.parentId).length;
    const grandTotal = finalCount.length;

    console.log('🎉 MASSIVE BRAND MULTIPLICATION COMPLETE!');
    console.log(`📊 FINAL RESULTS:`);
    console.log(`   Core Brands: ${finalCoreCount.toLocaleString()}`);
    console.log(`   Subnodes: ${finalSubnodeCount.toLocaleString()}`);
    console.log(`   GRAND TOTAL: ${grandTotal.toLocaleString()} brands`);
    console.log(`   Target Status: ${grandTotal >= 6000 ? '✅ ACHIEVED' : '❌ NEED MORE'} (Target: 6,000+)`);
    
  } catch (error) {
    console.error('❌ Error during massive brand multiplication:', error);
    throw error;
  }
}

// Run the multiplier
massiveBrandMultiplier()
  .then(() => {
    console.log('🚀 MASSIVE BRAND MULTIPLICATION COMPLETED!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Multiplication failed:', error);
    process.exit(1);
  });