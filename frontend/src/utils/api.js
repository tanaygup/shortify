const API_BASE_URL = "https://shortify-7rv5.vercel.app";

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
};

export const signupUser = async (name, email, password) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Signup failed");
  }

  return response.json();
};

export const logoutUser = async () => {
  await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const getCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};

export const shortenURL = async (url, slug = null) => {
  const headers = {
    // Tell the server we're sending JSON
    "Content-Type": "application/json",
  };

  // Construct the body according to your backend's expectations (data.url, data.slug)
  const bodyData = { url };
  if (slug) {
    bodyData.slug = slug;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/create`, {
      method: "POST",
      headers,
      body: JSON.stringify(bodyData),
      credentials: "include",
    });

    if (!response.ok) {
      // Try to parse a JSON error message from the backend
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! Status: ${response.status}`
      );
    }

    // Parse the successful JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error shortening URL:", error);
    throw error;
  }
};

export const generateAISlug = async (url) => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = await fetch(`${API_BASE_URL}/api/create/ai`, {
      method: "POST",
      headers,
      body: JSON.stringify({ url }),
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! Status: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating AI slugs:", error);
    throw error;
  }
};
