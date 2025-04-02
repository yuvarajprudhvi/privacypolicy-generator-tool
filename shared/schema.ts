import { pgTable, text, serial, integer, boolean, json, varchar, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table (keeping from original schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const policySettings = pgTable("policy_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  websiteName: varchar("website_name", { length: 255 }).notNull(),
  websiteUrl: varchar("website_url", { length:
  255 }).notNull(),
  websiteType: varchar("website_type", { length: 100 }).notNull(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  companyEmail: varchar("company_email", { length: 255 }).notNull(),
  companyCountry: varchar("company_country", { length: 100 }).notNull(),
  dataCollected: json("data_collected").$type<string[]>().notNull(),
  dataRetentionPeriod: varchar("data_retention_period", { length: 100 }).notNull(),
  useCookies: boolean("use_cookies").notNull().default(false),
  cookieTypes: json("cookie_types").$type<string[]>(),
  thirdPartyServices: json("third_party_services").$type<Record<string, string[]>>(),
  otherThirdPartyServices: text("other_third_party_services"),
  gdprCompliance: boolean("gdpr_compliance").notNull().default(false),
  ccpaCompliance: boolean("ccpa_compliance").notNull().default(false),
  childrenPolicy: boolean("children_policy").notNull().default(false),
  effectiveDate: date("effective_date"),
  createdAt: date("created_at").notNull().default(new Date()),
  updatedAt: date("updated_at").notNull().default(new Date()),
});

export const insertPolicySettingsSchema = createInsertSchema(policySettings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Defining enums for form data
export const websiteTypes = [
  "e-commerce",
  "blog",
  "portfolio",
  "saas",
  "social_media",
  "news",
  "forum",
  "educational",
  "other"
] as const;

export const dataCollectionTypes = [
  "name",
  "email",
  "phone",
  "address",
  "payment_info",
  "ip_address",
  "cookies",
  "location",
  "device_info",
  "browsing_behavior",
  "purchase_history",
  "social_media_profiles",
  "other"
] as const;

export const dataRetentionPeriods = [
  "30_days",
  "90_days",
  "180_days",
  "1_year",
  "2_years",
  "5_years",
  "indefinite"
] as const;

export const cookieTypes = [
  "essential",
  "functionality",
  "analytics",
  "advertising",
  "third_party",
  "other"
] as const;

export const thirdPartyCategories = [
  "analytics",
  "advertising",
  "payment",
  "social",
  "hosting",
  "email_marketing",
  "other"
] as const;

export const thirdPartyServiceOptions = {
  analytics: ["Google Analytics", "Hotjar", "Facebook Pixel", "Mixpanel", "Amplitude", "Plausible"],
  advertising: ["Google Ads", "Facebook Ads", "Twitter Ads", "LinkedIn Ads", "Bing Ads"],
  payment: ["Stripe", "PayPal", "Square", "Apple Pay", "Google Pay", "Amazon Pay"],
  social: ["Facebook Login", "Google Login", "Twitter Sharing", "LinkedIn Sharing", "Instagram Integration"],
  hosting: ["AWS", "Google Cloud", "Microsoft Azure", "Netlify", "Vercel", "Heroku"],
  email_marketing: ["Mailchimp", "SendGrid", "Constant Contact", "ConvertKit", "Hubspot"],
  other: []
};

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type PolicySettings = typeof policySettings.$inferSelect;
export type InsertPolicySettings = z.infer<typeof insertPolicySettingsSchema>;
export type WebsiteType = typeof websiteTypes[number];
export type DataCollectionType = typeof dataCollectionTypes[number];
export type DataRetentionPeriod = typeof dataRetentionPeriods[number];
export type CookieType = typeof cookieTypes[number];
export type ThirdPartyCategory = typeof thirdPartyCategories[number];
