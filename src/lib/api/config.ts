const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://abitus-api.geia.vip';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  method: HttpMethod;
  headers?: HeadersInit;
  body?: BodyInit | null;
  params?: Record<string, string | number | boolean | undefined>;
  requiresAuth?: boolean;
}

interface ApiErrorData {
  message?: string;
  code?: string | number;
  [key: string]: unknown;
}

export class ApiError extends Error {
  status: number;
  data: ApiErrorData;

  constructor(message: string, status: number, data: ApiErrorData = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

class ApiClient {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private refreshPromise: Promise<void> | null = null;

  private async request<T>(
    endpoint: string,
    options: Omit<RequestOptions, 'method'> & { method: HttpMethod; headers?: HeadersInit }
  ): Promise<T> {
    const {
      method = 'GET',
      headers = {},
      body = null,
      params = {},
      requiresAuth = true,
    } = options;

    // Create headers object
    const requestHeaders = new Headers(headers);

    // Add content type for non-form-data requests
    if (!(body instanceof FormData)) {
      requestHeaders.set('Content-Type', 'application/json');
    }

    // Add authorization header if required
    if (requiresAuth && this.accessToken) {
      requestHeaders.set('Authorization', `Bearer ${this.accessToken}`);
    }

    // Build URL with query parameters
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    // Prepare request body
    let requestBody: BodyInit | null = null;
    if (body) {
      if (body instanceof FormData) {
        requestBody = body;
      } else if (typeof body === 'string') {
        requestBody = body;
      } else {
        requestBody = JSON.stringify(body);
      }
    }

    // Make the request
    const response = await fetch(url.toString(), {
      method,
      headers: requestHeaders,
      body: requestBody,
    });

    // Handle 401 Unauthorized with token refresh
    if (response.status === 401 && requiresAuth && this.refreshToken) {
      if (!this.refreshPromise) {
        this.refreshPromise = this.refreshAccessToken();
      }
      
      try {
        await this.refreshPromise;
        // Retry the original request with the new token
        return this.request<T>(endpoint, options);
      } finally {
        this.refreshPromise = null;
      }
    }

    // Parse response
    const data = await this.parseResponse(response);

    if (!response.ok) {
      throw new ApiError(
        data.message || 'An error occurred',
        response.status,
        data
      );
    }

    return data as T;
  }

  // eslint-disable-next-line  
  private async parseResponse(response: Response): Promise<any> {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    return response.text();
  }

  private async refreshAccessToken(): Promise<void> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data: { accessToken: string; refreshToken: string } = await response.json();
      this.setTokens(data.accessToken, data.refreshToken);
    } catch (error) {
      this.clearTokens();
      // Redirect to login or handle token refresh failure
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw error;
    } finally {
      this.refreshPromise = null;
    }
  }

  public setTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    // You might want to store these in localStorage or cookies
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  public clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  public async get<T>(
    endpoint: string,
    params: Record<string, string | number | boolean | undefined> = {},
    requiresAuth = true,
    customHeaders?: HeadersInit
  ): Promise<T> {
    return this.request<T>(endpoint, { 
      method: 'GET', 
      params, 
      requiresAuth, 
      headers: customHeaders 
    });
  }

  public async post<T>(
    endpoint: string,
    body: BodyInit | Record<string, unknown> = {},
    requiresAuth = true,
    customHeaders?: HeadersInit
  ): Promise<T> {
    return this.request<T>(endpoint, { 
      method: 'POST', 
      body: body as BodyInit, 
      requiresAuth, 
      headers: customHeaders 
    });
  }

  public async put<T>(
    endpoint: string,
    body: BodyInit | Record<string, unknown> = {},
    requiresAuth = true,
    customHeaders?: HeadersInit
  ): Promise<T> {
    return this.request<T>(endpoint, { 
      method: 'PUT', 
      body: body as BodyInit, 
      requiresAuth, 
      headers: customHeaders 
    });
  }

  public async delete<T>(
    endpoint: string,
    params: Record<string, string | number | boolean | undefined> = {},
    requiresAuth = true,
    customHeaders?: HeadersInit
  ): Promise<T> {
    return this.request<T>(endpoint, { 
      method: 'DELETE', 
      params, 
      requiresAuth, 
      headers: customHeaders 
    });
  }
}

export const apiClient = new ApiClient();

// Initialize tokens from localStorage on client side
if (typeof window !== 'undefined') {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  if (accessToken && refreshToken) {
    apiClient.setTokens(accessToken, refreshToken);
  }
}
