import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRoute } from "wouter"
import { SectorDashboardTemplate } from "@/components/portal/sector-dashboard-template"
import { Loader2, AlertTriangle } from "lucide-react"
import type { Sector, Brand } from "@shared/schema"

export default function SectorDashboard() {
  const [, params] = useRoute("/sector/:sectorId")
  const sectorId = params?.sectorId

  const { data: sector, isLoading: sectorLoading, error: sectorError } = useQuery<Sector>({
    queryKey: [`/api/sectors/${sectorId}`],
    enabled: !!sectorId
  })

  const { data: brands = [], isLoading: brandsLoading } = useQuery<Brand[]>({
    queryKey: [`/api/brands?sectorId=${sectorId}`],
    enabled: !!sectorId
  })

  if (sectorLoading || brandsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-cyan-500" />
          <p className="text-gray-600 dark:text-gray-400">Loading sector dashboard...</p>
        </div>
      </div>
    )
  }

  if (sectorError || !sector) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold mb-2">Sector Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400">
            The requested sector dashboard could not be loaded.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <SectorDashboardTemplate 
        sector={sector} 
        brands={brands}
        className="max-w-7xl mx-auto"
      />
    </div>
  )
}