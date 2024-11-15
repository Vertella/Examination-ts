// api.ts
import { ApiKeyResponse, TenantResponse, MenuItem } from "./types";
import type { NextApiRequest, NextApiResponse } from 'next'

export async function fetchApiKey(): Promise<string> {
  const response = await fetch(
    "http://yumyum-assets.s3-website.eu-north-1.amazonaws.com/keys",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch API key");
  }

  const data: ApiKeyResponse = await response.json();
  console.log(data.apiKey);


  return data.apiKey;
}

export async function registerFoodTruck(apiKey: string): Promise<string> {
  const response = await fetch(
    "http://yumyum-assets.s3-website.eu-north-1.amazonaws.com/tenants",
    {
      method: "POST",
      headers: {
        "x-zocom": apiKey, // Include the API key in the header
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Yum Yum Gim Mi Sum", // Example payload
        // other registration details, like location, type, etc.
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to register food truck");
  }

  const data: TenantResponse = await response.json();
  return data.tenantId; // Assuming this is the field returned from registration
}

export async function fetchMenuItems(type: string,
  apiKey: string) {
    const response = await fetch(`https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu?type=${type}`, {
        method: "GET",
        headers: {
          "x-zocom": "yum-KwOi5vm2TYNmi8Dd",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} items: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }
