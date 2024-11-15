import React, { useEffect } from 'react';
import { registerFoodTruck } from './api'; // Import the registerFoodTruck function

const TestTenantRegistration: React.FC = () => {
  useEffect(() => {
    // Make sure to call the registerFoodTruck function when the component mounts
    const registerTenant = async () => {
      try {
        const apiKey = "apiKey"; // Replace with a valid API key
        const tenantName = "Shrek"; // Example name
        const tenantId = await registerFoodTruck(apiKey, tenantName);
        console.log("Tenant registered with ID:", tenantId); // Log the tenant ID
      } catch (error) {
        console.error("Error registering tenant:", error);
      }
    };

    registerTenant();
  }, []);

  return (
    <div>
      <h1>Test Tenant Registration</h1>
      <p>Check the console for tenant registration results.</p>
    </div>
  );
};

export default TestTenantRegistration;
