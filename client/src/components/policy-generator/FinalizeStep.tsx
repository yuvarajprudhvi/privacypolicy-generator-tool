import React from 'react';
import { FormStepProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PolicyPreview from './PolicyPreview';
import { Copy, Download, CheckCircle2 } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

const FinalizeStep: React.FC<FormStepProps> = ({ data, prevStep, updateData }) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('preview');
  const [policyText, setPolicyText] = React.useState<string>('');

  React.useEffect(() => {
    // When component mounts, generate the policy text
    generatePolicyText();
  }, []);

  const generatePolicyText = async () => {
    setIsGenerating(true);
    try {
      // Prepare data for API call
      const requestData = {
        ...data,
        currentStep: undefined // Remove UI-only property
      };

      const response = await apiRequest('POST', '/api/generate-policy', requestData);
      const responseData = await response.json();
      setPolicyText(responseData.policyText);
    } catch (error) {
      toast({
        title: "Error Generating Policy",
        description: "There was a problem generating your policy. Please try again.",
        variant: "destructive"
      });
      console.error("Error generating policy:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyPolicy = () => {
    navigator.clipboard.writeText(policyText);
    toast({
      title: "Copied to Clipboard",
      description: "Your privacy policy has been copied to the clipboard.",
      variant: "success"
    });
  };

  const handleDownloadPolicy = async () => {
    setIsDownloading(true);
    try {
      // Request HTML version for download
      const response = await apiRequest('POST', '/api/download-policy', {
        ...data,
        currentStep: undefined,
        format: 'html'
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${data.websiteName.replace(/\s+/g, '-').toLowerCase()}-privacy-policy.html`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: "Your privacy policy has been downloaded.",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was a problem downloading your policy. Please try again.",
        variant: "destructive"
      });
      console.error("Error downloading policy:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <Card className="bg-white shadow rounded-lg">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Finalize Your Privacy Policy</h3>
          <p className="text-sm text-gray-500 mb-6">
            Review your policy and download or copy it for your website.
          </p>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 text-center">
              <div className="flex-1 flex flex-col items-center">
                <div className="rounded-full bg-green-50 p-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <h4 className="mt-2 text-sm font-medium text-gray-900">Policy Generated</h4>
                <p className="mt-1 text-xs text-gray-500">Based on your inputs</p>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="rounded-full bg-blue-50 p-3">
                  <Copy className="h-6 w-6 text-blue-500" />
                </div>
                <h4 className="mt-2 text-sm font-medium text-gray-900">Copy</h4>
                <p className="mt-1 text-xs text-gray-500">To your clipboard</p>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="rounded-full bg-purple-50 p-3">
                  <Download className="h-6 w-6 text-purple-500" />
                </div>
                <h4 className="mt-2 text-sm font-medium text-gray-900">Download</h4>
                <p className="mt-1 text-xs text-gray-500">As HTML file</p>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-6">
              <Button 
                onClick={handleCopyPolicy} 
                variant="outline"
                className="flex items-center"
                disabled={isGenerating}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Policy
              </Button>
              <Button 
                onClick={handleDownloadPolicy} 
                className="bg-primary-600 hover:bg-primary-700 text-white flex items-center"
                disabled={isGenerating || isDownloading}
              >
                <Download className="mr-2 h-4 w-4" />
                {isDownloading ? "Downloading..." : "Download Policy"}
              </Button>
            </div>

            <div className="pt-4 border-t border-gray-200 mt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="text">Plain Text</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-4">
                  <div className="bg-gray-50 rounded-md p-4">
                    <PolicyPreview data={data} fullView />
                  </div>
                </TabsContent>
                <TabsContent value="text" className="mt-4">
                  {isGenerating ? (
                    <div className="flex justify-center py-6">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-md p-4">
                      <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                        {policyText}
                      </pre>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-between mt-6 -mx-6 -mb-6 rounded-b-lg">
            <Button 
              type="button" 
              variant="outline"
              onClick={prevStep}
              className="border border-gray-300 text-gray-700"
            >
              Previous
            </Button>
            <div></div> {/* Empty div to maintain the justify-between spacing */}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default FinalizeStep;
