import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CheckCircle, AlertCircle, FileText, Upload, ChevronDown, ChevronUp } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { privacyRegulations } from '@/lib/regulationData';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const formSchema = z.object({
  policyText: z.string().min(100, 'Policy text must be at least 100 characters'),
  regulations: z.array(z.string()).min(1, 'Select at least one regulation')
});

type FormValues = z.infer<typeof formSchema>;

interface PolicyCheckResult {
  regulationId: string;
  name: string;
  countryCode: string;
  complianceScore: number;
  missingRequirements: string[];
  presentRequirements: string[];
  suggestedImprovements: string[];
}

const PolicyVerification: React.FC = () => {
  const [results, setResults] = useState<PolicyCheckResult[] | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [expandedRegulations, setExpandedRegulations] = useState<Set<string>>(new Set());

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      policyText: '',
      regulations: []
    }
  });

  const toggleRegulation = (id: string) => {
    setExpandedRegulations(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      return newExpanded;
    });
  };

  const checkPolicyCompliance = (policyText: string, selectedRegulations: string[]): PolicyCheckResult[] => {
    // This would typically be a complex API call, but for this implementation, 
    // we'll use a simplified approach that checks for key phrases in the policy text
    
    return selectedRegulations.map(regulationId => {
      const regulation = privacyRegulations.find(r => r.id === regulationId);
      
      if (!regulation) {
        return {
          regulationId,
          name: 'Unknown Regulation',
          countryCode: 'XX',
          complianceScore: 0,
          missingRequirements: ['Regulation not found'],
          presentRequirements: [],
          suggestedImprovements: ['Select a valid regulation']
        };
      }
      
      const presentRequirements: string[] = [];
      const missingRequirements: string[] = [];
      
      // Check each requirement against the policy text
      regulation.keyRequirements.forEach(requirement => {
        // This is a very simplified check - a real implementation would use
        // more advanced NLP techniques to determine if a requirement is met
        const keyPhrases = extractKeyPhrases(requirement);
        const isRequirementPresent = keyPhrases.some(phrase => 
          policyText.toLowerCase().includes(phrase.toLowerCase())
        );
        
        if (isRequirementPresent) {
          presentRequirements.push(requirement);
        } else {
          missingRequirements.push(requirement);
        }
      });
      
      // Calculate a simple compliance score
      const complianceScore = regulation.keyRequirements.length > 0 
        ? (presentRequirements.length / regulation.keyRequirements.length) * 100 
        : 0;
      
      // Generate suggested improvements based on missing requirements
      const suggestedImprovements = missingRequirements.map(req => 
        `Add a section addressing: ${req}`
      );
      
      return {
        regulationId,
        name: regulation.name,
        countryCode: regulation.countryCode,
        complianceScore: Math.round(complianceScore),
        missingRequirements,
        presentRequirements,
        suggestedImprovements
      };
    });
  };
  
  const extractKeyPhrases = (requirement: string): string[] => {
    // A simplified function to extract key phrases from a requirement
    // In a real implementation, this would use more sophisticated NLP techniques
    const phrases = requirement.split(/[,.;:]/).filter(p => p.trim().length > 3);
    return phrases.map(p => p.trim().toLowerCase());
  };

  const onSubmit = (values: FormValues) => {
    setIsChecking(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = checkPolicyCompliance(values.policyText, values.regulations);
      setResults(results);
      setIsChecking(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy Verification</h1>
      <p className="text-gray-600 mb-8">
        Upload your existing privacy policy to check compliance with various international regulations
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Policy</CardTitle>
              <CardDescription>
                Paste your privacy policy text below or upload a file
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="policyText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Privacy Policy Text</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Paste your privacy policy here..." 
                            className="min-h-[300px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <Label>Select Regulations to Check Against</Label>
                    <div className="border rounded-md p-4 max-h-[300px] overflow-y-auto space-y-3">
                      <FormField
                        control={form.control}
                        name="regulations"
                        render={() => (
                          <FormItem>
                            {privacyRegulations.map((regulation) => (
                              <div key={regulation.id} className="flex items-center space-x-2 py-1">
                                <FormControl>
                                  <Checkbox
                                    checked={form.watch('regulations').includes(regulation.id)}
                                    onCheckedChange={(checked) => {
                                      const currentValues = form.getValues('regulations');
                                      const newValues = checked
                                        ? [...currentValues, regulation.id]
                                        : currentValues.filter(id => id !== regulation.id);
                                      form.setValue('regulations', newValues, { shouldValidate: true });
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="cursor-pointer font-normal">
                                  {regulation.name} ({regulation.region})
                                </FormLabel>
                              </div>
                            ))}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isChecking}>
                    {isChecking ? 'Checking...' : 'Verify Policy'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-7">
          {results === null ? (
            <Card className="h-full flex flex-col justify-center items-center py-16 text-gray-500">
              <FileText className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-lg">Verification results will appear here</p>
              <p className="text-sm max-w-md text-center mt-2">
                Select at least one regulation and submit your policy to see compliance analysis
              </p>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Compliance Results</CardTitle>
                <CardDescription>
                  Analysis of your policy against selected regulations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="summary">
                  <TabsList className="mb-4">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="detailed">Detailed Results</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="summary">
                    <div className="space-y-4">
                      {results.map((result) => (
                        <div 
                          key={result.regulationId} 
                          className="border rounded-md p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div 
                                className={`w-3 h-3 rounded-full mr-3 ${
                                  result.complianceScore >= 80 ? 'bg-green-500' : 
                                  result.complianceScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                              />
                              <h3 className="font-medium">{result.name}</h3>
                            </div>
                            <span 
                              className={`font-bold ${
                                result.complianceScore >= 80 ? 'text-green-600' : 
                                result.complianceScore >= 50 ? 'text-yellow-600' : 'text-red-600'
                              }`}
                            >
                              {result.complianceScore}%
                            </span>
                          </div>
                          
                          <div className="h-2 bg-gray-200 rounded-full mb-3">
                            <div 
                              className={`h-2 rounded-full ${
                                result.complianceScore >= 80 ? 'bg-green-500' : 
                                result.complianceScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${result.complianceScore}%` }}
                            />
                          </div>

                          {result.complianceScore < 100 && (
                            <Alert variant="destructive" className="mt-3">
                              <AlertCircle className="h-4 w-4" />
                              <AlertTitle>Missing Requirements</AlertTitle>
                              <AlertDescription>
                                Your policy is missing {result.missingRequirements.length} key requirements
                                for {result.name} compliance.
                              </AlertDescription>
                            </Alert>
                          )}

                          {result.complianceScore === 100 && (
                            <Alert className="mt-3 bg-green-50 text-green-800 border-green-200">
                              <CheckCircle className="h-4 w-4" />
                              <AlertTitle>Fully Compliant</AlertTitle>
                              <AlertDescription>
                                Your policy appears to address all key requirements for {result.name}.
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="detailed">
                    <ScrollArea className="max-h-[600px] pr-4">
                      <div className="space-y-6">
                        {results.map((result) => (
                          <Collapsible 
                            key={result.regulationId}
                            open={expandedRegulations.has(result.regulationId)}
                            onOpenChange={() => toggleRegulation(result.regulationId)}
                            className="border rounded-md overflow-hidden"
                          >
                            <div className="p-4 flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div 
                                  className={`w-3 h-3 rounded-full ${
                                    result.complianceScore >= 80 ? 'bg-green-500' : 
                                    result.complianceScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                />
                                <h3 className="font-medium">{result.name}</h3>
                                <span className="text-sm text-gray-500">({result.complianceScore}% compliant)</span>
                              </div>
                              <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  {expandedRegulations.has(result.regulationId) ? 
                                    <ChevronUp className="h-4 w-4" /> : 
                                    <ChevronDown className="h-4 w-4" />
                                  }
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                            
                            <CollapsibleContent>
                              <div className="p-4 pt-0 border-t">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium text-green-600 mb-2 flex items-center">
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Present Requirements ({result.presentRequirements.length})
                                    </h4>
                                    <ul className="space-y-2 text-sm">
                                      {result.presentRequirements.length > 0 ? (
                                        result.presentRequirements.map((req, i) => (
                                          <li key={i} className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <span>{req}</span>
                                          </li>
                                        ))
                                      ) : (
                                        <li className="text-gray-500 italic">No requirements met</li>
                                      )}
                                    </ul>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-medium text-red-600 mb-2 flex items-center">
                                      <AlertCircle className="h-4 w-4 mr-2" />
                                      Missing Requirements ({result.missingRequirements.length})
                                    </h4>
                                    <ul className="space-y-2 text-sm">
                                      {result.missingRequirements.length > 0 ? (
                                        result.missingRequirements.map((req, i) => (
                                          <li key={i} className="flex items-start">
                                            <span className="text-red-500 mr-2">✗</span>
                                            <span>{req}</span>
                                          </li>
                                        ))
                                      ) : (
                                        <li className="text-gray-500 italic">All requirements met</li>
                                      )}
                                    </ul>
                                  </div>
                                </div>
                                
                                {result.missingRequirements.length > 0 && (
                                  <div className="mt-4">
                                    <h4 className="font-medium mb-2">Suggested Improvements</h4>
                                    <ul className="space-y-2 text-sm">
                                      {result.suggestedImprovements.map((suggestion, i) => (
                                        <li key={i} className="flex items-start">
                                          <span className="text-blue-500 mr-2">→</span>
                                          <span>{suggestion}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicyVerification;