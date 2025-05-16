// CoffeeApi.tsx
// Basic API class for GET and POST requests to the backend

export class CoffeeApi {
  // Use Vite's import.meta.env for environment variables
  private baseUrl: string = import.meta.env.VITE_REACT_APP_COFFEE_API; // Ensure this is set in your .env file

  async get<T>(endpoint: string, token?: string): Promise<T> {
    const headers: Record<string, string> = {
      Accept: "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    let response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      headers,
      credentials: "include", // include cookies for auth if needed
    });
    if (response.status === 401 && token && typeof window !== "undefined") {
      // Try to refresh token
      const refreshed = await this.tryRefreshToken();
      if (refreshed) {
        const newToken = localStorage.getItem("accessToken");
        if (newToken) {
          headers["Authorization"] = `Bearer ${newToken}`;
          response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "GET",
            headers,
            credentials: "include",
          });
        }
      }
    }
    if (!response.ok) {
      throw new Error(`GET ${endpoint} failed: ${response.status}`);
    }
    return response.json();
  }

  async post<T, U>(endpoint: string, data: U, token?: string): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    let response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (response.status === 401 && token && typeof window !== "undefined") {
      // Try to refresh token
      const refreshed = await this.tryRefreshToken();
      if (refreshed) {
        // Retry original request with new token
        const newToken = localStorage.getItem("accessToken");
        if (newToken) {
          headers["Authorization"] = `Bearer ${newToken}`;
          response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "POST",
            headers,
            credentials: "include",
            body: JSON.stringify(data),
          });
        }
      }
    }
    if (!response.ok) {
      throw new Error(`POST ${endpoint} failed: ${response.status}`);
    }
    return response.json();
  }

  private async tryRefreshToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return false;
    const response = await fetch(`${this.baseUrl}/api/User/RefreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(refreshToken),
    });
    if (!response.ok) return false;
    const data = await response.json();
    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      if (data.refreshToken)
        localStorage.setItem("refreshToken", data.refreshToken);
      return true;
    }
    return false;
  }
}

// Example usage:
// const api = new CoffeeApi();
// api.get('/api/Ingredients/Index');
// api.post('/api/Ingredients/Create', { name: 'Coffee Beans' });
