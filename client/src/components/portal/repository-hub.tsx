import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, GitBranch, Download, ExternalLink, FileText, Code, Database, Settings, Eye, Plus, Filter } from "lucide-react"
import { motion } from "framer-motion"

interface Repository {
  id: string
  name: string
  description: string
  category: string
  language: string
  stars: number
  forks: number
  lastUpdate: string
  status: 'active' | 'archived' | 'development'
  size: string
  owner: string
  isPrivate: boolean
  branches: number
  commits: number
  tags: string[]
}

export function RepositoryHub() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  // Real GitHub repositories from heyns1000 ecosystem
  const realRepositories: Repository[] = [
    // Core Infrastructure - Most Recent
    {
      id: "1",
      name: "hotstack",
      description: "Core development infrastructure and build tools",
      category: "infrastructure",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "2 days ago",
      status: "active",
      size: "2.1 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 1,
      commits: 45,
      tags: ["infrastructure", "build-tools"]
    },
    {
      id: "2",
      name: "seedwave",
      description: "Central admin portal and backend functions for FAA™ Global Ecosystem",
      category: "core",
      language: "HTML",
      stars: 1,
      forks: 0,
      lastUpdate: "2 days ago",
      status: "active",
      size: "18.7 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 2,
      commits: 234,
      tags: ["seedwave", "admin", "ecosystem"]
    },
    {
      id: "3",
      name: "ai-logic.seedwave.faa.zone",
      description: "AI Logic and machine learning capabilities",
      category: "ai",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "2 days ago",
      status: "active",
      size: "5.3 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 1,
      commits: 67,
      tags: ["ai", "machine-learning", "logic"]
    },
    {
      id: "4",
      name: "faa.zone",
      description: "FruitfulGlobalPlanet main portal",
      category: "core",
      language: "HTML",
      stars: 1,
      forks: 0,
      lastUpdate: "2 days ago",
      status: "active",
      size: "12.4 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 1,
      commits: 156,
      tags: ["faa-zone", "portal", "main"]
    },
    // Recent Updates (3-5 days)
    {
      id: "5",
      name: "nutrition.seedwave.faa.zone",
      description: "Nutrition and food chain management",
      category: "nutrition",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "3 days ago",
      status: "active",
      size: "7.8 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 1,
      commits: 89,
      tags: ["nutrition", "food-chain", "health"]
    },
    {
      id: "6",
      name: "fruitful",
      description: "Change the seed - Core Fruitful platform",
      category: "core",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "3 days ago",
      status: "active",
      size: "14.2 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 2,
      commits: 178,
      tags: ["fruitful", "core", "platform"]
    },
    {
      id: "7",
      name: "wildlife.seedwave.faa.zone",
      description: "Wildlife conservation and habitat management",
      category: "environmental",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "3 days ago",
      status: "active",
      size: "9.6 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 1,
      commits: 112,
      tags: ["wildlife", "conservation", "habitat"]
    },
    {
      id: "8",
      name: "legal",
      description: "All legal minutes of meetings, documents and global legal index",
      category: "legal",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "3 days ago",
      status: "active",
      size: "25.1 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 3,
      commits: 267,
      tags: ["legal", "documents", "compliance"]
    },
    {
      id: "9",
      name: "vaultmesh",
      description: "Config files for GitHub profile - VaultMesh integration",
      category: "security",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "3 days ago",
      status: "active",
      size: "3.4 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 1,
      commits: 45,
      tags: ["vaultmesh", "security", "config"]
    },
    // Weekly Updates
    {
      id: "10",
      name: "payroll",
      description: "Payroll management and processing system",
      category: "finance",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "4 days ago",
      status: "active",
      size: "6.7 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 1,
      commits: 78,
      tags: ["payroll", "finance", "processing"]
    },
    {
      id: "11",
      name: "toynest.seedwave.faa.zone",
      description: "Smart Toys development and management platform",
      category: "gaming",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "4 days ago",
      status: "active",
      size: "11.3 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 2,
      commits: 134,
      tags: ["smart-toys", "gaming", "development"]
    },
    {
      id: "12",
      name: "fruitful.crate.dance.faa.zone",
      description: "Fruitful Crate Dance platform",
      category: "entertainment",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "4 days ago",
      status: "active",
      size: "16.8 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 1,
      commits: 98,
      tags: ["crate-dance", "entertainment", "platform"]
    },
    // Additional Recent Repositories
    {
      id: "13",
      name: "logistics.seedwave.faa.zone",
      description: "Logistics and supply chain management",
      category: "logistics",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "5 days ago",
      status: "active",
      size: "8.9 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 1,
      commits: 87,
      tags: ["logistics", "supply-chain", "management"]
    },
    {
      id: "14",
      name: "payment",
      description: "Payment processing and transaction management",
      category: "finance",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "1 week ago",
      status: "active",
      size: "7.2 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 1,
      commits: 123,
      tags: ["payment", "transactions", "processing"]
    },
    {
      id: "15",
      name: "agriculture.seedwave.faa.zone",
      description: "Agriculture and biotech sector portal",
      category: "agriculture",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "2 weeks ago",
      status: "active",
      size: "10.4 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 1,
      commits: 145,
      tags: ["agriculture", "biotech", "farming"]
    },
    {
      id: "16",
      name: "baobab",
      description: "AI, geospatial mapping, and advanced data analytics for global collaboration",
      category: "environmental",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "2 weeks ago",
      status: "active",
      size: "19.3 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 2,
      commits: 203,
      tags: ["ai", "geospatial", "analytics"]
    },
    {
      id: "17",
      name: "samfox",
      description: "Queen of fox metrics styling",
      category: "creative",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "2 weeks ago",
      status: "active",
      size: "13.7 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 1,
      commits: 167,
      tags: ["creative", "metrics", "styling"]
    },
    {
      id: "18",
      name: "interns.seedwave.faa.zone",
      description: "Central hub for interns and development administration",
      category: "education",
      language: "HTML",
      stars: 1,
      forks: 0,
      lastUpdate: "2 weeks ago",
      status: "active",
      size: "8.1 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 1,
      commits: 95,
      tags: ["interns", "education", "administration"]
    },
    // Sector Repositories (3 weeks)
    {
      id: "19",
      name: "housing.seedwave.faa.zone",
      description: "Housing and real estate management platform",
      category: "housing",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "3 weeks ago",
      status: "active",
      size: "9.8 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 1,
      commits: 76,
      tags: ["housing", "real-estate", "management"]
    },
    {
      id: "20",
      name: "banking.seedwave.faa.zone",
      description: "Banking and financial services platform",
      category: "finance",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "3 weeks ago",
      status: "active",
      size: "12.6 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 1,
      commits: 189,
      tags: ["banking", "finance", "services"]
    },
    {
      id: "21",
      name: "health.seedwave.faa.zone",
      description: "Healthcare and medical management platform",
      category: "healthcare",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "3 weeks ago",
      status: "active",
      size: "15.2 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 1,
      commits: 167,
      tags: ["healthcare", "medical", "management"]
    },
    {
      id: "22",
      name: "gaming.seedwave.faa.zone",
      description: "Gaming and entertainment platform",
      category: "gaming",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "3 weeks ago",
      status: "active",
      size: "22.4 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 2,
      commits: 234,
      tags: ["gaming", "entertainment", "platform"]
    },
    {
      id: "23",
      name: "education-youth.seedwave.faa.zone",
      description: "Youth education and development programs",
      category: "education",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "3 weeks ago",
      status: "active",
      size: "11.7 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 1,
      commits: 143,
      tags: ["education", "youth", "development"]
    },
    {
      id: "24",
      name: "utilities.seedwave.faa.zone",
      description: "Utilities and infrastructure management",
      category: "utilities",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "3 weeks ago",
      status: "active",
      size: "8.3 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 1,
      commits: 98,
      tags: ["utilities", "infrastructure", "management"]
    },
    // Monthly Repositories
    {
      id: "25",
      name: "omnigrid",
      description: "Universal Interconnected Network of FAA.zone™",
      category: "infrastructure",
      language: "HTML",
      stars: 0,
      forks: 0,
      lastUpdate: "1 month ago",
      status: "active",
      size: "27.9 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 3,
      commits: 567,
      tags: ["omnigrid", "network", "universal"]
    }
  ]

  useEffect(() => {
    // Load real GitHub repositories
    setTimeout(() => {
      setRepositories(realRepositories)
      setFilteredRepos(realRepositories)
      setIsLoading(false)
    }, 800)
  }, [])

  useEffect(() => {
    let filtered = repositories

    if (searchTerm) {
      filtered = filtered.filter(repo => 
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(repo => repo.category === selectedCategory)
    }

    if (selectedLanguage !== "all") {
      filtered = filtered.filter(repo => repo.language === selectedLanguage)
    }

    setFilteredRepos(filtered)
  }, [searchTerm, selectedCategory, selectedLanguage, repositories])

  const categories = ["all", "core", "infrastructure", "ai", "environmental", "legal", "finance", "gaming", "entertainment", "nutrition", "security", "logistics", "agriculture", "creative", "education", "housing", "healthcare", "utilities"]
  const languages = ["all", "HTML", "TypeScript", "JavaScript", "React", "Node.js", "Python"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500"
      case "development": return "bg-yellow-500" 
      case "archived": return "bg-gray-500"
      default: return "bg-blue-500"
    }
  }

  const getLanguageColor = (language: string) => {
    switch (language) {
      case "HTML": return "bg-orange-500"
      case "TypeScript": return "bg-blue-600"
      case "React": return "bg-cyan-500"
      case "Node.js": return "bg-green-600"
      case "Python": return "bg-yellow-600"
      case "JavaScript": return "bg-yellow-500"
      default: return "bg-gray-500"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading repositories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Section - Matching the template's green header style */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            🗃️ Repository & Legal Hub
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Comprehensive repository management with integrated legal documentation and SecureSign™ VIP access
          </p>
        </div>
      </div>

      {/* Search and Filter Controls - Template's card styling */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Search className="h-6 w-6 text-purple-400" />
            Repository Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search Repositories
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, description, or tags..."
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Language
              </label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(language => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Repository Grid - Template's card styling */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRepos.map((repo) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <GitBranch className="h-5 w-5 text-blue-400" />
                      <h3 className="text-xl font-bold text-white">{repo.name}</h3>
                      {repo.isPrivate && (
                        <Badge variant="secondary" className="bg-red-600 text-white">
                          Private
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{repo.description}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(repo.status)} flex-shrink-0 mt-2`} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Repository Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{repo.stars}</div>
                    <div className="text-gray-400">Stars</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{repo.forks}</div>
                    <div className="text-gray-400">Forks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{repo.branches}</div>
                    <div className="text-gray-400">Branches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{repo.commits}</div>
                    <div className="text-gray-400">Commits</div>
                  </div>
                </div>

                {/* Tags and Language */}
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${getLanguageColor(repo.language)} text-white`}>
                    {repo.language}
                  </Badge>
                  {repo.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="border-gray-600 text-gray-300">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Repository Info */}
                <div className="text-sm text-gray-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span>{repo.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Owner:</span>
                    <span>{repo.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Update:</span>
                    <span>{repo.lastUpdate}</span>
                  </div>
                </div>

                {/* Action Buttons - Template's button styling */}
                <div className="grid grid-cols-3 gap-2 pt-4">
                  <Button 
                    size="sm" 
                    className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Clone
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add New Repository Section - Template's form styling */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Plus className="h-6 w-6 text-green-400" />
            Add New Repository
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Repository URL
              </label>
              <Input
                placeholder="https://github.com/username/repository"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <Select>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.slice(1).map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-bold rounded-full">
            Import Repository
          </Button>
        </CardContent>
      </Card>

      {/* Statistics Footer - Template's footer styling */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{repositories.length}</div>
              <div className="text-gray-400">Total Repositories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{repositories.filter(r => r.status === 'active').length}</div>
              <div className="text-gray-400">Active Projects</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">{repositories.filter(r => r.status === 'development').length}</div>
              <div className="text-gray-400">In Development</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{repositories.filter(r => r.isPrivate).length}</div>
              <div className="text-gray-400">Private Repos</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}