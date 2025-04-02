import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generatePolicy, downloadPolicy } from "./controllers/policyController";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for policy generation
  app.post('/api/generate-policy', generatePolicy);
  app.post('/api/download-policy', downloadPolicy);

  // You can add more routes for saving policies, user authentication, etc.
  // if expanding the application

  const httpServer = createServer(app);

  return httpServer;
}
