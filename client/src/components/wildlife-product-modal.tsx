import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Activity, 
  Database, 
  Shield, 
  Zap, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Settings,
  Download,
  Share2,
  Edit3,
  Trash2,
  Eye,
  Play,
  Pause,
  RotateCcw,
  Copy,
  ExternalLink
} from "lucide-react"
import type { Brand, Sector } from "@shared/schema"
import { useToast } from "@/hooks/use-toast"

interface WildlifeProductModalProps {
  brand: Brand | null
  sector: Sector | null
  isOpen: boolean
  onClose: () => void
}

// Complete Wildlife protocol data from uploaded HTML
const wildlifeProtocolData = {
  "EcoGuard™": {
    protocolName: "EcoGuard™ Core Protocol Overview",
    tagline: "EcoGuard™ is an innovative FAA.Zone™ protocol, specifically engineered for the demands of the Wildlife & Habitat industry. Its deep integration with the PulseGrid™ ensures secure, real-time data flows and enhanced decision-making.",
    keyFeatures: [
      "Direct integration with FAA Professional Services Mesh™",
      "Advanced data sync with GuardEco™",
      "Real-time compliance validation via VaultLink™ (wildlife specific)",
      "Scalable architecture for x48 node expansion",
      "Predictive analytics module for EcoGuard™ performance",
      "API access for seamless interoperability",
      "Cross-sector data interoperability",
      "Self-optimizing node distribution for peak efficiency",
      "AI-driven anomaly detection and fraud prevention"
    ],
    subNodes: ["GuardEco™", "LinkHabitat™", "TraceWild™"],
    metadata: {
      productId: "ECO-WIL-2564",
      vaultId: "VAULT-UXRD",
      signalEchoLayer: "Layer Alpha v2.6",
      deploymentZone: "Zone A 5",
      securityRating: "FAA-SEC A+",
      activeNodes: "2,856",
      lastAudit: "2025-06-26",
      complianceStatus: "Active & Certified"
    },
    metrics: {
      currentPulseActivity: "98,839 pulses/sec",
      dataVolumeProcessed: "98.71 TB",
      latencyAverage: "96 ms"
    },
    ledgerEntries: [
      "#4623 - ECOGU Pulse Tx - Pending",
      "#6075 - WILDL Data Sync - Error", 
      "#2992 - Node Actuation Confirm - Offline",
      "#231 - VaultTrace™ Audit - Passed"
    ]
  },
  "HabitatLink™": {
    protocolName: "HabitatLink™ Core Protocol Overview", 
    tagline: "HabitatLink™ is the premier FAA.Zone™ platform, revolutionizing Wildlife & Habitat operations. Leveraging the global PulseGrid™, it offers robust data synchronization and superior efficiency.",
    keyFeatures: [
      "Direct integration with FAA Professional Services Mesh™",
      "Advanced data sync with NodeBio™",
      "Real-time compliance validation via VaultLink™ (wildlife specific)",
      "Scalable architecture for x42 node expansion",
      "Predictive analytics module for HabitatLink™ performance",
      "API access for seamless interoperability", 
      "Cross-sector data interoperability",
      "Blockchain-secured data provenance",
      "Secure multi-party computation support"
    ],
    subNodes: ["NodeBio™", "MeshConserv™", "SyncSpecies™"],
    metadata: {
      productId: "HAB-WIL-6298",
      vaultId: "VAULT-7VJ9",
      signalEchoLayer: "Layer Alpha v1.7",
      deploymentZone: "Zone E 10", 
      securityRating: "FAA-SEC B+",
      activeNodes: "1,927",
      lastAudit: "2025-06-20",
      complianceStatus: "Active & Certified"
    },
    metrics: {
      currentPulseActivity: "41,894 pulses/sec",
      dataVolumeProcessed: "62.65 TB",
      latencyAverage: "89 ms"
    },
    ledgerEntries: [
      "#9832 - HABIT Pulse Tx - Confirmed",
      "#8821 - WILDL Data Sync - Completed",
      "#7296 - Node Actuation Confirm - Offline", 
      "#9639 - VaultTrace™ Audit - Passed"
    ]
  },
  "WildTrace™": {
    protocolName: "WildTrace™ Core Protocol Overview",
    tagline: "WildTrace™ is a leading protocol for comprehensive wildlife tracking and behavior analysis. It provides granular data on species movement and ecosystem health.",
    keyFeatures: [
      "AI-driven movement pattern analysis",
      "Real-time anomaly detection for unauthorized activity", 
      "Integration with Sentinel Ring™ fauna tags",
      "Predictive migration route forecasting",
      "Automated health and stress alerts for tagged animals"
    ],
    subNodes: ["ProtectZone™", "FlowNature™", "GridPreserve™"],
    metadata: {
      productId: "WLD-TRC-8711",
      vaultId: "VAULT-K23L", 
      signalEchoLayer: "Layer Beta v3.1",
      deploymentZone: "Zone C 7",
      securityRating: "FAA-SEC A",
      activeNodes: "1,450",
      lastAudit: "2025-07-01",
      complianceStatus: "Active & Certified"
    },
    metrics: {
      currentPulseActivity: "35,123 pulses/sec",
      dataVolumeProcessed: "21.45 TB", 
      latencyAverage: "105 ms"
    },
    ledgerEntries: [
      "#3145 - WILDL Data Sync - Completed",
      "#5890 - Node Actuation Confirm - Online",
      "#7772 - VaultTrace™ Audit - Passed"
    ]
  },
  "ConservMesh™": {
    protocolName: "ConservMesh™ Core Protocol Overview",
    tagline: "ConservMesh™ is designed for large-scale habitat conservation, providing tools for resource management and coordinated response to environmental changes.",
    keyFeatures: [
      "Multi-region data aggregation and analysis",
      "Predictive modeling for resource allocation",
      "Integration with drone and ground sensor networks",
      "Automated alert systems for environmental threats", 
      "Blockchain-based verification of conservation efforts"
    ],
    subNodes: ["WildMesh™", "NodeBio™", "ConservFlow™"],
    metadata: {
      productId: "CON-MSH-7833",
      vaultId: "VAULT-9QJ2",
      signalEchoLayer: "Layer Delta v4.0",
      deploymentZone: "Zone K 12",
      securityRating: "FAA-SEC A+",
      activeNodes: "3,501", 
      lastAudit: "2025-06-29",
      complianceStatus: "Active & Certified"
    },
    metrics: {
      currentPulseActivity: "78,561 pulses/sec",
      dataVolumeProcessed: "88.92 TB",
      latencyAverage: "85 ms"
    },
    ledgerEntries: [
      "#7521 - CON-MSH Pulse Tx - Confirmed",
      "#1142 - WILDL Data Sync - Completed", 
      "#3309 - VaultTrace™ Audit - Passed"
    ]
  }
}

