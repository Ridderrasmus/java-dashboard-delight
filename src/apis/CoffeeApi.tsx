// CoffeeApi.tsx
// Basic API class for GET and POST requests to the backend

export class CoffeeApi {
  // Use Vite's import.meta.env for environment variables
  private baseUrl: string = import.meta.env.VITE_REACT_APP_COFFEE_API; // Ensure this is set in your .env file

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include", // include cookies for auth if needed
    });
    if (!response.ok) {
      throw new Error(`GET ${endpoint} failed: ${response.status}`);
    }
    return response.json();
  }

  async post<T, U>(endpoint: string, data: U): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`POST ${endpoint} failed: ${response.status}`);
    }
    return response.json();
  }
}

// Example usage:
// const api = new CoffeeApi();
// api.get('/api/Ingredients/Index');
// api.post('/api/Ingredients/Create', { name: 'Coffee Beans' });
