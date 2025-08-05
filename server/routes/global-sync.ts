import type { Express } from "express";
import { GlobalBrandSyncManager } from "../services/global-brand-sync-manager";

export function registerGlobalSyncRoutes(app: Express) {
  
  // Global brand synchronization endpoint
  app.get('/api/global-sync/brands', async (req, res) => {
    try {
      const { includeHierarchy, specialSection, sectorId } = req.query;
      
      if (specialSection === 'fruitful-crate-dance') {
        const fruitfulBrands = GlobalBrandSyncManager.getFruitfulCrateDanceBrands();
        return res.json({
          section: 'fruitful-crate-dance',
          brands: fruitfulBrands,
          count: fruitfulBrands.length
        });
      }
      
      if (sectorId) {
        const sectorBrands = GlobalBrandSyncManager.getBrandsBySector(parseInt(sectorId as string));
        return res.json({
          sectorId: parseInt(sectorId as string),
          brands: sectorBrands,
          count: sectorBrands.length
        });
      }
      
      if (includeHierarchy === 'true') {
        const hierarchy = GlobalBrandSyncManager.getAllBrandsWithHierarchy();
        return res.json({
          coreBrands: hierarchy.coreBrands,
          subnodes: hierarchy.subnodes,
          specialSections: hierarchy.specialSections,
          counts: {
            total: hierarchy.coreBrands.length + hierarchy.subnodes.length,
            core: hierarchy.coreBrands.length,
            subnodes: hierarchy.subnodes.length
          }
        });
      }
      
      // Default: return all brands flat
      const { coreBrands, subnodes } = GlobalBrandSyncManager.getAllBrandsWithHierarchy();
      const allBrands = [...coreBrands, ...subnodes];
      
      res.json({
        brands: allBrands,
        total: allBrands.length,
        metrics: GlobalBrandSyncManager.getSyncMetrics()
      });
      
    } catch (error) {
      console.error("Error in global brand sync:", error);
      res.status(500).json({ 
        message: "Global brand synchronization failed",
        error: error.message 
      });
    }
  });

  // Cross-reference data endpoint
  app.get('/api/global-sync/cross-references', async (req, res) => {
    try {
      const { type } = req.query;
      const crossRefs = GlobalBrandSyncManager.getCrossReferences(type as string);
      
      res.json({
        crossReferences: crossRefs,
        count: crossRefs.length,
        types: [...new Set(crossRefs.map(ref => ref.type))]
      });
      
    } catch (error) {
      console.error("Error fetching cross-references:", error);
      res.status(500).json({ 
        message: "Failed to fetch cross-references",
        error: error.message 
      });
    }
  });

  // Comprehensive sync metrics endpoint
  app.get('/api/global-sync/metrics', async (req, res) => {
    try {
      const metrics = await GlobalBrandSyncManager.performGlobalSync();
      
      res.json({
        timestamp: new Date().toISOString(),
        status: 'synchronized',
        metrics,
        performance: {
          lastSync: metrics.lastSync,
          integrityScore: metrics.integrityScore,
          crossReferences: metrics.crossReferences
        }
      });
      
    } catch (error) {
      console.error("Error in sync metrics:", error);
      res.status(500).json({ 
        message: "Failed to generate sync metrics",
        error: error.message 
      });
    }
  });

  // Brand search endpoint
  app.get('/api/global-sync/search', async (req, res) => {
    try {
      const { q, section, integration } = req.query;
      
      if (!q) {
        return res.status(400).json({ message: "Search query required" });
      }
      
      let results = GlobalBrandSyncManager.searchBrands(q as string);
      
      // Filter by section if specified
      if (section) {
        results = results.filter(brand => brand.specialSection === section);
      }
      
      // Filter by integration if specified
      if (integration) {
        results = results.filter(brand => brand.integration === integration);
      }
      
      res.json({
        query: q,
        results,
        count: results.length,
        filters: { section, integration }
      });
      
    } catch (error) {
      console.error("Error in brand search:", error);
      res.status(500).json({ 
        message: "Brand search failed",
        error: error.message 
      });
    }
  });

  // Special sections endpoint
  app.get('/api/global-sync/special-sections', async (req, res) => {
    try {
      const { coreBrands, subnodes, specialSections } = GlobalBrandSyncManager.getAllBrandsWithHierarchy();
      
      const sectionStats = Object.entries(specialSections).map(([section, brands]) => ({
        section,
        brands,
        count: brands.length,
        coreCount: brands.filter(b => b.isCore).length,
        subnodeCount: brands.filter(b => !b.isCore).length
      }));
      
      res.json({
        sections: sectionStats,
        totalSections: Object.keys(specialSections).length,
        summary: {
          'fruitful-crate-dance': specialSections['fruitful-crate-dance']?.length || 0,
          'fruitful-smart-toys': specialSections['fruitful-smart-toys']?.length || 0
        }
      });
      
    } catch (error) {
      console.error("Error fetching special sections:", error);
      res.status(500).json({ 
        message: "Failed to fetch special sections",
        error: error.message 
      });
    }
  });

  // Initialize global sync endpoint
  app.post('/api/global-sync/initialize', async (req, res) => {
    try {
      console.log('🔄 Initializing global brand synchronization...');
      
      await GlobalBrandSyncManager.initializeGlobalSync();
      const metrics = GlobalBrandSyncManager.getSyncMetrics();
      
      res.json({
        success: true,
        message: 'Global brand synchronization initialized successfully',
        metrics,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error("Error initializing global sync:", error);
      res.status(500).json({ 
        success: false,
        message: "Failed to initialize global synchronization",
        error: error.message 
      });
    }
  });
}