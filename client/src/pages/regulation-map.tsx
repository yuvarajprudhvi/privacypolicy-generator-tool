import React, { useState, useMemo, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator'; 
import { privacyRegulations, getCountryColor, getCountryRegulation, RegulationInfo } from '@/lib/regulationData';
import { Link } from 'wouter';
import { 
  ArrowUpRight, 
  Globe, 
  Shield, 
  AlertTriangle, 
  Search, 
  Hand, 
  MousePointer, 
  ArrowLeft, 
  Info,
  BookOpen,
  Fingerprint,
  DollarSign,
  BarChart4,
  Map,
  MapPin
} from 'lucide-react';

// URL for the map topology JSON - using a more reliable source
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

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
  const [tooltipContent, setTooltipContent] = useState<string>("");
  const [tooltipId, setTooltipId] = useState<string>("map-tooltip");
  const [selectedRegulation, setSelectedRegulation] = useState<RegulationInfo | null>(null);
  const [selectedContinent, setSelectedContinent] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mapError, setMapError] = useState<boolean>(false);
  
  // Detect mobile devices
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Effect for handling map loading errors
  useEffect(() => {
    // Set a timeout to check if the map loaded correctly
    const timer = setTimeout(() => {
      const mapElements = document.querySelectorAll('.rsm-geography');
      if (mapElements.length === 0) {
        console.log("Map failed to load, showing fallback view");
        setMapError(true);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter regulations by continent and search query
  const filteredRegulations = useMemo(() => {
    let regulations = privacyRegulations;
    
    // First filter by continent
    if (selectedContinent !== "all") {
      regulations = regulations.filter(reg => {
        switch (selectedContinent) {
          case "europe":
            return reg.region.includes("European Union") || reg.region.includes("Europe");
          case "northAmerica":
            return reg.region.includes("United States") || reg.region.includes("Canada");
          case "southAmerica":
            return reg.region.includes("Brazil") || reg.region.includes("South America");
          case "asia":
            return reg.region.includes("China") || reg.region.includes("Singapore") || reg.region.includes("Thailand");
          case "africa":
            return reg.region.includes("South Africa");
          case "oceania":
            return reg.region.includes("Australia");
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
        reg.region.toLowerCase().includes(query)
      );
    }
    
    return regulations;
  }, [selectedContinent, searchQuery]);

  const handleCountryClick = (geo: any) => {
    // Different map sources may use different property names
    const countryName = geo.properties.NAME || geo.properties.name || '';
    const countryCode = geo.properties.ISO_A2 || geo.properties.iso_a2 || '';
    
    const regulation = countryCode ? getCountryRegulation(countryCode.toLowerCase()) : undefined;
    
    if (regulation) {
      setSelectedRegulation(regulation);
    } else if (countryName) {
      setTooltipContent(`${countryName}: No specific privacy regulation data available`);
    } else {
      setTooltipContent(`No specific privacy regulation data available`);
    }
  };

  const handleMouseEnter = (geo: any) => {
    // Different map sources may use different property names
    const countryName = geo.properties.NAME || geo.properties.name || '';
    const countryCode = geo.properties.ISO_A2 || geo.properties.iso_a2 || '';
    
    const regulation = countryCode ? getCountryRegulation(countryCode.toLowerCase()) : undefined;
    
    if (regulation) {
      setTooltipContent(`${countryName}: ${regulation.name} (${regulation.year})`);
    } else if (countryName) {
      setTooltipContent(`${countryName}: No specific regulation data`);
    } else {
      setTooltipContent(`Hover over a country to see regulation information`);
    }
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  const getPositionForContinent = (continent: string) => {
    switch (continent) {
      case "europe":
        return { coordinates: [15, 50] as [number, number], zoom: 4 };
      case "northAmerica":
        return { coordinates: [-100, 40] as [number, number], zoom: 2 };
      case "southAmerica":
        return { coordinates: [-60, -15] as [number, number], zoom: 3 };
      case "asia":
        return { coordinates: [100, 30] as [number, number], zoom: 2 };
      case "africa":
        return { coordinates: [20, 0] as [number, number], zoom: 2 };
      case "oceania":
        return { coordinates: [135, -25] as [number, number], zoom: 3 };
      default:
        return { coordinates: [0, 0] as [number, number], zoom: 1 };
    }
  };

  const position = getPositionForContinent(selectedContinent);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Global Privacy Regulation Map</h1>
        <Link to="/generator">
          <Button size="sm" variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Generator
          </Button>
        </Link>
      </div>
      
      <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
        Explore privacy regulations across the globe. Click on countries to see detailed information about their privacy laws and requirements.
      </p>

      {/* Interaction Hint Card */}
      <Card className="mb-6 bg-blue-50 border-blue-200">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="flex-shrink-0">
            {isMobile ? 
              <Hand className="h-8 w-8 text-blue-500" /> : 
              <MousePointer className="h-8 w-8 text-blue-500" />
            }
          </div>
          <div>
            <h3 className="font-medium text-blue-700">
              {isMobile ? "Tap to interact" : "Click to interact"}
            </h3>
            <p className="text-sm text-blue-600">
              {isMobile ? 
                "Tap on countries with highlighted colors to view their privacy regulations. Use the search bar to find specific regulations." : 
                "Click on countries with highlighted colors to view their privacy regulations. Hover for quick preview and click for details."
              }
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
            variant={selectedContinent === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedContinent("all")}
            className="flex items-center gap-1"
          >
            <Globe className="h-4 w-4" /> World
          </Button>
          
          <div className="hidden sm:flex gap-2">
            <Button
              variant={selectedContinent === "europe" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedContinent("europe")}
              className="flex items-center gap-1"
            >
              <MapPin className="h-3 w-3" /> Europe
            </Button>
            <Button
              variant={selectedContinent === "northAmerica" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedContinent("northAmerica")}
              className="flex items-center gap-1"
            >
              <MapPin className="h-3 w-3" /> N. America
            </Button>
            <Button
              variant={selectedContinent === "southAmerica" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedContinent("southAmerica")}
              className="flex items-center gap-1"
            >
              <MapPin className="h-3 w-3" /> S. America
            </Button>
            <Button
              variant={selectedContinent === "asia" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedContinent("asia")}
              className="flex items-center gap-1"
            >
              <MapPin className="h-3 w-3" /> Asia
            </Button>
            <Button
              variant={selectedContinent === "africa" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedContinent("africa")}
              className="flex items-center gap-1"
            >
              <MapPin className="h-3 w-3" /> Africa
            </Button>
            <Button
              variant={selectedContinent === "oceania" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedContinent("oceania")}
              className="flex items-center gap-1"
            >
              <MapPin className="h-3 w-3" /> Oceania
            </Button>
          </div>
          
          {/* Dropdown for mobile */}
          <div className="sm:hidden">
            <select 
              className="border rounded-md px-3 py-1.5 bg-white" 
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
            >
              <option value="all">World</option>
              <option value="europe">Europe</option>
              <option value="northAmerica">North America</option>
              <option value="southAmerica">South America</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="oceania">Oceania</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Map Container */}
        <div className="lg:col-span-8 bg-white rounded-lg shadow-sm p-4">
          <div style={{ height: "500px" }} className="border border-gray-100 rounded-lg overflow-hidden relative">
            {mapError ? (
              // Fallback view when map fails to load
              <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-50">
                <Globe className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2 text-center">Map Visualization Unavailable</h3>
                <p className="text-sm text-gray-500 mb-6 text-center max-w-md">
                  We're unable to load the interactive map at this time. 
                  You can still browse all privacy regulations in the list view.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setMapError(false)}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
              </div>
            ) : (
              <>
                <ComposableMap
                  data-tooltip-id={tooltipId}
                  projectionConfig={{ scale: 160 }}
                >
                  <ZoomableGroup 
                    center={position.coordinates as [number, number]} 
                    zoom={position.zoom}
                  >
                    <Geographies geography={geoUrl}>
                      {({ geographies }) =>
                        geographies.map(geo => {
                          // Need to handle different map data formats
                          const props = geo.properties || {};
                          const countryCode = 
                            (props.ISO_A2 || props.iso_a2 || props.ISO_A3 || props.iso_a3 || '').toLowerCase();
                          
                          // Try to get regulation data
                          const hasRegulation = !!countryCode && getCountryRegulation(countryCode) !== undefined;
                          
                          // Use custom color or default
                          const fillColor = countryCode ? getCountryColor(countryCode) : 'hsl(0, 0%, 85%)';
                          
                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill={fillColor}
                              stroke="#FFFFFF"
                              strokeWidth={0.5}
                              style={{
                                default: {
                                  outline: "none",
                                  filter: hasRegulation ? "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.1))" : "none"
                                },
                                hover: {
                                  fill: "#4F46E5",
                                  outline: "none",
                                  cursor: "pointer",
                                  filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))"
                                },
                                pressed: {
                                  fill: "#3730A3",
                                  outline: "none"
                                }
                              }}
                              onMouseEnter={() => handleMouseEnter(geo)}
                              onMouseLeave={handleMouseLeave}
                              onClick={() => handleCountryClick(geo)}
                            />
                          );
                        })
                      }
                    </Geographies>
                  </ZoomableGroup>
                </ComposableMap>
                <Tooltip id={tooltipId} className="z-50 !bg-gray-900 !text-white !px-3 !py-2 !rounded-md !text-sm !opacity-95">
                  {tooltipContent}
                </Tooltip>
                
                {/* Map controls legend */}
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-2 rounded-md border border-gray-200 shadow-sm">
                  <div className="text-xs font-medium text-gray-500 mb-1">Map Legend</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(215, 70%, 50%)' }}></div>
                      <span className="text-xs text-gray-600">Has privacy regulation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(0, 0%, 85%)' }}></div>
                      <span className="text-xs text-gray-600">No specific regulation data</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Regulation Details */}
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
              <CardFooter className="pt-0 flex justify-between">
                <Link to="/generator">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" /> Generate Compliant Policy
                  </Button>
                </Link>
                
                <a 
                  href={selectedRegulation.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-blue-600 text-sm inline-flex items-center hover:underline"
                >
                  Official docs
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </a>
              </CardFooter>
            </Card>
          ) : (
            <Card className="bg-gray-50 border border-gray-200 shadow-sm">
              <CardContent className="p-6 text-center">
                <Globe className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">Select a Country</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Click on countries with highlighted blue color to view detailed information about their privacy regulations.
                </p>
                <div className="flex justify-center">
                  <Link to="/generator">
                    <Button className="flex items-center gap-2">
                      <Shield className="h-4 w-4" /> 
                      Create Compliant Policy
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Privacy Regulations</h3>
              <span className="text-sm text-gray-500">Found: {filteredRegulations.length}</span>
            </div>
            
            {filteredRegulations.length === 0 ? (
              <Card className="p-4 bg-gray-50 text-center">
                <p className="text-gray-500">No regulations found for your search criteria</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-1">
                {filteredRegulations.map(regulation => (
                  <div 
                    key={regulation.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors
                      ${selectedRegulation?.id === regulation.id 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                    onClick={() => setSelectedRegulation(regulation)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">{regulation.name}</h4>
                      <Badge variant="outline" className="text-xs font-normal">
                        {regulation.year}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{regulation.region}</p>
                    <div className="mt-2 flex gap-2">
                      <SeverityBadge severity={getSeverityLevel(regulation)} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Regulations Comparison Section */}
      <div className="mt-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Major Regulation Comparison</h2>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <Link to="/generator">Generate Policy</Link>
            </Button>
          </div>
        </div>
        
        <Card className="border border-gray-200 shadow-sm mb-6">
          <CardContent className="pt-6">
            <p className="text-gray-600 mb-4">
              Compare key features of major privacy regulations to understand their impact on your business and ensure your privacy policy meets all requirements.
            </p>
            
            <Tabs defaultValue="general">
              <TabsList className="mb-6">
                <TabsTrigger value="general" className="flex items-center gap-1">
                  <Info className="h-4 w-4" /> General Overview
                </TabsTrigger>
                <TabsTrigger value="requirements" className="flex items-center gap-1">
                  <Shield className="h-4 w-4" /> Key Requirements
                </TabsTrigger>
                <TabsTrigger value="penalties" className="flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4" /> Penalties & Enforcement
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="mt-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Regulation
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Region
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Year
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applicability
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {privacyRegulations.map((reg) => (
                        <tr 
                          key={reg.id} 
                          className="hover:bg-blue-50 cursor-pointer"
                          onClick={() => setSelectedRegulation(reg)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900 flex items-center gap-2">
                              {reg.name}
                              {reg.id === 'gdpr' && <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Major</Badge>}
                              {reg.id === 'ccpa' && <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Major</Badge>}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {reg.region}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {reg.year}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-md">
                            <div className="line-clamp-2">{reg.applicability}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-2 text-xs text-gray-500 text-right">Click on a row to view detailed information</div>
                </div>
              </TabsContent>
              
              <TabsContent value="requirements" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {privacyRegulations.slice(0, 6).map((reg) => (
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
                          {reg.keyRequirements.slice(0, 5).map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                          {reg.keyRequirements.length > 5 && (
                            <li className="text-blue-600">+{reg.keyRequirements.length - 5} more requirements</li>
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 text-sm text-gray-500 text-center">Click on a card to view more details</div>
              </TabsContent>
              
              <TabsContent value="penalties" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {privacyRegulations.map((reg) => {
                    const severity = getSeverityLevel(reg);
                    const severityColors = {
                      low: 'bg-yellow-50 border-yellow-200',
                      medium: 'bg-orange-50 border-orange-200',
                      high: 'bg-red-50 border-red-200'
                    };
                    
                    return (
                      <Card 
                        key={reg.id} 
                        className={`border hover:shadow-md transition-all cursor-pointer ${severityColors[severity]}`}
                        onClick={() => setSelectedRegulation(reg)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex justify-between items-center">
                            <span>{reg.id.toUpperCase()}</span>
                            <SeverityBadge severity={severity} />
                          </CardTitle>
                          <p className="text-sm text-gray-500">{reg.region}</p>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm font-medium mb-1">Penalties:</p>
                          <p className="text-sm text-gray-600">{reg.penalties}</p>
                        </CardContent>
                        <CardFooter className="pt-0 flex justify-end">
                          <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
                            <Info className="h-3 w-3" /> Details
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 mb-12">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full text-blue-600">
              <Fingerprint className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-blue-800 mb-1">Need Help With Privacy Compliance?</h3>
              <p className="text-blue-700 mb-4">
                Generate a customized privacy policy tailored to your business needs in minutes.
                Our generator creates policies compliant with all major regulations.
              </p>
              <Link to="/generator">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Create Your Privacy Policy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegulationMap;