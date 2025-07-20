import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Activity, 
  Shield, 
  Zap, 
  Cpu, 
  Network, 
  Lock, 
  Unlock, 
  Power,
  Brain,
  Scale,
  Radio,
  FileSignature,
  BarChart3,
  Globe,
  ArrowUp,
  RotateCcw,
  Flame,
  TrendingUp,
  DollarSign,
  Target,
  Pickaxe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function BuildNestDashboard() {
  const [selectedIndustry, setSelectedIndustry] = useState("Finance");
  const [selectedDataVolume, setSelectedDataVolume] = useState("Large");
  const [selectedNetwork, setSelectedNetwork] = useState("Global");
  const [selectedSecurity, setSelectedSecurity] = useState("High");
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [operationLogs, setOperationLogs] = useState<string[]>([]);
  const [activeEngines, setActiveEngines] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Real-time metrics state
  const [metrics, setMetrics] = useState({
    networkLoad: 0,
    transactionVelocity: 0,
    securityScore: 0,
    mistDensity: 0,
    omniproofStability: 0,
    equipmentUptime: 0,
    roi: 0,
    costSavings: 0
  });

  // Engine performance data
  const [engineMetrics, setEngineMetrics] = useState({
    corethink: { efficiency: 0, status: "Idle", progress: 0 },
    truthweight: { efficiency: 0, status: "Idle", progress: 0 },
    echosynth: { efficiency: 0, status: "Idle", progress: 0 },
    autosigil: { efficiency: 0, status: "Idle", progress: 0 },
    pulseindex: { efficiency: 0, status: "Idle", progress: 0 },
    omnitrace: { efficiency: 0, status: "Idle", progress: 0 },
    lifthalo: { efficiency: 0, status: "Idle", progress: 0 },
    mirrorloop: { efficiency: 0, status: "Idle", progress: 0 },
    fireratio: { efficiency: 0, status: "Idle", progress: 0 }
  });

  // Industry sectors for selection
  const industries = [
    "Finance", "Healthcare", "Manufacturing", "Energy", "Retail", 
    "Transportation", "Technology", "Agriculture", "Mining", "Education"
  ];

  // Data volumes
  const dataVolumes = ["Small", "Medium", "Large", "Enterprise", "Global"];

  // Network topologies
  const networks = ["Local", "Regional", "National", "Global", "Multi-Cloud"];

  // Security postures
  const securityLevels = ["Standard", "High", "Military", "Quantum"];

  // Engine definitions
  const engines = [
    { id: "corethink", name: "Corethink™", icon: Brain, description: "Accelerates decision-making with real-time cognitive processing" },
    { id: "truthweight", name: "TruthWeight™", icon: Scale, description: "Ensures absolute data integrity by evaluating veracity" },
    { id: "echosynth", name: "EchoSynth™", icon: Radio, description: "Facilitates dynamic communication pathways" },
    { id: "autosigil", name: "AutoSigil™", icon: FileSignature, description: "Automates digital signature generation" },
    { id: "pulseindex", name: "PulseIndex™", icon: BarChart3, description: "Maintains real-time operational awareness" },
    { id: "omnitrace", name: "OmniTrace™", icon: Globe, description: "Provides comprehensive traceability" },
    { id: "lifthalo", name: "LiftHalo™", icon: ArrowUp, description: "Optimizes network resource allocation" },
    { id: "mirrorloop", name: "MirrorLoop™", icon: RotateCcw, description: "Enables self-healing data replication" },
    { id: "fireratio", name: "FireRatio™", icon: Flame, description: "Manages network bandwidth dynamically" }
  ];

  const addLog = (message: string, type: "info" | "success" | "warning" | "error" = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    setOperationLogs(prev => [logEntry, ...prev].slice(0, 50)); // Keep last 50 logs
  };

  const generateRandomMetrics = () => {
    const baseMultiplier = selectedSecurity === "Quantum" ? 1.2 : selectedSecurity === "Military" ? 1.1 : 1.0;
    const volumeMultiplier = selectedDataVolume === "Global" ? 1.3 : selectedDataVolume === "Enterprise" ? 1.2 : 1.0;
    
    return {
      networkLoad: Math.min(95, 70 + Math.random() * 20 * baseMultiplier),
      transactionVelocity: Math.min(99, 80 + Math.random() * 15 * volumeMultiplier),
      securityScore: Math.min(99, 85 + Math.random() * 10 * baseMultiplier),
      mistDensity: Math.max(5, 25 - Math.random() * 15 * baseMultiplier),
      omniproofStability: Math.min(99, 90 + Math.random() * 8 * baseMultiplier),
      equipmentUptime: Math.min(99, 88 + Math.random() * 10),
      roi: Math.min(350, 150 + Math.random() * 100 * volumeMultiplier),
      costSavings: Math.min(50, 10 + Math.random() * 20 * volumeMultiplier)
    };
  };

  const updateEngineMetrics = () => {
    const newEngineMetrics = { ...engineMetrics };
    
    engines.forEach(engine => {
      if (activeEngines.includes(engine.id)) {
        newEngineMetrics[engine.id] = {
          efficiency: Math.min(99, 75 + Math.random() * 20),
          status: "Active",
          progress: Math.min(100, newEngineMetrics[engine.id].progress + Math.random() * 10)
        };
      } else {
        newEngineMetrics[engine.id] = {
          efficiency: Math.max(0, newEngineMetrics[engine.id].efficiency - Math.random() * 5),
          status: "Idle",
          progress: Math.max(0, newEngineMetrics[engine.id].progress - Math.random() * 2)
        };
      }
    });
    
    setEngineMetrics(newEngineMetrics);
  };

  const startSimulation = () => {
    setIsLiveMode(false);
    addLog("Starting simulation with current parameters...", "info");
    setMetrics(generateRandomMetrics());
    updateEngineMetrics();
    addLog("Simulation complete - all systems operational", "success");
  };

  const startLiveMode = () => {
    setIsLiveMode(true);
    addLog("Connecting to live data streams...", "info");
    
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setMetrics(generateRandomMetrics());
      updateEngineMetrics();
      addLog(`Live update: ${selectedIndustry} sector - Network performance optimal`, "success");
    }, 5000); // Update every 5 seconds
    
    addLog("Live mode activated - real-time updates every 5 seconds", "success");
  };

  const stopLiveMode = () => {
    setIsLiveMode(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    addLog("Live mode deactivated", "warning");
  };

  const toggleEngine = (engineId: string) => {
    setActiveEngines(prev => {
      const newActive = prev.includes(engineId) 
        ? prev.filter(id => id !== engineId)
        : [...prev, engineId];
      
      const engine = engines.find(e => e.id === engineId);
      addLog(`${engine?.name} ${newActive.includes(engineId) ? 'activated' : 'deactivated'}`, "info");
      
      return newActive;
    });
  };

  useEffect(() => {
    // Initialize with some engines active
    setActiveEngines(["corethink", "truthweight", "pulseindex"]);
    startSimulation();
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    updateEngineMetrics();
  }, [activeEngines]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-yellow-300">
      {/* Header */}
      <div className="bg-black/50 border-b border-yellow-500/20 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2 flex items-center gap-3">
            <Cpu className="w-10 h-10" />
            FAA.zone™ MONSTER OMNI™ BuildNest Dashboard
          </h1>
          <p className="text-yellow-200/80">
            Advanced sector-specific brand management with AI-powered real-time metrics and ecosystem integration
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Control Panel */}
        <Card className="bg-black/70 border-yellow-500/30 p-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">🎛️ Demo Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-yellow-300 font-medium">Industry Sector</label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="bg-black border-yellow-500/30 text-yellow-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-yellow-500/30">
                  {industries.map(industry => (
                    <SelectItem key={industry} value={industry} className="text-yellow-200">
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-yellow-300 font-medium">Data Volume Scale</label>
              <Select value={selectedDataVolume} onValueChange={setSelectedDataVolume}>
                <SelectTrigger className="bg-black border-yellow-500/30 text-yellow-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-yellow-500/30">
                  {dataVolumes.map(volume => (
                    <SelectItem key={volume} value={volume} className="text-yellow-200">
                      {volume}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-yellow-300 font-medium">Network Topology</label>
              <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                <SelectTrigger className="bg-black border-yellow-500/30 text-yellow-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-yellow-500/30">
                  {networks.map(network => (
                    <SelectItem key={network} value={network} className="text-yellow-200">
                      {network}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-yellow-300 font-medium">Security Posture</label>
              <Select value={selectedSecurity} onValueChange={setSelectedSecurity}>
                <SelectTrigger className="bg-black border-yellow-500/30 text-yellow-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-yellow-500/30">
                  {securityLevels.map(level => (
                    <SelectItem key={level} value={level} className="text-yellow-200">
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={startSimulation}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Generate Simulation
            </Button>
            
            {!isLiveMode ? (
              <Button 
                onClick={startLiveMode}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                <Activity className="w-4 h-4" />
                Connect Live Data
              </Button>
            ) : (
              <Button 
                onClick={stopLiveMode}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <Power className="w-4 h-4" />
                Stop Live Data
              </Button>
            )}
          </div>
        </Card>

        {/* KPI Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="bg-black/70 border-yellow-500/30 p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400">{metrics.networkLoad.toFixed(1)}%</div>
            <div className="text-yellow-200/80 text-sm">Network Load</div>
          </Card>
          <Card className="bg-black/70 border-yellow-500/30 p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400">{metrics.securityScore.toFixed(1)}%</div>
            <div className="text-yellow-200/80 text-sm">Security Score</div>
          </Card>
          <Card className="bg-black/70 border-yellow-500/30 p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400">{metrics.equipmentUptime.toFixed(1)}%</div>
            <div className="text-yellow-200/80 text-sm">Equipment Uptime</div>
          </Card>
          <Card className="bg-black/70 border-yellow-500/30 p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400">${metrics.costSavings.toFixed(1)}M</div>
            <div className="text-yellow-200/80 text-sm">Cost Savings</div>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="engines" className="space-y-6">
          <TabsList className="bg-black/70 border-yellow-500/30">
            <TabsTrigger value="engines" className="data-[state=active]:bg-yellow-600">
              Core Engines Impact
            </TabsTrigger>
            <TabsTrigger value="financial" className="data-[state=active]:bg-yellow-600">
              Financial Impact
            </TabsTrigger>
            <TabsTrigger value="governance" className="data-[state=active]:bg-yellow-600">
              Data Governance
            </TabsTrigger>
            <TabsTrigger value="equipment" className="data-[state=active]:bg-yellow-600">
              Mining Equipment
            </TabsTrigger>
          </TabsList>

          {/* Core Engines Tab */}
          <TabsContent value="engines" className="space-y-6">
            <h2 className="text-3xl font-bold text-yellow-400 text-center">
              Atom-Level Engines: Operational Impact
            </h2>
            <p className="text-center text-yellow-200/80 mb-8 max-w-3xl mx-auto">
              Observe the direct operational impact of MONSTER OMNI™'s Atom-Level Logic Engines. 
              Each engine contributes to overall system performance and efficiency gains.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {engines.map((engine) => {
                const metrics = engineMetrics[engine.id];
                const IconComponent = engine.icon;
                const isActive = activeEngines.includes(engine.id);
                
                return (
                  <Card 
                    key={engine.id}
                    className={`p-6 transition-all duration-300 cursor-pointer border-2 ${
                      isActive 
                        ? 'bg-yellow-900/20 border-yellow-400 shadow-lg shadow-yellow-400/20' 
                        : 'bg-black/70 border-yellow-500/30 opacity-60'
                    }`}
                    onClick={() => toggleEngine(engine.id)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <IconComponent className="w-6 h-6 text-yellow-400" />
                      <h3 className="text-xl font-bold text-yellow-400">{engine.name}</h3>
                    </div>
                    <p className="text-yellow-200/80 text-sm mb-4">{engine.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-yellow-300">Efficiency:</span>
                        <span className="text-yellow-200">{metrics.efficiency.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-yellow-300">Status:</span>
                        <Badge variant={isActive ? "default" : "secondary"}>
                          {metrics.status}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${metrics.progress}%` }}
                        />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Financial Impact Tab */}
          <TabsContent value="financial" className="space-y-6">
            <h2 className="text-3xl font-bold text-yellow-400 text-center">
              Financial Impact: Simulated ROI
            </h2>
            <p className="text-center text-yellow-200/80 mb-8 max-w-3xl mx-auto">
              See how Atom-Level Engines translate into tangible financial benefits for your selected industry and scenario.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-black/70 border-yellow-500/30 p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Revenue Growth Projection
                </h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">
                    +{metrics.roi.toFixed(0)}%
                  </div>
                  <p className="text-yellow-200/80 text-sm">
                    Annualized growth due to operational efficiencies
                  </p>
                </div>
              </Card>

              <Card className="bg-black/70 border-yellow-500/30 p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Cost Reduction Analysis
                </h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">
                    ${metrics.costSavings.toFixed(1)}M
                  </div>
                  <p className="text-yellow-200/80 text-sm">
                    Annual savings from optimized operations
                  </p>
                </div>
              </Card>
            </div>

            <Card className="bg-black/70 border-yellow-500/30 p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                Current Scenario: {selectedIndustry} - {selectedDataVolume} Data Volume
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{metrics.transactionVelocity.toFixed(1)}%</div>
                  <div className="text-yellow-200/80 text-sm">Transaction Velocity</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{(100 - metrics.mistDensity).toFixed(1)}%</div>
                  <div className="text-yellow-200/80 text-sm">Process Efficiency</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{metrics.omniproofStability.toFixed(1)}%</div>
                  <div className="text-yellow-200/80 text-sm">System Stability</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Data Governance Tab */}
          <TabsContent value="governance" className="space-y-6">
            <h2 className="text-3xl font-bold text-yellow-400 text-center">
              Data Governance & Audit: Immutability & Compliance
            </h2>
            <p className="text-center text-yellow-200/80 mb-8 max-w-3xl mx-auto">
              Experience the robust security and transparent auditability provided by FAA.zone™ for mission-critical data.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-black/70 border-yellow-500/30 p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Compliance
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-yellow-300">Data Integrity:</span>
                    <span className="text-green-400">{metrics.securityScore.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-300">Audit Trail:</span>
                    <span className="text-green-400">Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-300">Compliance Status:</span>
                    <Badge className="bg-green-600">Verified</Badge>
                  </div>
                </div>
              </Card>

              <Card className="bg-black/70 border-yellow-500/30 p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Immutable Records
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-yellow-300">Block Height:</span>
                    <span className="text-yellow-200">{Math.floor(metrics.transactionVelocity * 1000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-300">Hash Verification:</span>
                    <span className="text-green-400">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-300">Consensus:</span>
                    <Badge className="bg-yellow-600">Active</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Mining Equipment Tab */}
          <TabsContent value="equipment" className="space-y-6">
            <h2 className="text-3xl font-bold text-yellow-400 text-center">
              Mining Equipment & Assets
            </h2>
            <p className="text-center text-yellow-200/80 mb-8 max-w-3xl mx-auto">
              Monitor the operational status and performance of mining equipment across all divisions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Extraction Division", "Processing Division", "Transport Division"].map((division) => (
                <Card key={division} className="bg-black/70 border-yellow-500/30 p-6">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                    <Pickaxe className="w-5 h-5" />
                    {division}
                  </h3>
                  <div className="space-y-3">
                    {Array.from({ length: 3 }, (_, i) => (
                      <div key={i} className="border border-yellow-500/20 p-3 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-yellow-300">
                            Equipment {String.fromCharCode(65 + i)}-{Math.floor(Math.random() * 100 + 1)}
                          </span>
                          <Badge className={
                            metrics.equipmentUptime > 90 ? "bg-green-600" : 
                            metrics.equipmentUptime > 80 ? "bg-yellow-600" : "bg-red-600"
                          }>
                            {metrics.equipmentUptime > 90 ? "Online" : 
                             metrics.equipmentUptime > 80 ? "Warning" : "Offline"}
                          </Badge>
                        </div>
                        <div className="text-sm text-yellow-200/80">
                          Uptime: {(metrics.equipmentUptime + Math.random() * 5 - 2.5).toFixed(1)}%
                        </div>
                        <div className="text-sm text-yellow-200/80">
                          Last Service: {Math.floor(Math.random() * 30 + 1)} days ago
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Operations Log */}
        <Card className="bg-black/70 border-yellow-500/30 p-6">
          <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Operations Log {isLiveMode && <Badge className="bg-green-600 animate-pulse">LIVE</Badge>}
          </h3>
          <div className="bg-black/90 border border-yellow-500/20 rounded p-4 h-64 overflow-y-auto font-mono text-sm">
            {operationLogs.map((log, index) => (
              <div key={index} className="text-green-400 mb-1">
                {log}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}