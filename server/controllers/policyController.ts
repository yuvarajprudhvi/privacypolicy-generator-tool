import { Request, Response } from "express";
import { generatePolicyText, generatePolicyHTML } from "../utils/policyGenerator";
import { insertPolicySettingsSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export const generatePolicy = async (req: Request, res: Response) => {
  try {
    // Validate request body against schema
    const requestData = insertPolicySettingsSchema.parse(req.body);
    
    // Generate policy text based on form data
    const policyText = generatePolicyText(requestData);
    
    return res.status(200).json({
      success: true,
      policyText
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error).message;
      return res.status(400).json({ success: false, error: validationError });
    }
    
    console.error("Error generating policy:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Error generating privacy policy. Please try again." 
    });
  }
};

export const downloadPolicy = async (req: Request, res: Response) => {
  try {
    // Validate request body against schema
    const requestData = insertPolicySettingsSchema.parse(req.body);
    const format = req.body.format || 'html';
    
    if (format === 'html') {
      // Generate HTML version of policy
      const htmlContent = generatePolicyHTML(requestData);
      
      // Set content type and disposition headers
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Content-Disposition', `attachment; filename="${requestData.websiteName.replace(/\s+/g, '-').toLowerCase()}-privacy-policy.html"`);
      
      return res.send(htmlContent);
    } else {
      // Default to text format
      const policyText = generatePolicyText(requestData);
      
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Disposition', `attachment; filename="${requestData.websiteName.replace(/\s+/g, '-').toLowerCase()}-privacy-policy.txt"`);
      
      return res.send(policyText);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error).message;
      return res.status(400).json({ success: false, error: validationError });
    }
    
    console.error("Error downloading policy:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Error generating downloadable policy. Please try again." 
    });
  }
};
