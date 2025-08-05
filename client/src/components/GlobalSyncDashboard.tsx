import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useComprehensiveGlobalSync, useInitializeGlobalSync } from '@/hooks/useGlobalBrandSync';
import { RefreshCw, Database, Network, Zap } from 'lucide-react';

export function GlobalSyncDashboard() {
  const { 
    metrics, 
    brands, 
    fruitfulCrateDance, 
    crossReferences, 
    specialSections,
    isLoading, 
    hasError, 
    data 
  } = useComprehensiveGlobalSync();
  
  const initializeSync = useInitializeGlobalSync();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading global synchronization...</span>
      </div>
    );
  }

  if (hasError) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <p className="text-red-600">Error loading synchronization data</p>
          <Button 
            onClick={() => initializeSync.mutate()} 
            className="mt-4"
            variant="outline"
          >
            Retry Synchronization
          </Button>
        </CardContent>
      </Card>
    );
  }

  const metricsData = data.metrics?.metrics;
  const brandsData = data.brands;
  const fruitfulData = data.fruitfulCrateDance;

  return (
    <div className="space-y-6">
      {/* Global Sync Metrics Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-600" />
            Global Brand Synchronization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-blue-600">{metricsData?.totalBrands || 0}</div>
              <div className="text-sm text-gray-600">Total Brands</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-green-600">{metricsData?.coreBrands || 0}</div>
              <div className="text-sm text-gray-600">Core Brands</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-purple-600">{metricsData?.subnodes || 0}</div>
              <div className="text-sm text-gray-600">Subnodes</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-orange-600">{metricsData?.integrityScore || 0}%</div>
              <div className="text-sm text-gray-600">Integrity Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fruitful Crate Dance Section */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-600" />
            Fruitful Crate Dance Brands ({fruitfulData?.count || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fruitfulData?.brands?.map((brand: any) => (
              <div key={brand.id} className="p-4 bg-white rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{brand.name}</h4>
                  <Badge variant={brand.isCore ? "default" : "secondary"}>
                    {brand.isCore ? "Core" : "Subnode"}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  Integration: <span className="font-medium">{brand.integration}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Status: <span className="font-medium text-green-600">{brand.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cross-Reference System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-purple-600" />
            Cross-Reference System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">{metricsData?.crossReferences || 0}</div>
              <div className="text-sm text-gray-600">Active Cross-References</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{Object.keys(metricsData?.specialSections || {}).length}</div>
              <div className="text-sm text-gray-600">Special Sections</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">{metricsData?.fruitfulCrateDanceBrands || 0}</div>
              <div className="text-sm text-gray-600">Crate Dance Brands</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sync Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Synchronization Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={() => initializeSync.mutate()}
              disabled={initializeSync.isPending}
              variant="outline"
            >
              {initializeSync.isPending ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Initialize Global Sync
            </Button>
            
            <Button variant="outline">
              Export Sync Report
            </Button>
            
            <Button variant="outline">
              View Cross-References
            </Button>
          </div>
          
          <Separator className="my-4" />
          
          <div className="text-sm text-gray-600">
            <div>Last Sync: {metricsData?.lastSync ? new Date(metricsData.lastSync).toLocaleString() : 'Never'}</div>
            <div>System Status: <span className="text-green-600 font-medium">Operational</span></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default GlobalSyncDashboard;