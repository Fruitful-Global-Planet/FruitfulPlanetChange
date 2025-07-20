// Legal document seeder for 24/7 synchronized data
import { storage } from "./storage"

export async function seedLegalDocuments() {
  console.log("🔏 Seeding legal documents for 24/7 sync...")
  
  const existingDocs = await storage.getLegalDocuments()
  if (existingDocs.length > 0) {
    console.log("✅ Legal documents already seeded, skipping...")
    return
  }

  const legalDocs = [
    {
      title: "Fruitful Holdings NDA",
      description: "Non-disclosure agreement for Fruitful Holdings operations and partnerships",
      url: "/legal-docs/fruitful-holdings-nda",
      category: "contracts",
      tags: ["nda", "contracts", "fruitful"],
      icon: "📄"
    },
    {
      title: "SecureSign™ Portal Documentation", 
      description: "Complete SecureSign™ NDA portal setup and integration guide",
      url: "/legal-docs/securesign-portal",
      category: "technical",
      tags: ["securesign", "portal", "technical"],
      icon: "🔒"
    },
    {
      title: "Seedwave™ Deployment Manual",
      description: "Comprehensive deployment manual for Seedwave™ portal infrastructure",
      url: "/legal-docs/seedwave-deployment", 
      category: "technical",
      tags: ["seedwave", "deployment", "manual"],
      icon: "🌱"
    },
    {
      title: "FAA Zone Meeting Minutes",
      description: "Minutes of meeting for FAA zone integration and setup",
      url: "/legal-docs/faa-zone-minutes",
      category: "minutes", 
      tags: ["faa", "meeting", "minutes"],
      icon: "✈️"
    },
    {
      title: "Firebase Core Minutes",
      description: "Firebase integration meeting notes and technical decisions",
      url: "/legal-docs/firebase-integration",
      category: "minutes",
      tags: ["firebase", "integration", "minutes"],
      icon: "🔥"
    },
    {
      title: "PayPal Integration Guide",
      description: "PayPal payment integration setup and configuration guide", 
      url: "/legal-docs/paypal-setup",
      category: "technical",
      tags: ["paypal", "integration", "payment"],
      icon: "💳"
    },
    {
      title: "Repository & Legal Hub Index",
      description: "Main index for repository management and legal documentation",
      url: "/legal-docs/repository-index",
      category: "index",
      tags: ["repository", "index", "legal"],
      icon: "📚"
    },
    {
      title: "CodeNest Settings & Configuration",
      description: "CodeNest development environment setup and configuration",
      url: "/legal-docs/codenest-settings", 
      category: "technical",
      tags: ["codenest", "configuration", "development"],
      icon: "⚙️"
    }
  ]

  for (const doc of legalDocs) {
    await storage.createLegalDocument(doc)
  }

  console.log(`✅ Seeded ${legalDocs.length} legal documents for 24/7 synchronized portal`)
}