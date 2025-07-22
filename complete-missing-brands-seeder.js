// Complete Missing Brands Seeder - Fill all empty sectors with proper brands
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

// Enhanced brand data for empty sectors
const sectorBrandMappings = {
  // Zero Waste sector
  "Zero Waste": [
    "WasteForge™", "RecycleCore™", "ZeroFlow™", "CleanSync™", "GreenVault™",
    "EcoFlow™", "WasteMaster™", "RecycleFlow™", "CleanCore™", "GreenSync™"
  ],
  
  // Event Management
  "Event Management": [
    "EventForge™", "PlanCore™", "VenueFlow™", "EventSync™", "CelebrationVault™",
    "PartyFlow™", "EventMaster™", "GatheringCore™", "OccasionSync™", "FestivalFlow™"
  ],
  
  // Content Creation
  "Content Creation": [
    "ContentForge™", "CreativeCore™", "MediaFlow™", "StorySync™", "DesignVault™",
    "VideoFlow™", "AudioCore™", "GraphicSync™", "ContentMaster™", "CreativeFlow™"
  ],
  
  // Talent Development
  "Talent Development": [
    "TalentForge™", "SkillCore™", "DevFlow™", "TalentSync™", "SkillVault™",
    "TrainingFlow™", "TalentMaster™", "DevCore™", "SkillSync™", "TalentFlow™"
  ],
  
  // Payroll Mining & Accounting
  "Payroll Mining & Accounting": [
    "PayrollForge™", "AccountCore™", "PayFlow™", "TaxSync™", "PayVault™",
    "SalaryFlow™", "BenefitCore™", "PayrollSync™", "AccountFlow™"
  ],
  
  // Global Brand Index
  "Global Brand Index": [
    "IndexForge™", "BrandCore™", "GlobalFlow™", "IndexSync™"
  ],
  
  // Admin Panel
  "Admin Panel": [
    "AdminForge™", "PanelCore™", "ControlFlow™", "AdminSync™", "ManageVault™"
  ],
  
  // Wildlife & Habitat
  "Wildlife & Habitat": [
    "WildForge™", "HabitatCore™", "EcoFlow™", "WildSync™", "NatureVault™",
    "ConservationFlow™", "WildlifeMaster™", "EcoCore™", "HabitatFlow™", "BiodiversitySync™",
    "WildlifeFlow™", "EcoSync™", "ConservationCore™"
  ],
  
  // Sponsorship Management
  "Sponsorship Management": [
    "SponsorForge™", "PartnerCore™", "SponsorFlow™", "DealSync™", "SponsorVault™", "PartnerFlow™"
  ],
  
  // Voice & Audio
  "Voice & Audio": [
    "VoiceForge™", "AudioCore™", "SoundFlow™", "VoiceSync™", "AudioVault™",
    "SonicFlow™", "VoiceMaster™", "AudioFlow™", "SoundCore™", "VoiceFlow™"
  ],
  
  // Webless Tech & Nodes
  "Webless Tech & Nodes": [
    "NodeForge™", "TechCore™", "WeblessFlow™", "NodeSync™", "TechVault™",
    "NetworkFlow™", "NodeMaster™", "TechFlow™", "WeblessCore™", "NodeFlow™"
  ],
  
  // Education & Youth
  "Education & Youth": [
    "YouthForge™", "EduCore™", "LearnFlow™", "StudentSync™", "EduVault™",
    "YouthFlow™", "LearnCore™", "StudentFlow™", "EduSync™", "YouthMaster™"
  ],
  
  // Education & IP
  "Education & IP": [
    "IPForge™", "LearnCore™", "PropertyFlow™", "IPSync™", "EduVault™",
    "PatentFlow™", "IPMaster™", "LearningFlow™", "PropertyCore™", "IPFlow™"
  ],
  
  // Gaming & Simulation
  "Gaming & Simulation": [
    "GameForge™", "SimCore™", "PlayFlow™", "GameSync™", "VirtualVault™",
    "SimFlow™", "GameMaster™", "PlayCore™", "VirtualFlow™", "GameFlow™"
  ],
  
  // Health & Hygiene
  "Health & Hygiene": [
    "HealthForge™", "HygieneCore™", "WellnessFlow™", "HealthSync™", "CareVault™",
    "MedFlow™", "HealthMaster™", "WellnessCore™", "HygieneFlow™", "CareFlow™"
  ],
  
  // Housing & Infrastructure
  "Housing & Infrastructure": [
    "BuildForge™", "HousingCore™", "ConstructFlow™", "BuildSync™", "InfraVault™",
    "StructureFlow™", "BuildMaster™", "HousingFlow™", "InfraCore™", "ConstructSync™"
  ],
  
  // Knowledge & Archives
  "Knowledge & Archives": [
    "KnowledgeForge™", "ArchiveCore™", "DataFlow™", "InfoSync™", "KnowledgeVault™",
    "LibraryFlow™", "ArchiveFlow™", "DataCore™", "InfoFlow™", "KnowledgeSync™"
  ],
  
  // Motion, Media & Sonic
  "Motion, Media & Sonic": [
    "MotionForge™", "MediaCore™", "SonicFlow™", "MotionSync™", "MediaVault™",
    "AudioFlow™", "MotionMaster™", "SonicCore™", "MediaFlow™", "MotionFlow™"
  ],
  
  // Utilities & Energy
  "Utilities & Energy": [
    "EnergyForge™", "UtilityCore™", "PowerFlow™", "EnergySync™", "UtilityVault™",
    "GridFlow™", "EnergyMaster™", "PowerCore™", "UtilityFlow™", "EnergyFlow™"
  ],
  
  // Dance & Movement
  "Dance & Movement": [
    "DanceForge™", "MoveCore™", "FlowMaster™", "DanceSync™", "MoveVault™",
    "RhythmFlow™", "DanceMaster™", "MovementCore™", "BeatFlow™", "DanceFlow™"
  ],
  
  // Music & Sound Design
  "Music & Sound Design": [
    "SoundForge™", "MusicCore™", "BeatFlow™", "SoundSync™", "MusicVault™",
    "AudioMaster™", "SoundFlow™", "MusicFlow™", "BeatCore™", "AudioFlow™"
  ],
  
  // Packaging & Materials
  "Packaging & Materials": [
    "PackForge™", "MaterialCore™", "PackFlow™", "MaterialSync™", "PackVault™",
    "ContainerFlow™", "PackMaster™", "MaterialFlow™", "PackCore™", "BoxFlow™"
  ],
  
  // Quantum Protocols
  "Quantum Protocols": [
    "QuantumForge™", "ProtocolCore™", "QuantumFlow™", "ProtocolSync™", "QuantumVault™",
    "QubitFlow™", "QuantumMaster™", "ProtocolFlow™", "QuantumCore™", "QubitSync™"
  ],
  
  // Trade Systems
  "Trade Systems": [
    "TradeForge™", "CommerceCore™", "MarketFlow™", "TradeSync™", "CommerceVault™",
    "TradeFlow™", "MarketCore™", "CommerceFLow™", "TradeMaster™", "MarketSync™"
  ],
  
  // Community Engagement
  "Community Engagement": [
    "CommunityForge™", "EngageCore™", "SocialFlow™", "CommunitySync™", "EngageVault™",
    "SocialMaster™", "CommunityFlow™", "EngageFlow™", "SocialCore™", "CommunityMaster™"
  ],
  
  // Tech Infrastructure
  "Tech Infrastructure": [
    "InfraForge™", "TechCore™", "SystemFlow™", "InfraSync™", "TechVault™",
    "ServerFlow™", "InfraMaster™", "TechFlow™", "SystemCore™", "InfraFlow™"
  ],
  
  // Logistics & Operations
  "Logistics & Operations": [
    "LogiForge™", "OpsCore™", "LogiFlow™", "OpsSync™", "LogiVault™",
    "SupplyFlow™", "LogiMaster™", "OpsFlow™", "LogiCore™", "OperationsFlow™"
  ],
  
  // Financial Management
  "Financial Management": [
    "FinanceForge™", "MoneyCore™", "FinFlow™", "FinanceSync™", "MoneyVault™",
    "CashFlow™", "FinanceMaster™", "MoneyFlow™", "FinCore™", "InvestFlow™"
  ],
  
  // Marketing & Branding
  "Marketing & Branding": [
    "BrandForge™", "MarketCore™", "BrandFlow™", "MarketSync™", "BrandVault™",
    "CampaignFlow™", "BrandMaster™", "MarketFlow™", "BrandCore™", "MarketingFlow™"
  ],
  
  // Partnership & Collaboration
  "Partnership & Collaboration": [
    "PartnerForge™", "CollabCore™", "PartnerFlow™", "CollabSync™", "PartnerVault™"
  ],
  
  // Analytics & Insights
  "Analytics & Insights": [
    "DataForge™", "AnalyticsCore™", "InsightFlow™", "DataSync™", "AnalyticsVault™",
    "MetricFlow™", "DataMaster™", "InsightCore™", "AnalyticsFlow™", "DataFlow™"
  ],
  
  // Sustainability & Impact
  "Sustainability & Impact": [
    "SustainForge™", "ImpactCore™", "GreenFlow™", "SustainSync™", "ImpactVault™",
    "EcoMaster™", "SustainFlow™", "ImpactFlow™", "GreenCore™", "SustainMaster™"
  ]
};

async function seedMissingBrands() {
  console.log('🌱 Starting missing brands seeding...');

  try {
    // Get all sectors with 0 brands
    const emptySectors = await db.select({
      id: sectors.id,
      name: sectors.name,
      brandCount: sectors.brandCount
    }).from(sectors);

    console.log(`📊 Found ${emptySectors.length} sectors to check`);

    for (const sector of emptySectors) {
      // Check if sector has any brands
      const existingBrands = await db.select().from(brands)
        .where(eq(brands.sectorId, sector.id));

      if (existingBrands.length > 0) {
        console.log(`✅ Sector "${sector.name}" already has ${existingBrands.length} brands, skipping...`);
        continue;
      }

      // Clean sector name to match our mapping
      const cleanName = sector.name.replace(/^[🌱🏦📦🧾🔑🔁⛏️🖋️♻️🎪🎬🌟🤝🪙🌐⚙️🦁🥦🔋✂📡🧠🎮📚🏗️⚖📖☰🎙️✿✴️☯🧺🧭👥💡🔧🎯🔮🛡️⚗️🎨🎵🔬💰🌍📱💎🎪]\s*/g, '').trim();
      
      const brandNames = sectorBrandMappings[cleanName];
      if (!brandNames) {
        console.log(`⚠️  No brand mapping found for: "${cleanName}" (original: "${sector.name}")`);
        continue;
      }

      console.log(`🏗️  Creating ${brandNames.length} brands for sector: ${cleanName}`);

      // Create core brands
      const corebrands = [];
      for (let i = 0; i < brandNames.length; i++) {
        const brandName = brandNames[i];
        
        const newBrand = await db.insert(brands).values({
          name: brandName,
          description: `Advanced ${brandName} ${cleanName.toLowerCase()} management system with comprehensive VaultMesh™ integration and operational excellence.`,
          sectorId: sector.id,
          integration: 'VaultMesh™',
          status: 'active',
          isCore: true,
          metadata: {
            category: cleanName,
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
            description: `Specialized ${coreBrand.name} subnode for enhanced ${cleanName.toLowerCase()} operations.`,
            sectorId: sector.id,
            parentId: coreBrand.id,
            integration: 'HotStack',
            status: 'active',
            isCore: false,
            metadata: {
              category: `${cleanName} - Subnode`,
              parentBrand: coreBrand.name,
              nodeType: 'processing',
              tier: 'B',
              pricing: 49.99
            }
          });
        }
      }

      // Update sector brand count
      const allBrands = await db.select().from(brands)
        .where(eq(brands.sectorId, sector.id));
      
      const coreCount = allBrands.filter(b => !b.parentId).length;
      const subnodeCount = allBrands.filter(b => b.parentId).length;
      
      await db.update(sectors)
        .set({ 
          brandCount: coreCount,
          subnodeCount: subnodeCount 
        })
        .where(eq(sectors.id, sector.id));

      console.log(`✅ Created ${coreCount} core brands + ${subnodeCount} subnodes for ${cleanName}`);
    }

    console.log('🎉 Missing brands seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during missing brands seeding:', error);
    throw error;
  }
}

// Run the seeder
seedMissingBrands()
  .then(() => {
    console.log('🚀 Missing brands seeding process completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Missing brands seeding failed:', error);
    process.exit(1);
  });