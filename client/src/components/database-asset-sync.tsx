
import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  Download,
  Upload
} from 'lucide-react';

interface AssetSyncStatus {
  name: string;
  type: 'sectors' | 'brands' | 'legal' | 'media' | 'analytics';
  count: number;
  lastSync: string;
  status: 'synced' | 'syncing' | 'error' | 'pending';
  endpoint: string;
}

export function DatabaseAssetSync() {
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const queryClient = useQueryClient();

  // Asset sync status tracking
  const assetTypes: AssetSyncStatus[] = [
    {
      name: 'Sectors',
      type: 'sectors',
      count: 0,
      lastSync: '',
      status: 'pending',
      endpoint: '/api/sectors'
    },
    {
      name: 'Brands',
      type: 'brands', 
      count: 0,
      lastSync: '',
      status: 'pending',
      endpoint: '/api/brands'
    },
    {
      name: 'Legal Documents',
      type: 'legal',
      count: 0,
      lastSync: '',
      status: 'pending', 
      endpoint: '/api/legal-documents'
    },
    {
      name: 'Analytics Data',
      type: 'analytics',
      count: 0,
      lastSync: '',
      status: 'pending',
      endpoint: '/api/dashboard/stats'
    }
  ];

  const [assets, setAssets] = useState<AssetSyncStatus[]>(assetTypes);

  // Complete sync status query
  const { data: completeSyncData, refetch: refetchSync } = useQuery({
    queryKey: ['complete-sync'],
    queryFn: async () => {
      const response = await fetch('/api/sync/complete-sync');
      return response.json();
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Update asset status based on queries
  useEffect(() => {
    if (completeSyncData?.data) {
      const updated = assets.map(asset => {
        const syncData = completeSyncData.data;
        switch (asset.type) {
          case 'sectors':
            return {
              ...asset,
              count: syncData.sectors?.count || 0,
              status: syncData.sectors?.count > 0 ? 'synced' : 'pending',
              lastSync: completeSyncData.timestamp
            };
          case 'brands':
            return {
              ...asset,
              count: syncData.brands?.count || 0,
              status: syncData.brands?.count > 0 ? 'synced' : 'pending',
              lastSync: completeSyncData.timestamp
            };
          case 'analytics':
            return {
              ...asset,
              count: syncData.brands?.totalRevenue ? 1 : 0,
              status: syncData.system?.status === 'connected' ? 'synced' : 'pending',
              lastSync: completeSyncData.timestamp
            };
          default:
            return asset;
        }
      });
      setAssets(updated);
    }
  }, [completeSyncData]);

  const performCompleteSync = async () => {
    setIsSyncing(true);
    setSyncProgress(0);

    try {
      // Step 1: Force refresh all data
      setSyncProgress(25);
      await fetch('/api/sync/force-refresh', { method: 'POST' });
      
      // Step 2: Invalidate all queries
      setSyncProgress(50);
      await queryClient.invalidateQueries();
      
      // Step 3: Refetch complete sync data
      setSyncProgress(75);
      await refetchSync();
      
      // Step 4: Complete
      setSyncProgress(100);
      
      setTimeout(() => {
        setIsSyncing(false);
        setSyncProgress(0);
      }, 1000);
      
    } catch (error) {
      console.error('Complete sync failed:', error);
      setIsSyncing(false);
      setSyncProgress(0);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'synced':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'syncing':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Database className="w-6 h-6 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Database Asset Sync</h3>
            <p className="text-sm text-slate-600">
              Real-time synchronization with 3,794+ brand elements
            </p>
          </div>
        </div>
        
        <Button 
          onClick={performCompleteSync}
          disabled={isSyncing}
          className="flex items-center gap-2"
        >
          {isSyncing ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {isSyncing ? 'Syncing...' : 'Complete Sync'}
        </Button>
      </div>

      {isSyncing && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Sync Progress</span>
            <span className="text-sm text-slate-600">{syncProgress}%</span>
          </div>
          <Progress value={syncProgress} className="h-2" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assets.map((asset) => (
          <div
            key={asset.type}
            className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
          >
            <div className="flex items-center gap-3">
              {getStatusIcon(asset.status)}
              <div>
                <h4 className="font-medium text-slate-800">{asset.name}</h4>
                <p className="text-sm text-slate-600">
                  {asset.count > 0 ? `${asset.count} items` : 'No data'}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <Badge 
                variant={asset.status === 'synced' ? 'default' : 'secondary'}
                className="mb-1"
              >
                {asset.status}
              </Badge>
              {asset.lastSync && (
                <p className="text-xs text-slate-500">
                  {new Date(asset.lastSync).toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Sync Statistics */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {completeSyncData?.data?.brands?.count || 0}
            </div>
            <div className="text-sm text-slate-600">Total Brands</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {completeSyncData?.data?.sectors?.count || 0}
            </div>
            <div className="text-sm text-slate-600">Active Sectors</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {completeSyncData?.performance?.responseTime?.toFixed(1) || 0}ms
            </div>
            <div className="text-sm text-slate-600">Response Time</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