export function WildlifeProductModal({ brand, sector, isOpen, onClose }: WildlifeProductModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()

  if (!brand) return null

  // Get the detailed protocol data from uploaded HTML
  const protocolData = wildlifeProtocolData[brand.name as keyof typeof wildlifeProtocolData]
  
  const handleAction = (action: string, description: string) => {
    console.log(`${action} for ${brand.name}:`, description)
    toast({
      title: `${action} Initiated`,
      description: `${description} for ${brand.name}`,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
              {sector?.emoji || "🧩"}
            </div>
            <div>
              <DialogTitle className="text-3xl font-bold">{brand.name}</DialogTitle>
              <DialogDescription className="text-lg mt-1">
                {protocolData?.tagline || brand.description}
              </DialogDescription>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {brand.integration}
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {protocolData?.metadata.securityRating || "Standard"}
                </Badge>
                <Badge variant={brand.status === "active" ? "default" : "secondary"}>
                  {brand.status}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Live Metrics</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="ledger">Ledger</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {protocolData && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      Protocol Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Protocol Name</h4>
                      <p className="text-sm text-muted-foreground">{protocolData.protocolName}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Product ID</h4>
                        <code className="bg-muted px-2 py-1 rounded text-sm">{protocolData.metadata.productId}</code>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Vault ID</h4>
                        <code className="bg-muted px-2 py-1 rounded text-sm">{protocolData.metadata.vaultId}</code>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Deployment Zone</h4>
                        <Badge variant="outline">{protocolData.metadata.deploymentZone}</Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Last Audit</h4>
                        <span className="text-sm text-muted-foreground">{protocolData.metadata.lastAudit}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Sub-Nodes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {protocolData.subNodes.map((node, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="font-medium">{node}</span>
                          <Badge variant="outline" className="text-xs">Active</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6 mt-6">
            {protocolData && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Live Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Active Nodes</span>
                        <span className="font-bold text-blue-600">{protocolData.metadata.activeNodes}</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Pulse Activity</span>
                        <span className="font-bold text-green-600">{protocolData.metrics.currentPulseActivity}</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Data Processing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{protocolData.metrics.dataVolumeProcessed}</div>
                      <div className="text-sm text-muted-foreground">Data Processed</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xl font-bold text-orange-600">{protocolData.metrics.latencyAverage}</div>
                      <div className="text-sm text-muted-foreground">Avg Latency</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Security Rating</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {protocolData.metadata.securityRating}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Compliance</span>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {protocolData.metadata.complianceStatus}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="features" className="space-y-6 mt-6">
            {protocolData && (
              <Card>
                <CardHeader>
                  <CardTitle>Key Features & Capabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {protocolData.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="ledger" className="space-y-6 mt-6">
            {protocolData && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Ledger Entries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {protocolData.ledgerEntries.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <code className="text-sm">{entry}</code>
                        <Badge variant="outline" className="text-xs">
                          {entry.includes("Passed") ? "✓" : entry.includes("Error") ? "⚠" : "⏳"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="actions" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button onClick={() => handleAction("Deploy", "Deploying to production")} className="h-20 flex-col gap-2">
                <Zap className="h-6 w-6" />
                Deploy
              </Button>
              
              <Button onClick={() => handleAction("Configure", "Opening configuration")} variant="outline" className="h-20 flex-col gap-2">
                <Settings className="h-6 w-6" />
                Configure
              </Button>
              
              <Button onClick={() => handleAction("Download", "Generating report")} variant="outline" className="h-20 flex-col gap-2">
                <Download className="h-6 w-6" />
                Download
              </Button>
              
              <Button onClick={() => handleAction("Share", "Sharing protocol")} variant="outline" className="h-20 flex-col gap-2">
                <Share2 className="h-6 w-6" />
                Share
              </Button>
              
              <Button onClick={() => handleAction("Start", "Starting protocol")} variant="outline" className="h-20 flex-col gap-2">
                <Play className="h-6 w-6" />
                Start
              </Button>
              
              <Button onClick={() => handleAction("Stop", "Stopping protocol")} variant="outline" className="h-20 flex-col gap-2">
                <Pause className="h-6 w-6" />
                Stop
              </Button>
              
              <Button onClick={() => handleAction("Restart", "Restarting protocol")} variant="outline" className="h-20 flex-col gap-2">
                <RotateCcw className="h-6 w-6" />
                Restart
              </Button>
              
              <Button onClick={() => handleAction("Monitor", "Opening monitoring")} variant="outline" className="h-20 flex-col gap-2">
                <Eye className="h-6 w-6" />
                Monitor
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}