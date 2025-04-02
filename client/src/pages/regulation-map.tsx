import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { privacyRegulations, RegulationInfo } from '@/lib/regulationData';
import { Link } from 'wouter';
import { 
  ArrowUpRight, 
  Globe, 
  Shield, 
  AlertTriangle, 
  Search, 
  ArrowLeft, 
  Info,
  BookOpen,
  Filter
} from 'lucide-react';

// Helper function to get severity based on penalties
const getSeverityLevel = (regulation: RegulationInfo): 'low' | 'medium' | 'high' => {
  const penaltyText = regulation.penalties.toLowerCase();
  if (penaltyText.includes('million') || 
      penaltyText.includes('4%') || 
      penaltyText.includes('5%') ||
      penaltyText.includes('imprisonment')) {
    return 'high';
  } else if (penaltyText.includes('thousand') || penaltyText.includes('2%')) {
    return 'medium';
  }
  return 'low';
};

// Badge component for penalty severity
const SeverityBadge = ({ severity }: { severity: 'low' | 'medium' | 'high' }) => {
  const variants = {
    low: { variant: 'outline' as const, className: 'border-yellow-300 text-yellow-700 bg-yellow-50' },
    medium: { variant: 'outline' as const, className: 'border-orange-300 text-orange-700 bg-orange-50' },
    high: { variant: 'outline' as const, className: 'border-red-300 text-red-700 bg-red-50' }
  };
  
  const labels = {
    low: 'Low Impact',
    medium: 'Medium Impact',
    high: 'High Impact'
  };
  
  return (
    <Badge variant={variants[severity].variant} className={variants[severity].className}>
      {labels[severity]}
    </Badge>
  );
};

