import type { Express } from "express";
import { ExternalPortalIntegration, SolutionRequest } from "../services/external-portal-integration";
import { GlobalBrandSyncManager } from "../services/global-brand-sync-manager";

export function registerExternalPortalRoutes(app: Express) {
  
  /**
   * Solution request endpoint for external portals
   * Main integration point for Tshwane AI Research Portal
   */
  app.post('/api/external/solution-request', async (req, res) => {
    try {
      const solutionRequest: SolutionRequest = req.body;
      
      // Validate request
      if (!solutionRequest.category || !solutionRequest.portalSource) {
        return res.status(400).json({
          error: 'Missing required fields: category and portalSource'
        });
      }

      console.log(`🔍 External solution request: ${solutionRequest.category} from ${solutionRequest.portalSource}`);
      
      // Process the solution request
      const response = await ExternalPortalIntegration.processSolutionRequest(solutionRequest);
      
      res.json({
        success: true,
        data: response,
        metadata: {
          processingTime: Date.now(),
          brandCount: response.brandRecommendations.length,
          integrationTier: response.integrationTier
        }
      });
      
    } catch (error) {
      console.error('Error processing solution request:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to process solution request',
        message: error.message
      });
    }
  });

  /**
   * Housing solutions endpoint - specific for Tshwane housing needs
   */
  app.post('/api/external/housing-solutions', async (req, res) => {
    try {
      const { location, budget, housingType, urgency } = req.body;
      
      const solutionRequest: SolutionRequest = {
        category: 'housing',
        location,
        budget,
        requirements: [housingType || 'general'],
        urgency: urgency || 'medium',
        portalSource: 'tshwane-ai'
      };
      
      const response = await ExternalPortalIntegration.processSolutionRequest(solutionRequest);
      
      res.json({
        success: true,
        housing: {
          solutions: response.brandRecommendations,
          overview: response.solutionOverview,
          development: response.developmentPathway,
          confidence: response.confidenceScore
        },
        requestId: response.requestId
      });
      
    } catch (error) {
      console.error('Error processing housing solutions:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to process housing solutions request'
      });
    }
  });

  /**
   * Brand intelligence endpoint - provides brand data for external systems
   */
  app.get('/api/external/brand-intelligence', async (req, res) => {
    try {
      const { category, sector, integration } = req.query;
      
      // Get comprehensive brand data
      const brandData = GlobalBrandSyncManager.getAllBrandsWithHierarchy();
      const metrics = GlobalBrandSyncManager.getSyncMetrics();
      
      let filteredBrands = [...brandData.coreBrands, ...brandData.subnodes];
      
      // Apply filters
      if (sector) {
        filteredBrands = filteredBrands.filter(brand => 
          brand.sectorId === parseInt(sector as string)
        );
      }
      
      if (integration) {
        filteredBrands = filteredBrands.filter(brand => 
          brand.integration.toLowerCase().includes((integration as string).toLowerCase())
        );
      }
      
      res.json({
        brands: filteredBrands,
        specialSections: brandData.specialSections,
        metrics: {
          totalBrands: metrics.totalBrands,
          integrity: metrics.integrityScore,
          lastSync: metrics.lastSync
        },
        capabilities: {
          housingDevelopment: true,
          energyManagement: true,
          smartAgriculture: true,
          miningAnalytics: true,
          entertainmentTech: true
        }
      });
      
    } catch (error) {
      console.error('Error fetching brand intelligence:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch brand intelligence'
      });
    }
  });

  /**
   * Solution catalog endpoint - returns available solution categories
   */
  app.get('/api/external/solution-catalog', async (req, res) => {
    try {
      const catalog = ExternalPortalIntegration.getSolutionCatalog();
      const catalogData = {};
      
      catalog.forEach((solutions, category) => {
        catalogData[category] = solutions.map(solution => ({
          category: solution.category,
          description: solution.description,
          applications: solution.applications,
          timeframe: solution.timeframe,
          brandCount: solution.brands.length
        }));
      });
      
      res.json({
        catalog: catalogData,
        categories: Array.from(catalog.keys()),
        totalSolutions: Array.from(catalog.values()).flat().length,
        lastUpdated: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Error fetching solution catalog:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch solution catalog'
      });
    }
  });

  /**
   * Integration health check for external portals
   */
  app.get('/api/external/health', async (req, res) => {
    try {
      const metrics = GlobalBrandSyncManager.getSyncMetrics();
      
      res.json({
        status: 'operational',
        backend: {
          version: '1.0.0',
          type: 'brand-intelligence-engine',
          capabilities: ['solution-processing', 'brand-intelligence', 'development-pathways']
        },
        sync: {
          integrity: metrics.integrityScore,
          lastSync: metrics.lastSync,
          totalBrands: metrics.totalBrands
        },
        integrations: {
          tshwaneAI: 'ready',
          govPortals: 'ready',
          externalAPIs: 'ready'
        },
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Error in health check:', error);
      res.status(500).json({
        status: 'error',
        error: 'Health check failed'
      });
    }
  });

  /**
   * Batch processing endpoint for multiple solution requests
   */
  app.post('/api/external/batch-solutions', async (req, res) => {
    try {
      const { requests } = req.body;
      
      if (!Array.isArray(requests)) {
        return res.status(400).json({
          error: 'Requests must be an array'
        });
      }
      
      console.log(`📦 Processing batch of ${requests.length} solution requests`);
      
      const responses = await Promise.all(
        requests.map(async (request: SolutionRequest) => {
          try {
            return await ExternalPortalIntegration.processSolutionRequest(request);
          } catch (error) {
            return {
              error: `Failed to process request for ${request.category}`,
              originalRequest: request
            };
          }
        })
      );
      
      res.json({
        success: true,
        processed: responses.length,
        responses,
        batchId: `batch-${Date.now()}`,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Error processing batch solutions:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to process batch solutions'
      });
    }
  });

  /**
   * Development pathway tracking endpoint
   */
  app.get('/api/external/development-status/:requestId', async (req, res) => {
    try {
      const { requestId } = req.params;
      
      // In a real implementation, this would track actual project progress
      // For now, we return a mock status based on the request ID
      const mockStatus = {
        requestId,
        currentPhase: 'Infrastructure Setup',
        progress: 35,
        completedSteps: [
          'Requirement analysis completed',
          'Technical specifications approved',
          'Resource allocation confirmed'
        ],
        nextSteps: [
          'Integration framework setup',
          'Testing environment preparation',
          'Core infrastructure deployment'
        ],
        estimatedCompletion: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
        lastUpdated: new Date().toISOString()
      };
      
      res.json({
        success: true,
        status: mockStatus
      });
      
    } catch (error) {
      console.error('Error fetching development status:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch development status'
      });
    }
  });
}