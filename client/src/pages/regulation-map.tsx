import React, { useState, useMemo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { privacyRegulations, getCountryColor, getCountryRegulation, RegulationInfo } from '@/lib/regulationData';
import { ArrowUpRight, Globe, Shield, AlertTriangle } from 'lucide-react';

// URL for the map topology JSON
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const RegulationMap: React.FC = () => {
  const [tooltipContent, setTooltipContent] = useState<string>("");
  const [tooltipId, setTooltipId] = useState<string>("map-tooltip");
  const [selectedRegulation, setSelectedRegulation] = useState<RegulationInfo | null>(null);
  const [selectedContinent, setSelectedContinent] = useState<string>("all");

  // Memoize the filtered regulations to avoid recalculating on every render
  const filteredRegulations = useMemo(() => {
    if (selectedContinent === "all") {
      return privacyRegulations;
    }
    return privacyRegulations.filter(reg => {
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
  }, [selectedContinent]);

  const handleCountryClick = (geo: any) => {
    const { NAME, ISO_A2 } = geo.properties;
    const regulation = getCountryRegulation(ISO_A2.toLowerCase());
    
    if (regulation) {
      setSelectedRegulation(regulation);
    } else {
      setTooltipContent(`${NAME}: No specific privacy regulation data available`);
    }
  };

  const handleMouseEnter = (geo: any) => {
    const { NAME, ISO_A2 } = geo.properties;
    const regulation = getCountryRegulation(ISO_A2.toLowerCase());
    
    if (regulation) {
      setTooltipContent(`${NAME}: ${regulation.name} (${regulation.year})`);
    } else {
      setTooltipContent(`${NAME}: No specific regulation data`);
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
      <h1 className="text-3xl font-bold text-center mb-8">Global Privacy Regulation Map</h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Explore privacy regulations across the globe. Click on countries to see detailed information about their privacy laws and requirements.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Map Container */}
        <div className="lg:col-span-8 bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-wrap justify-center mb-4 gap-2">
            <Button
              variant={selectedContinent === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedContinent("all")}
              className="flex items-center gap-1"
            >
              <Globe className="h-4 w-4" /> World
            </Button>
            <Button
              variant={selectedContinent === "europe" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedContinent("europe")}
            >
              Europe
            </Button>
            <Button
              variant={selectedContinent === "northAmerica" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedContinent("northAmerica")}
            >
              North America
            </Button>
            <Button
              variant={selectedContinent === "southAmerica" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedContinent("southAmerica")}
            >
              South America
            </Button>
            <Button
              variant={selectedContinent === "asia" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedContinent("asia")}
            >
              Asia
            </Button>
            <Button
              variant={selectedContinent === "africa" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedContinent("africa")}
            >
              Africa
            </Button>
            <Button
              variant={selectedContinent === "oceania" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedContinent("oceania")}
            >
              Oceania
            </Button>
          </div>

          <div style={{ height: "500px" }} className="border border-gray-100 rounded-lg overflow-hidden">
            <ComposableMap
              data-tooltip-id={tooltipId}
              projectionConfig={{ scale: 160 }}
            >
              <ZoomableGroup 
                center={position.coordinates} 
                zoom={position.zoom}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map(geo => {
                      const { ISO_A2 } = geo.properties;
                      const countryCode = ISO_A2 ? ISO_A2.toLowerCase() : '';
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={getCountryColor(countryCode)}
                          stroke="#FFFFFF"
                          strokeWidth={0.5}
                          style={{
                            default: {
                              outline: "none",
                            },
                            hover: {
                              fill: "#4F46E5",
                              outline: "none",
                              cursor: "pointer"
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
            <Tooltip id={tooltipId} className="z-50">
              {tooltipContent}
            </Tooltip>
          </div>

          <div className="flex items-center justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'hsl(215, 70%, 50%)' }}></div>
              <span className="text-sm text-gray-600">Has privacy regulation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'hsl(0, 0%, 85%)' }}></div>
              <span className="text-sm text-gray-600">No specific regulation data</span>
            </div>
          </div>
        </div>

        {/* Regulation Details */}
        <div className="lg:col-span-4">
          {selectedRegulation ? (
            <Card>
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
                  <p className="text-sm text-gray-700">{selectedRegulation.penalties}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2">Applicability</h4>
                  <p className="text-sm text-gray-700">{selectedRegulation.applicability}</p>
                </div>
                
                <a 
                  href={selectedRegulation.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-blue-600 text-sm inline-flex items-center hover:underline mt-2"
                >
                  Official documentation
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </a>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gray-50">
              <CardContent className="p-6 text-center">
                <Globe className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">Select a Country</h3>
                <p className="text-sm text-gray-500">
                  Click on a country on the map to view detailed information about its privacy regulations.
                </p>
              </CardContent>
            </Card>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Privacy Regulations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {filteredRegulations.map(regulation => (
                <div 
                  key={regulation.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors
                    ${selectedRegulation?.id === regulation.id 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                  onClick={() => setSelectedRegulation(regulation)}
                >
                  <h4 className="font-medium text-sm">{regulation.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{regulation.region} · {regulation.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Regulations Comparison Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Major Regulation Comparison</h2>
        
        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General Overview</TabsTrigger>
            <TabsTrigger value="requirements">Key Requirements</TabsTrigger>
            <TabsTrigger value="penalties">Penalties & Enforcement</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Regulation
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Region
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year Effective
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicability
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {privacyRegulations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{reg.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reg.region}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reg.year}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-md">
                        {reg.applicability}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="requirements" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {privacyRegulations.slice(0, 6).map((reg) => (
                <Card key={reg.id} className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{reg.name}</CardTitle>
                    <p className="text-sm text-gray-500">{reg.region}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      {reg.keyRequirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="penalties" className="mt-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Regulation
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Region
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Penalties
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {privacyRegulations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{reg.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reg.region}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {reg.penalties}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RegulationMap;