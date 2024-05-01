import fetch from "node-fetch";
import { ClientBuilder } from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { createApiBuilderFromCtpClient as createImportApiBuilderFromCtpClient } from "@commercetools/importapi-sdk";

// import { customerExportSecrets } from "./secretHandler.js";
import dotenv from "dotenv";
 const env = dotenv.config();

// const secret = await customerExportSecrets();

export const projectKey = process.env.CT_PROJECT_KEY || "ERROR";
const scopes = ["manage_project:" + projectKey];

// Configure authMiddlewareOptions
const authMiddlewareOptions = {
  host: process.env.CT_AUTH_URL || "ERROR",
  projectKey: projectKey,
  credentials: {
    clientId: process.env.CT_CLIENT_ID || "ERROR",
    clientSecret: process.env.CT_CLIENT_SECRET || "ERROR",
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions = {
  host: process.env.CT_API_URL || "ERROR",
  includeHeaders: true,
  maskSensitiveHeaderData: true,
  includeResponseHeaders: true,
  fetch,
};

const httpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();


export const getApiRoot = () => {
  return createApiBuilderFromCtpClient(httpClient);
};

export const httpApiRoot = createApiBuilderFromCtpClient(httpClient);
