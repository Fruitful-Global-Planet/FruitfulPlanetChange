
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Database, 
  RefreshCw, 
  Layers, 
  Building2, 
  FileText, 
  Activity,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface SidebarSyncProps {
  onSectionSelect: (section: string) => void;
  activeSection: string;
}

export function EnhancedSidebar({ onSectionSelect, activeSection }: SidebarSyncProps) {
  // Database sync status queries
  const { data: sectors = [], isLoading: sectorsLoading } = useQuery({
    queryKey: ['sectors'],
    queryFn: async () => {
      const response = await fetch('/api/sectors');
      return response.json();
    }
  });

  const { data: brands = [], isLoading: brandsLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const response = await fetch('/api/brands');
      return response.json();
    }
  });

  const { data: dashboardStats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/stats');
      return response.json();
    }
  });

  const { data: legalDocs = [], isLoading: docsLoading } = useQuery({
    queryKey: ['legal-documents'],
    queryFn: async () => {
      const response = await fetch('/api/legal-documents');
      return response.json();
    }
  });

  const sections = [
    {
      id: 'sectors',
      label: 'Sectors',
      icon: Layers,
      count: sectors.length,
      isLoading: sectorsLoading,
      status: sectors.length > 0 ? 'synced' : 'pending'
    },
    {
      id: 'brands',
      label: 'Brands',
      icon: Building2,
      count: brands.length,
      isLoading: brandsLoading,
      status: brands.length > 0 ? 'synced' : 'pending'
    },
    {
      id: 'legal',
      label: 'Legal Documents',
      icon: FileText,
      count: legalDocs.length,
      isLoading: docsLoading,
      status: legalDocs.length > 0 ? 'synced' : 'pending'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: Activity,
      count: dashboardStats?.totalElements || 0,
      isLoading: statsLoading,
      status: dashboardStats?.totalElements > 0 ? 'synced' : 'pending'
    }
  ];

  const forceSync = async () => {
    try {
      await fetch('/api/sync/force-refresh', { method: 'POST' });
      window.location.reload();
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  return (
    <div className="w-80 bg-slate-50 border-r border-slate-200 p-6 space-y-6">
      {/* Database Status Header */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-800">Database Sync</h3>
          </div>
          <Button size="sm" variant="outline" onClick={forceSync}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Total Elements:</span>
            <Badge variant="secondary">{dashboardStats?.totalElements || 0}</Badge>
          </div>
          <div className="flex justify-between">
            <span>Active Sectors:</span>
            <Badge variant="secondary">{sectors.length}</Badge>
          </div>
          <div className="flex justify-between">
            <span>Sync Status:</span>
            <Badge variant={brands.length > 0 ? "default" : "destructive"}>
              {brands.length > 0 ? "Connected" : "Disconnected"}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Navigation Sections */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-slate-600 uppercase tracking-wide">
          Sections
        </h4>
        
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionSelect(section.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
              activeSection === section.id
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <section.icon className="w-5 h-5" />
              <span className="font-medium">{section.label}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {section.isLoading ? '...' : section.count}
              </Badge>
              {section.status === 'synced' ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Quick Stats */}
      <Card className="p-4">
        <h4 className="font-medium text-slate-800 mb-3">Quick Stats</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Core Brands:</span>
            <span className="font-medium">{dashboardStats?.coreBrands || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Sub-nodes:</span>
            <span className="font-medium">{dashboardStats?.subNodes || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Market Penetration:</span>
            <span className="font-medium">{dashboardStats?.marketPenetration || 0}%</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
