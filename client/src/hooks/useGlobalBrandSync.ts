import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export interface BrandNode {
  id: number;
  name: string;
  sectorId: number;
  isCore: boolean;
  parentId?: number;
  children?: BrandNode[];
  integration: string;
  status: string;
  specialSection?: string;
}

export interface GlobalSyncMetrics {
  totalBrands: number;
  coreBrands: number;
  subnodes: number;
  fruitfulCrateDanceBrands: number;
  specialSections: Record<string, number>;
  crossReferences: number;
  lastSync: string;
  integrityScore: number;
}

/**
 * Hook for global brand synchronization metrics
 */
export function useGlobalSyncMetrics() {
  return useQuery({
    queryKey: ['global-sync', 'metrics'],
    queryFn: () => apiRequest('/api/global-sync/metrics'),
    refetchInterval: 30000, // Refresh every 30 seconds
    staleTime: 10000
  });
}

/**
 * Hook for all brands with hierarchy structure
 */
export function useGlobalBrands(includeHierarchy = false) {
  return useQuery({
    queryKey: ['global-sync', 'brands', { includeHierarchy }],
    queryFn: () => apiRequest(`/api/global-sync/brands?includeHierarchy=${includeHierarchy}`),
    staleTime: 60000
  });
}

/**
 * Hook for Fruitful Crate Dance section brands
 */
export function useFruitfulCrateDanceBrands() {
  return useQuery({
    queryKey: ['global-sync', 'brands', 'fruitful-crate-dance'],
    queryFn: () => apiRequest('/api/global-sync/brands?specialSection=fruitful-crate-dance'),
    staleTime: 60000
  });
}

/**
 * Hook for brands by sector
 */
export function useGlobalBrandsBySector(sectorId: number) {
  return useQuery({
    queryKey: ['global-sync', 'brands', 'sector', sectorId],
    queryFn: () => apiRequest(`/api/global-sync/brands?sectorId=${sectorId}`),
    enabled: !!sectorId,
    staleTime: 60000
  });
}

/**
 * Hook for cross-reference data
 */
export function useGlobalCrossReferences(type?: string) {
  return useQuery({
    queryKey: ['global-sync', 'cross-references', type],
    queryFn: () => apiRequest(`/api/global-sync/cross-references${type ? `?type=${type}` : ''}`),
    staleTime: 120000
  });
}

/**
 * Hook for special sections data
 */
export function useGlobalSpecialSections() {
  return useQuery({
    queryKey: ['global-sync', 'special-sections'],
    queryFn: () => apiRequest('/api/global-sync/special-sections'),
    staleTime: 120000
  });
}

/**
 * Hook for brand search
 */
export function useGlobalBrandSearch(query: string, section?: string, integration?: string) {
  return useQuery({
    queryKey: ['global-sync', 'search', { query, section, integration }],
    queryFn: () => {
      const params = new URLSearchParams({ q: query });
      if (section) params.append('section', section);
      if (integration) params.append('integration', integration);
      return apiRequest(`/api/global-sync/search?${params.toString()}`);
    },
    enabled: !!query && query.length > 0,
    staleTime: 30000
  });
}

/**
 * Mutation for initializing global sync
 */
export function useInitializeGlobalSync() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => apiRequest('/api/global-sync/initialize', { method: 'POST' }),
    onSuccess: () => {
      // Invalidate and refetch global sync queries
      queryClient.invalidateQueries({ queryKey: ['global-sync'] });
    }
  });
}

/**
 * Combined hook for comprehensive global brand data
 */
export function useComprehensiveGlobalSync() {
  const metrics = useGlobalSyncMetrics();
  const brands = useGlobalBrands(true);
  const fruitfulCrateDance = useFruitfulCrateDanceBrands();
  const crossReferences = useGlobalCrossReferences();
  const specialSections = useGlobalSpecialSections();
  
  return {
    metrics,
    brands,
    fruitfulCrateDance,
    crossReferences,
    specialSections,
    isLoading: metrics.isLoading || brands.isLoading || fruitfulCrateDance.isLoading,
    hasError: metrics.error || brands.error || fruitfulCrateDance.error,
    data: {
      metrics: metrics.data,
      brands: brands.data,
      fruitfulCrateDance: fruitfulCrateDance.data,
      crossReferences: crossReferences.data,
      specialSections: specialSections.data
    }
  };
}