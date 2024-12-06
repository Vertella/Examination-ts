// api.ts
import { ApiKeyResponse, TenantResponse } from "./types";

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

export async function registerFoodTruck(apiKey: string, name: string ): Promise<string> {
  const response = await fetch(
    "http://yumyum-assets.s3-website.eu-north-1.amazonaws.com/tenants",
    {
      method: "POST",
      headers: {
        "x-zocom": apiKey, 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name
      }),
    }
  );

  if (!response.ok) {
    console.error("Registration failed:", await response.text());
    throw new Error("Failed to register food truck");
  }

  const data: TenantResponse = await response.json();
  return data.tenantId;
}

export async function fetchMenuItems(type: string,
  apiKey: string) {
    const response = await fetch(`https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu?type=${type}`, {
        method: "GET",
        headers: {
          "x-zocom": apiKey,
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

  export async function fetchOrderNumber(apiKey: string, tenantId: string, itemsToSend: number[] ): Promise<string> {
    const response = await fetch(`https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${tenantId}/orders`, {
      method: "POST",
      headers: {
        "x-zocom": apiKey,
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "items" :itemsToSend,
      }),
  }
);
  const data = await response.json();
  const orderNumber = data.order.id;
  return orderNumber;
}