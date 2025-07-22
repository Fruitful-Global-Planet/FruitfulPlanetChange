// Comprehensive Brand Seeder - Populate all missing sector brands
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { brands, sectors } from './shared/schema.ts';
import { eq } from 'drizzle-orm';
import ws from "ws";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema: { brands, sectors } });

// Comprehensive brand data for all sectors to match frontend counts
const comprehensiveBrandData = {
  // Analytics & Insights - needs brands
  "Analytics & Insights": [
    "DataForge™", "InsightCore™", "MetricFlow™", "AnalyticSync™", "TrendScope™",
    "ReportGen™", "DashboardPro™", "DataVault™", "QueryMaster™", "ChartFlow™"
  ],

  // Content Creation - needs brands  
  "Content Creation": [
    "ContentForge™", "CreativeFlow™", "MediaSync™", "StoryCore™", "DesignVault™",
    "VideoForge™", "AudioMaster™", "GraphicFlow™", "ContentHub™", "CreativeSync™"
  ],

  // Dance & Movement - needs brands
  "Dance & Movement": [
    "MoveFlow™", "DanceCore™", "ChoreographySync™", "MotionTrack™", "RhythmForge™",
    "MovementHub™", "DanceVault™", "FlowMaster™", "MotionSync™", "BeatFlow™"
  ],

  // Education & IP - needs brands
  "Education & IP": [
    "LearnFlow™", "EduCore™", "KnowledgeVault™", "StudySync™", "SkillForge™",
    "CourseHub™", "LearningFlow™", "EduMaster™", "StudyCore™", "KnowledgeFlow™"
  ],

  // Education & Youth - needs brands
  "Education & Youth": [
    "YouthCore™", "StudentFlow™", "LearnSync™", "SkillHub™", "EduVault™",
    "YouthForge™", "StudentCore™", "LearningVault™", "StudyFlow™", "SkillSync™"
  ],

  // Event Management - needs brands
  "Event Management": [
    "EventCore™", "PlanFlow™", "VenueSync™", "EventMaster™", "CelebrationHub™",
    "PartyForge™", "EventVault™", "GatheringCore™", "OccasionFlow™", "FestivalSync™"
  ],

  // Financial Management - needs brands
  "Financial Management": [
    "FinanceForge™", "MoneyFlow™", "BudgetCore™", "InvestSync™", "WealthVault™",
    "PaymentHub™", "FinancialFlow™", "CashMaster™", "BankingCore™", "InvestFlow™"
  ],

  // Food, Soil & Farming - needs brands
  "Food, Soil & Farming": [
    "FarmForge™", "SoilCore™", "CropFlow™", "AgriSync™", "HarvestVault™",
    "FarmHub™", "GrowthFlow™", "SoilMaster™", "CropCore™", "AgriFlow™",
    "FarmVault™", "GrowSync™", "HarvestCore™", "SoilFlow™", "CropSync™",
    "AgriVault™", "FarmFlow™", "GrowthCore™", "SoilSync™", "HarvestFlow™"
  ],

  // Gaming & Simulation - needs brands
  "Gaming & Simulation": [
    "GameForge™", "SimCore™", "PlayFlow™", "GameSync™", "VirtualVault™",
    "GameHub™", "PlayMaster™", "SimFlow™", "GameCore™", "VirtualFlow™"
  ],

  // Global Brand Index - needs brands
  "Global Brand Index": [
    "BrandForge™", "GlobalCore™", "IndexFlow™", "BrandSync™"
  ],

  // Health & Hygiene - needs brands
  "Health & Hygiene": [
    "HealthForge™", "WellnessCore™", "HygieneFlow™", "MedSync™", "HealthVault™",
    "CareHub™", "WellnessFlow™", "HealthMaster™", "MedCore™", "CareFlow™"
  ],

  // Housing & Infrastructure - needs brands
  "Housing & Infrastructure": [
    "BuildForge™", "StructureCore™", "ConstructFlow™", "HousingSync™", "InfraVault™",
    "BuildHub™", "ConstructCore™", "StructureFlow™", "HouseMaster™", "InfraFlow™"
  ],

  // Justice & Ethics - needs brands
  "Justice & Ethics": [
    "JusticeForge™", "EthicsCore™", "LegalFlow™", "JusticeSync™", "EthicsVault™",
    "LegalHub™", "JusticeFlow™", "EthicsMaster™", "LegalCore™", "JusticeVault™"
  ],

  // Knowledge & Archives - needs brands
  "Knowledge & Archives": [
    "KnowledgeForge™", "ArchiveCore™", "DataFlow™", "InfoSync™", "KnowledgeVault™",
    "ArchiveHub™", "InfoFlow™", "DataMaster™", "ArchiveFlow™", "KnowledgeCore™"
  ],

  // Marketing & Branding - needs brands
  "Marketing & Branding": [
    "BrandForge™", "MarketCore™", "BrandFlow™", "MarketSync™", "BrandVault™",
    "MarketHub™", "BrandMaster™", "MarketFlow™", "BrandCore™", "MarketVault™"
  ],

  // Micro-Mesh Logistics - needs brands
  "Micro-Mesh Logistics": [
    "MeshForge™", "LogiCore™", "MicroFlow™", "MeshSync™", "LogiVault™",
    "MeshHub™", "LogiFlow™", "MicroCore™", "MeshMaster™", "LogiSync™"
  ],

  // Motion, Media & Sonic - needs brands
  "Motion, Media & Sonic": [
    "MediaForge™", "SonicCore™", "MotionFlow™", "AudioSync™", "MediaVault™",
    "SonicHub™", "MotionCore™", "AudioFlow™", "MediaMaster™", "SonicFlow™"
  ],

  // Music & Sound Design - needs brands
  "Music & Sound Design": [
    "SoundForge™", "MusicCore™", "AudioFlow™", "BeatSync™", "SoundVault™",
    "MusicHub™", "AudioMaster™", "SoundFlow™", "MusicFlow™", "BeatCore™"
  ],

  // Nutrition & Food Chain - needs brands
  "Nutrition & Food Chain": [
    "NutriForge™", "FoodCore™", "NutriFlow™", "FoodSync™", "NutriVault™",
    "FoodHub™", "NutriMaster™", "FoodFlow™", "NutriCore™", "FoodVault™"
  ],

  // Partnership & Collaboration - needs brands
  "Partnership & Collaboration": [
    "PartnerForge™", "CollabCore™", "PartnerFlow™", "CollabSync™", "PartnerVault™"
  ],

  // Quantum Protocols - needs brands
  "Quantum Protocols": [
    "QuantumForge™", "ProtocolCore™", "QuantumFlow™", "ProtocolSync™", "QuantumVault™",
    "QuantumHub™", "ProtocolFlow™", "QuantumMaster™", "ProtocolVault™", "QuantumSync™"
  ],

  // Ritual & Culture - needs brands
  "Ritual & Culture": [
    "CultureForge™", "RitualCore™", "CultureFlow™", "TraditionSync™", "CultureVault™",
    "RitualHub™", "CultureMaster™", "TraditionFlow™", "RitualFlow™", "CultureSync™"
  ],

  // Sponsorship Management - needs brands
  "Sponsorship Management": [
    "SponsorForge™", "SponsorCore™", "SponsorFlow™", "SponsorSync™", "SponsorVault™", "SponsorHub™"
  ],

  // Talent Development - needs brands
  "Talent Development": [
    "TalentForge™", "DevCore™", "TalentFlow™", "SkillSync™", "TalentVault™", "DevHub™"
  ],

  // Trade Systems - needs brands
  "Trade Systems": [
    "TradeForge™", "CommerceCore™", "TradeFlow™", "MarketSync™", "TradeVault™",
    "CommerceHub™", "TradeCore™", "MarketFlow™", "TradeMaster™", "CommerceFlow™"
  ],

  // Utilities & Energy - needs brands
  "Utilities & Energy": [
    "EnergyForge™", "UtilityCore™", "PowerFlow™", "EnergySync™", "UtilityVault™",
    "PowerHub™", "EnergyFlow™", "UtilityMaster™", "PowerCore™", "EnergyVault™"
  ],

  // Voice & Audio - needs brands
  "Voice & Audio": [
    "VoiceForge™", "AudioCore™", "VoiceFlow™", "AudioSync™", "VoiceVault™",
    "AudioHub™", "VoiceMaster™", "AudioFlow™", "VoiceCore™", "AudioVault™"
  ],

  // Webless Tech & Nodes - needs brands
  "Webless Tech & Nodes": [
    "NodeForge™", "TechCore™", "NodeFlow™", "WeblessSync™", "NodeVault™",
    "TechHub™", "NodeMaster™", "TechFlow™", "WeblessCore™", "TechVault™"
  ],

  // Fashion & Identity - needs brands
  "Fashion & Identity": [
    "FashionForge™", "StyleCore™", "FashionFlow™", "StyleSync™", "FashionVault™",
    "StyleHub™", "FashionMaster™", "StyleFlow™", "IdentityCore™", "FashionCore™"
  ]
};

async function seedComprehensiveBrands() {
  console.log('🌱 Starting comprehensive brand seeding...');

  try {
    // Get all sectors from database
    const allSectors = await db.select().from(sectors);
    console.log(`📊 Found ${allSectors.length} sectors in database`);

    // Process each sector that needs brands
    for (const sector of allSectors) {
      const sectorName = sector.name.replace(/^[🌱🏦📦🧾🔑🔁⛏️🖋️♻️🎪🎬🌟🤝🪙🌐⚙️🦁🥦🔋✂📡🧠🎮📚🏗️⚖📖☰🎙️✿✴️☯🧺🧭👥💡🔧🎯🔮🛡️⚗️🎨🎵🔬💰🌍📱💎🎪]/g, '').trim();
      
      const brandNames = comprehensiveBrandData[sectorName];
      if (!brandNames) {
        console.log(`⚠️  No brand data found for sector: ${sectorName}`);
        continue;
      }

      // Check if sector already has brands
      const existingBrands = await db.select()
        .from(brands)
        .where(eq(brands.sectorId, sector.id));

      if (existingBrands.length > 0) {
        console.log(`✅ Sector "${sectorName}" already has ${existingBrands.length} brands, skipping...`);
        continue;
      }

      console.log(`🏗️  Creating ${brandNames.length} brands for sector: ${sectorName}`);

      // Create core brands for this sector
      const corebrands = [];
      for (let i = 0; i < brandNames.length; i++) {
        const brandName = brandNames[i];
        
        const newBrand = await db.insert(brands).values({
          name: brandName,
          description: `Advanced ${brandName} ${sectorName.toLowerCase()} & resource management with comprehensive VaultMesh™ integration and legal compliance for secure ${sectorName.toLowerCase()} ecosystem.`,
          sectorId: sector.id,
          integration: 'VaultMesh™', // Required field
          status: 'active',
          isCore: true,
          metadata: {
            category: sectorName,
            features: [`${brandName} Core`, `${brandName} Analytics`, `${brandName} Security`],
            integrations: ['VaultMesh™', 'SecureSign™', 'PulseTrade™'],
            tier: i < 3 ? 'A+' : i < 6 ? 'A' : 'B+',
            pricing: i < 3 ? 199.99 : i < 6 ? 149.99 : 99.99
          }
        }).returning();

        corebrands.push(newBrand[0]);
      }

      // Create 2-3 subnodes for each core brand
      for (const coreBrand of corebrands) {
        const subnodeCount = Math.floor(Math.random() * 2) + 2; // 2-3 subnodes
        for (let j = 0; j < subnodeCount; j++) {
          await db.insert(brands).values({
            name: `${coreBrand.name.replace('™', '')} Node ${j + 1}™`,
            description: `Specialized ${coreBrand.name} subnode for enhanced ${sectorName.toLowerCase()} operations.`,
            sectorId: sector.id,
            parentId: coreBrand.id,
            integration: 'HotStack', // Required field for subnodes
            status: 'active',
            isCore: false,
            metadata: {
              category: `${sectorName} - Subnode`,
              parentBrand: coreBrand.name,
              nodeType: 'processing',
              tier: 'B',
              pricing: 49.99
            }
          });
        }
      }

      console.log(`✅ Created ${brandNames.length} core brands + subnodes for ${sectorName}`);
    }

    console.log('🎉 Comprehensive brand seeding completed successfully!');
    
    // Update brand counts for all sectors
    console.log('📊 Updating sector brand counts...');
    for (const sector of allSectors) {
      const brandCount = await db.select().from(brands)
        .where(eq(brands.sectorId, sector.id));
      
      const coreCount = brandCount.filter(b => !b.parentId).length;
      const subnodeCount = brandCount.filter(b => b.parentId).length;
      
      await db.update(sectors)
        .set({ 
          brandCount: coreCount,
          subnodeCount: subnodeCount 
        })
        .where(eq(sectors.id, sector.id));
    }
    
    console.log('✅ All sector brand counts updated!');
    
  } catch (error) {
    console.error('❌ Error during brand seeding:', error);
    throw error;
  }
}

// Run the seeder
seedComprehensiveBrands()
  .then(() => {
    console.log('🚀 Brand seeding process completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Brand seeding failed:', error);
    process.exit(1);
  });