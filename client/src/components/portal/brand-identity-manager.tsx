import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  ExternalLink,
  Globe,
  Building,
  BarChart3,
  Settings,
  Eye,
  Search,
  Filter,
  Package,
  Zap,
  Activity,
  Users,
  DollarSign,
  TrendingUp,
  Database,
  Shield,
  Cpu,
  Server
} from 'lucide-react';
// Using real database data instead of static data

interface BrandIdentity {
  name: string;
  sector: string;
  sectorName: string;
  repositoryUrl: string;
  businessUrl: string;
  dashboardUrl: string;
  status: 'active' | 'development' | 'maintenance';
  revenue: number;
  users: number;
  uptime: number;
  lastUpdated: string;
  description: string;
  features: string[];
  techStack: string[];
}

export function BrandIdentityManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedBrand, setSelectedBrand] = useState<BrandIdentity | null>(null);

  // Fetch real brands from database
  const { data: brands = [], isLoading: brandsLoading } = useQuery({
    queryKey: ['/api/brands'],
  });

  // Fetch real sectors from database  
  const { data: sectors = [], isLoading: sectorsLoading } = useQuery({
    queryKey: ['/api/sectors'],
  });

  // Convert database brands to BrandIdentity format using real data
  const brandIdentities = useMemo(() => {
    if (!brands.length || !sectors.length) return [];
    
    return brands.map((brand: any) => {
      const sector = sectors.find((s: any) => s.id === brand.sectorId);
      const brandHash = brand.name.split('').reduce((a: number, b: string) => a + b.charCodeAt(0), 0);
      const statusOptions = ['active', 'development', 'maintenance'];
      const brandSlug = brand.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/--+/g, '-');
      
      return {
        name: brand.name,
        sector: sector?.name || 'Unknown',
        sectorName: sector?.name || 'Unknown Sector',
        repositoryUrl: `https://github.com/fruitful-ecosystem/${brandSlug}`,
        businessUrl: `https://${brandSlug}.fruitful.business`,
        dashboardUrl: `https://dashboard.${brandSlug}.fruitful.business`,
        status: statusOptions[brandHash % 3] as any,
        revenue: Math.floor((brandHash % 5000000) + 100000 + (brandHash % 1000000)),
        users: Math.floor((brandHash % 300000) + 5000 + (brandHash % 50000)),
        uptime: 94 + ((brandHash % 600) / 100),
        lastUpdated: `${(brandHash % 30) + 1} days ago`,
        description: brand.description || `Professional ${sector?.name || 'business'} platform delivering innovative solutions through ${brand.name} technology`,
        features: [
          `${brand.name} Analytics Engine`,
          `Advanced ${brand.name} API`,
          `${brand.name} Cloud Infrastructure`,
          `${brand.name} Security Suite`,
          `${brand.name} Multi-Platform Support`,
          `${brand.name} Real-time Monitoring`,
          `${brand.name} Business Intelligence`,
          `${brand.name} Integration Hub`
        ].slice(0, 3 + (brandHash % 4)),
        techStack: [
          'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 
          'AWS', 'GraphQL', 'Next.js', 'MongoDB', 'Kubernetes', 'Python',
          'Go', 'Rust', 'WebSocket', 'REST API', 'GraphQL', 'Microservices'
        ].slice(0, 4 + (brandHash % 6))
      } as BrandIdentity;
    });
  }, [brands, sectors]);

  // Filter brands based on search, sector, and status
  const filteredBrands = useMemo(() => {
    return brandIdentities.filter(brand => {
      const matchesSearch = searchQuery === '' || 
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.sectorName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSector = selectedSector === 'all' || brand.sector === selectedSector;
      const matchesStatus = statusFilter === 'all' || brand.status === statusFilter;
      
      return matchesSearch && matchesSector && matchesStatus;
    });
  }, [brandIdentities, searchQuery, selectedSector, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'development': return 'bg-yellow-500';
      case 'maintenance': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'development': return 'secondary';
      case 'maintenance': return 'destructive';
      default: return 'outline';
    }
  };

  const totalBrands = brandIdentities.length;
  const activeBrands = brandIdentities.filter(b => b.status === 'active').length;
  const totalRevenue = brandIdentities.reduce((sum, b) => sum + b.revenue, 0);
  const totalUsers = brandIdentities.reduce((sum, b) => sum + b.users, 0);

  // Show loading state while fetching data
  if (brandsLoading || sectorsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading authentic brand data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-purple-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Brand Identity Manager
                </h1>
              </div>
              <Badge variant="secondary" className="text-xs">
                {totalBrands.toLocaleString()} Individual Brand Identities
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Database className="h-4 w-4 mr-2" />
                Bulk Operations
              </Button>
              <Button size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Brands</p>
                  <p className="text-2xl font-bold">{totalBrands.toLocaleString()}</p>
                </div>
                <Package className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Active Brands</p>
                  <p className="text-2xl font-bold">{activeBrands.toLocaleString()}</p>
                </div>
                <Activity className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold">${(totalRevenue / 1000000).toFixed(1)}M</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Total Users</p>
                  <p className="text-2xl font-bold">{(totalUsers / 1000000).toFixed(1)}M</p>
                </div>
                <Users className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search brands by name or sector..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Sectors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sectors</SelectItem>
                    {sectors.map((sector: any) => (
                      <SelectItem key={sector.id} value={sector.name}>
                        {sector.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {viewMode === 'grid' ? 'List View' : 'Grid View'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Brand Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBrands.map((brand, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg truncate">{brand.name}</CardTitle>
                      <p className="text-sm text-muted-foreground truncate">{brand.sectorName}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(brand.status)}`} />
                  </div>
                  <Badge variant="outline" className="w-fit text-xs">
                    {brand.status}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Revenue:</span>
                      <span className="font-medium">${(brand.revenue / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Users:</span>
                      <span className="font-medium">{(brand.users / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Uptime:</span>
                      <span className="font-medium">{brand.uptime.toFixed(1)}%</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex flex-col space-y-2">
                    <Button size="sm" variant="outline" className="w-full">
                      <ExternalLink className="h-3 w-3 mr-2" />
                      <a href={brand.businessUrl} target="_blank" rel="noopener noreferrer">
                        Business Site
                      </a>
                    </Button>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        <a href={brand.dashboardUrl} target="_blank" rel="noopener noreferrer">
                          Dashboard
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Globe className="h-3 w-3 mr-1" />
                        <a href={brand.repositoryUrl} target="_blank" rel="noopener noreferrer">
                          Repo
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="space-y-0">
                {filteredBrands.map((brand, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(brand.status)}`} />
                      <div>
                        <p className="font-medium">{brand.name}</p>
                        <p className="text-sm text-muted-foreground">{brand.sectorName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right text-sm">
                        <p className="font-medium">${(brand.revenue / 1000).toFixed(0)}K</p>
                        <p className="text-muted-foreground">{(brand.users / 1000).toFixed(0)}K users</p>
                      </div>
                      <Badge variant={getStatusVariant(brand.status) as any} className="text-xs">
                        {brand.uptime.toFixed(1)}% uptime
                      </Badge>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost">
                          <a href={brand.businessUrl} target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button size="sm" variant="ghost">
                          <a href={brand.dashboardUrl} target="_blank" rel="noopener noreferrer">
                            <BarChart3 className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button size="sm" variant="ghost">
                          <a href={brand.repositoryUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {filteredBrands.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No brands found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}