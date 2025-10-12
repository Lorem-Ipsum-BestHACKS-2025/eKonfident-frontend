// API utility functions for connecting to the backend

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body !== "string") {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.text();
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status,
        errorData,
      );
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    return await response.text();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Network error or server unavailable", 0, error.message);
  }
}

// API endpoints
export const api = {
  // Database endpoints
  database: {
    getStats: () => apiCall("/database/stats"),
  },

  // AI endpoints
  ai: {
    analyze: (params = {}) => {
      const queryParams = new URLSearchParams();
      if (params.konfident !== undefined)
        queryParams.append("konfident", params.konfident);
      if (params.city) queryParams.append("city", params.city);
      const queryString = queryParams.toString();
      return apiCall(`/ai/analyze${queryString ? `?${queryString}` : ""}`);
    },
    analyzeByCity: (konfident) => {
      const queryParams = new URLSearchParams();
      if (konfident !== undefined) queryParams.append("konfident", konfident);
      const queryString = queryParams.toString();
      return apiCall(
        `/ai/analyze-by-city${queryString ? `?${queryString}` : ""}`,
      );
    },
    getSummary: (konfident) => {
      const queryParams = new URLSearchParams();
      if (konfident !== undefined) queryParams.append("konfident", konfident);
      const queryString = queryParams.toString();
      return apiCall(`/ai/summary${queryString ? `?${queryString}` : ""}`);
    },
  },

  // Report endpoints
  reports: {
    getAll: (params = {}) => {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined) queryParams.append(key, params[key]);
      });
      const queryString = queryParams.toString();
      return apiCall(`/report${queryString ? `?${queryString}` : ""}`);
    },
    getById: (id) => apiCall(`/report/${id}`),
    create: (reportData) =>
      apiCall("/report", {
        method: "POST",
        body: reportData,
      }),
    update: (id, reportData) =>
      apiCall(`/report/${id}`, {
        method: "PATCH",
        body: reportData,
      }),
  },

  // Comment endpoints
  comments: {
    getAll: () => apiCall("/comment"),
    getByReportId: (reportId) => apiCall(`/comment/${reportId}`),
    create: (commentData) =>
      apiCall("/comment", {
        method: "POST",
        body: commentData,
      }),
  },

  // Leaderboard endpoints
  leaderboard: {
    get: (params = {}) => {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined) queryParams.append(key, params[key]);
      });
      const queryString = queryParams.toString();
      return apiCall(`/leaderboard${queryString ? `?${queryString}` : ""}`);
    },
  },
};

export default api;