const RegulationMap: React.FC = () => {
  const [selectedRegulation, setSelectedRegulation] = useState<RegulationInfo | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Detect mobile devices for responsive design adjustments
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Filter regulations by region and search query
  const filteredRegulations = useMemo(() => {
    let regulations = privacyRegulations;
    
    // First filter by region
    if (selectedRegion !== "all") {
      regulations = regulations.filter(reg => {
        switch (selectedRegion) {
          case "europe":
            return reg.region.includes("European Union") || reg.region.includes("Europe");
          case "northAmerica":
            return reg.region.includes("United States") || reg.region.includes("Canada");
          case "southAmerica":
            return reg.region.includes("Brazil") || reg.region.includes("South America");
          case "asia":
            return reg.region.includes("China") || reg.region.includes("Singapore") || reg.region.includes("Thailand") || reg.region.includes("Japan");
          case "africa":
            return reg.region.includes("South Africa") || reg.region.includes("Africa");
          case "oceania":
            return reg.region.includes("Australia") || reg.region.includes("Zealand");
          default:
            return true;
        }
      });
    }
    
    // Then filter by search query if it exists
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      regulations = regulations.filter(reg => 
        reg.name.toLowerCase().includes(query) || 
        reg.region.toLowerCase().includes(query) ||
        reg.description.toLowerCase().includes(query)
      );
    }
    
    return regulations;
  }, [selectedRegion, searchQuery]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Privacy Regulations</h1>
        <Link to="/generator">
          <Button size="sm" variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Generator
          </Button>
        </Link>
      </div>
      
      <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
        Explore privacy regulations across the globe. Find detailed information about privacy laws and requirements.
      </p>

      {/* Info Card */}
      <Card className="mb-6 bg-blue-50 border-blue-200">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="flex-shrink-0">
            <Info className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <h3 className="font-medium text-blue-700">
              Find Regulations for Your Business
            </h3>
            <p className="text-sm text-blue-600">
              Browse regulations by region or use the search to find specific laws that may apply to your business.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Search and filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search regulations by name or region..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 sm:justify-end">
          <Button
            variant={selectedRegion === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedRegion("all")}
            className="flex items-center gap-1"
          >
            <Globe className="h-4 w-4" /> All Regions
          </Button>
          
          <Button
            variant={selectedRegion === "europe" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedRegion("europe")}
            className="flex items-center gap-1"
          >
            Europe
          </Button>
          
          <Button
            variant={selectedRegion === "northAmerica" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedRegion("northAmerica")}
            className="flex items-center gap-1"
          >
            N. America
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <h2 className="text-xl font-bold">Browse Privacy Regulations</h2>
              <p className="text-sm text-gray-600">
                Select a regulation to view detailed information about its requirements and penalties.
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Regulation
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Region
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Year
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Severity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRegulations.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                          No regulations found for your search criteria
                        </td>
                      </tr>
                    ) : (
                      filteredRegulations.map((reg) => (
                        <tr 
                          key={reg.id} 
                          className="hover:bg-blue-50 cursor-pointer"
                          onClick={() => setSelectedRegulation(reg)}
                        >
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900 flex items-center gap-2">
                              {reg.name}
                              {reg.id === 'gdpr' && <Badge className="bg-blue-100 text-blue-800 border-blue-200">Major</Badge>}
                              {reg.id === 'ccpa' && <Badge className="bg-blue-100 text-blue-800 border-blue-200">Major</Badge>}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {reg.region}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {reg.year}
                          </td>
                          <td className="px-4 py-3">
                            <SeverityBadge severity={getSeverityLevel(reg)} />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Regulations Comparison Section */}
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Regulation Comparison</h2>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <Link to="/generator">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Shield className="h-4 w-4" /> Generate Policy
                  </Button>
                </Link>
              </div>
            </div>
            
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <Tabs defaultValue="requirements">
                  <TabsList className="mb-6 w-full justify-start">
                    <TabsTrigger value="requirements" className="flex items-center gap-1">
                      <Shield className="h-4 w-4" /> Key Requirements
                    </TabsTrigger>
                    <TabsTrigger value="penalties" className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" /> Penalties
                    </TabsTrigger>
                    <TabsTrigger value="applicability" className="flex items-center gap-1">
                      <Info className="h-4 w-4" /> Applicability
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="requirements" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {privacyRegulations.slice(0, 4).map((reg) => (
                        <Card 
                          key={reg.id} 
                          className="h-full border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                          onClick={() => setSelectedRegulation(reg)}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{reg.name}</CardTitle>
                              <Badge variant="outline">{reg.year}</Badge>
                            </div>
                            <p className="text-sm text-gray-500">{reg.region}</p>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                              {reg.keyRequirements.slice(0, 3).map((req, i) => (
                                <li key={i}>{req}</li>
                              ))}
                              {reg.keyRequirements.length > 3 && (
                                <li className="text-blue-600">+{reg.keyRequirements.length - 3} more requirements</li>
                              )}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="penalties" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {privacyRegulations.slice(0, 4).map((reg) => {
                        const severity = getSeverityLevel(reg);
                        const severityColors = {
                          low: 'bg-yellow-50 border-yellow-200',
                          medium: 'bg-orange-50 border-orange-200',
                          high: 'bg-red-50 border-red-200'
                        };
                        
                        return (
                          <Card 
                            key={reg.id} 
                            className={`border cursor-pointer ${severityColors[severity]}`}
                            onClick={() => setSelectedRegulation(reg)}
                          >
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">{reg.name}</CardTitle>
                                <SeverityBadge severity={severity} />
                              </div>
                              <p className="text-sm text-gray-500">{reg.region} | {reg.year}</p>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm">{reg.penalties}</p>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </TabsContent>

                  <TabsContent value="applicability" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {privacyRegulations.slice(0, 4).map((reg) => (
                        <Card 
                          key={reg.id} 
                          className="h-full border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                          onClick={() => setSelectedRegulation(reg)}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{reg.name}</CardTitle>
                              <Badge variant="outline">{reg.year}</Badge>
                            </div>
                            <p className="text-sm text-gray-500">{reg.region}</p>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-700">{reg.applicability}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="pt-0 text-center">
                <Link to="/generator" className="w-full">
                  <Button className="w-full sm:w-auto">
                    <Shield className="h-4 w-4 mr-2" /> Create Compliant Privacy Policy
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Right Sidebar - Regulation Details */}
        <div className="lg:col-span-4">
          {selectedRegulation ? (
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold">
                    {selectedRegulation.name}
                  </CardTitle>
                  <Badge variant="outline" className="font-normal">
                    {selectedRegulation.year}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">{selectedRegulation.region}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700">{selectedRegulation.description}</p>
                
                <div>
                  <h4 className="font-medium text-sm mb-2 flex items-center">
                    <Shield className="w-4 h-4 mr-1 text-blue-600" /> 
                    Key Requirements
                  </h4>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {selectedRegulation.keyRequirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1 text-orange-500" /> 
                    Penalties
                  </h4>
                  <div className="flex items-center gap-2 mb-2">
                    <SeverityBadge severity={getSeverityLevel(selectedRegulation)} />
                  </div>
                  <p className="text-sm text-gray-700">{selectedRegulation.penalties}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-1 text-gray-500" /> 
                    Applicability
                  </h4>
                  <p className="text-sm text-gray-700">{selectedRegulation.applicability}</p>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex flex-col sm:flex-row gap-3 justify-between">
                <Link to="/generator" className="w-full sm:w-auto">
                  <Button variant="default" size="sm" className="w-full">
                    <Shield className="h-3 w-3 mr-1" /> Generate Compliant Policy
                  </Button>
                </Link>
                
                <a 
                  href={selectedRegulation.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-blue-600 text-sm inline-flex items-center hover:underline"
                >
                  Official documentation
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </a>
              </CardFooter>
            </Card>
          ) : (
            <Card className="bg-gray-50 border border-gray-200 shadow-sm">
              <CardContent className="p-6 text-center">
                <Globe className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">Select a Regulation</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Click on any regulation from the table to view detailed information about its requirements and penalties.
                </p>
                <Link to="/generator">
                  <Button className="flex items-center gap-2">
                    <Shield className="h-4 w-4" /> 
                    Create Compliant Policy
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Related Resources */}
          <Card className="mt-6 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">Key Compliance Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-1">Important Tools</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/generator" className="text-blue-600 text-sm hover:underline flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Policy Generator Tool
                    </Link>
                  </li>
                  <li>
                    <Link to="/templates" className="text-blue-600 text-sm hover:underline flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Policy Templates
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Popular Regulations</h4>
                <ul className="space-y-2">
                  {privacyRegulations.slice(0, 3).map(reg => (
                    <li key={reg.id}>
                      <button 
                        className="text-blue-600 text-sm hover:underline text-left flex items-start"
                        onClick={() => setSelectedRegulation(reg)}
                      >
                        <Info className="h-4 w-4 mr-2 mt-0.5" />
                        <span>{reg.name} ({reg.region})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegulationMap;