import { toast } from "react-toastify";

interface FetchOptions extends RequestInit {
  body?: any; // Allow any type for the request body
  headers?: Record<string, string>;
}

export async function customFetch(url: string, options: FetchOptions = {}) {
  // Default headers
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: (await localStorage.getItem("token")) as string,
  };

  const headers = { ...defaultHeaders, ...options.headers };

  // Merge default options with passed options
  const fetchOptions: RequestInit = {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    ...options,
  };

  try {
    const response = await fetch(url, fetchOptions).then((response) => {
      if (response.redirected) {
        // If the response is a redirect (e.g., to the login page), navigate to the URL
        window.location.href = response.url; // Redirect to login or handle accordingly
      }
      return response;
    });

    let success;

    // Check if the response status is in the range 200-299 (success)
    if (!response.ok) {
      const error = await response.json();
      toast.error(error.message || "Something went wrong");
      return;
    } else if (response.ok) {
      success = await response.json();
      toast.success(success.message);
    }

    // Parse JSON response if successful
    return success;
  } catch (error) {
    throw error; // Rethrow the error or handle it as needed
  }
}
