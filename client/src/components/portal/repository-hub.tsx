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

  // Mock repository data - will be replaced with real GitHub integration
  const mockRepositories: Repository[] = [
    {
      id: "1",
      name: "faa-zone",
      description: "FAA Zone core ecosystem infrastructure with comprehensive brand management",
      category: "core",
      language: "TypeScript",
      stars: 142,
      forks: 28,
      lastUpdate: "2 hours ago",
      status: "active",
      size: "15.2 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 12,
      commits: 847,
      tags: ["v2.1.0", "production", "faa-zone"]
    },
    {
      id: "2", 
      name: "seedwave",
      description: "Seedwave portal infrastructure with VaultMesh™ integration",
      category: "portal",
      language: "React",
      stars: 89,
      forks: 15,
      lastUpdate: "4 hours ago",
      status: "active",
      size: "23.7 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 8,
      commits: 523,
      tags: ["v3.2.1", "seedwave", "portal"]
    },
    {
      id: "3",
      name: "vaultmesh",
      description: "VaultMesh™ security and payment infrastructure",
      category: "security",
      language: "Node.js",
      stars: 67,
      forks: 11,
      lastUpdate: "1 day ago",
      status: "active",
      size: "8.9 MB",
      owner: "heyns1000",
      isPrivate: true,
      branches: 6,
      commits: 234,
      tags: ["v1.8.2", "security", "payments"]
    },
    {
      id: "4",
      name: "samfox",
      description: "SamFox Creative Studio multimedia platform",
      category: "creative",
      language: "Python",
      stars: 34,
      forks: 7,
      lastUpdate: "3 days ago",
      status: "development",
      size: "45.1 MB",
      owner: "heyns1000",
      isPrivate: false,
      branches: 4,
      commits: 156,
      tags: ["v0.9.1", "creative", "multimedia"]
    },
    {
      id: "5",
      name: "baobab",
      description: "Baobab Environmental Law Mega Centre legal framework",
      category: "legal",
      language: "JavaScript",
      stars: 28,
      forks: 5,
      lastUpdate: "1 week ago",
      status: "active",
      size: "12.3 MB",
      owner: "heyns1000",
      isPrivate: true,
      branches: 3,
      commits: 89,
      tags: ["v1.2.0", "legal", "environment"]
    }
  ]

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setRepositories(mockRepositories)
      setFilteredRepos(mockRepositories)
      setIsLoading(false)
    }, 1000)
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

  const categories = ["all", "core", "portal", "security", "creative", "legal"]
  const languages = ["all", "TypeScript", "React", "Node.js", "Python", "JavaScript"]

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