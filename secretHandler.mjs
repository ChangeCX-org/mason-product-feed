import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
//Comment this to work on Lambda
// import dotenv from "dotenv";
// dotenv.config();

export const customerExportSecrets = async () => {
  const client = new SecretsManagerClient({
    region: "us-east-1"
  });

  let response;

  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: process.env.SECRET_NAME,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }

  const secretObj = JSON.parse(response.SecretString);
  return secretObj;
};
