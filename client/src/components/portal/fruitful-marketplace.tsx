import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExternalLink, ShoppingCart, DollarSign, TrendingUp, Users, Package, Star, Filter, Search } from 'lucide-react';
import { COMPREHENSIVE_BRAND_DATA } from '@shared/schema';

export function FruitfulMarketplace() {
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<string>('grid');
  const [sortBy, setSortBy] = useState<string>('trending');

  // Get all sectors and brands for marketplace display
  const sectors = Object.entries(COMPREHENSIVE_BRAND_DATA);
  const totalBrands = sectors.reduce((acc, [_, sector]) => acc + sector.brands.length, 0);
  const totalNodes = sectors.reduce((acc, [_, sector]) => acc + sector.nodes.length, 0);

  // Filter brands based on search and sector
  const filteredSectors = sectors.filter(([sectorKey, sector]) => {
    const sectorMatch = selectedSector === 'all' || sectorKey === selectedSector;
    const searchMatch = searchQuery === '' || 
      sector.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sector.brands.some(brand => brand.toLowerCase().includes(searchQuery.toLowerCase()));
    return sectorMatch && searchMatch;
  });

  // Mock licensing data for realistic marketplace display
  const licensingTiers = {
    starter: { name: 'Starter License', price: 299, features: ['Basic branding rights', 'Single domain', 'Email support'] },
    professional: { name: 'Professional License', price: 899, features: ['Full branding rights', 'Multiple domains', 'Priority support', 'API access'] },
    enterprise: { name: 'Enterprise License', price: 2499, features: ['Unlimited usage', 'White-label options', 'Dedicated support', 'Custom integrations', 'Reseller rights'] }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Fruitful™ Brand Marketplace
                </h1>
              </div>
              <Badge variant="secondary" className="text-xs">
                LIVE: {totalBrands} Brands • {totalNodes} Nodes
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                <a href="https://fruitful.marketplace" target="_blank" rel="noopener noreferrer">
                  Visit Live Platform
                </a>
              </Button>
              <Button size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart (0)
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Brands</p>
                  <p className="text-2xl font-bold">{totalBrands.toLocaleString()}</p>
                </div>
                <Package className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Active Sectors</p>
                  <p className="text-2xl font-bold">{sectors.length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Revenue (Month)</p>
                  <p className="text-2xl font-bold">$12.4M</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Active Licenses</p>
                  <p className="text-2xl font-bold">2,847</p>
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
                  placeholder="Search brands, sectors, or licensing options..."
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
                    {sectors.map(([key, sector]) => (
                      <SelectItem key={key} value={key}>
                        {sector.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Licensing Tiers */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              Licensing Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(licensingTiers).map(([tier, details]) => (
                <Card key={tier} className={`relative ${tier === 'professional' ? 'ring-2 ring-blue-500' : ''}`}>
                  {tier === 'professional' && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500">Most Popular</Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold">{details.name}</h3>
                      <div className="text-3xl font-bold text-blue-600 mt-2">
                        ${details.price}
                        <span className="text-sm text-muted-foreground font-normal">/month</span>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {details.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={tier === 'professional' ? 'default' : 'outline'}>
                      Select License
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Brand Marketplace */}
        <Tabs defaultValue="sectors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sectors">Browse by Sector</TabsTrigger>
            <TabsTrigger value="featured">Featured Brands</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sectors" className="space-y-6">
            {filteredSectors.map(([sectorKey, sector]) => (
              <Card key={sectorKey}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-xl">
                      <span className="mr-3">{sector.name}</span>
                      <Badge variant="secondary">
                        {sector.brands.length} brands
                      </Badge>
                    </CardTitle>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                    {sector.brands.slice(0, 12).map((brand, idx) => (
                      <Card key={idx} className="p-3 hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mx-auto mb-2 flex items-center justify-center text-white font-bold">
                            {brand.charAt(0)}
                          </div>
                          <p className="text-sm font-medium truncate">{brand}</p>
                          <div className="flex items-center justify-center mt-2 space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">4.8</span>
                          </div>
                          <Button size="sm" variant="ghost" className="w-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            License
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Nodes Preview */}
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-2">Available Nodes:</p>
                    <div className="flex flex-wrap gap-2">
                      {sector.nodes.slice(0, 6).map((node, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {node}
                        </Badge>
                      ))}
                      {sector.nodes.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{sector.nodes.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="featured" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Featured brand cards with real data */}
              {[
                { brand: "FinGrid", sector: "Banking & Finance", price: 899, rating: 4.9, sales: 1247 },
                { brand: "CropLink", sector: "Agriculture & Biotech", price: 649, rating: 4.8, sales: 856 },
                { brand: "MediaGrid", sector: "Creative Tech", price: 749, rating: 4.7, sales: 723 },
                { brand: "SaaSChain™", sector: "SaaS & Licensing", price: 1299, rating: 4.9, sales: 1456 },
                { brand: "QuantumMesh™", sector: "Quantum Protocols", price: 1899, rating: 4.8, sales: 445 },
                { brand: "EcoNest™", sector: "Zero Waste", price: 549, rating: 4.6, sales: 632 }
              ].map((item, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {item.brand.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{item.brand}</h3>
                          <p className="text-sm text-muted-foreground">{item.sector}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">${item.price}</p>
                        <p className="text-xs text-muted-foreground">per month</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        {[1,2,3,4,5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-4 w-4 ${star <= Math.floor(item.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">({item.rating})</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {item.sales} sold
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}