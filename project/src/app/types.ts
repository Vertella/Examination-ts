// types.ts

// Represents the response when fetching an API key
export interface ApiKeyResponse {
    apiKey: string;
  }
  
  // Represents the response when registering a tenant
  export interface TenantResponse {
    tenantId: string;
  }
  
  export interface MenuItem {
    id: number;
    type: string;
    name: string;
    ingredients: string[]; 
    price: number;
  }
  // Represents the structure of each menu item type
  export interface MenuItems {
    wontons:{ items: MenuItem[] }; // Adjust if items are objects
    dips: { items: MenuItem[] };
    drinks: { items: MenuItem[] };
  }
  

  
  // Define the props for CartComponent
  //export interface CartComponentProps {
    //cartItems: CartItem[]; // Array of CartItem objects
  //}

  export interface CartItem extends MenuItem {
    quantity: number;
  }