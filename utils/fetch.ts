import { toast } from "react-toastify";
import { LOCAL_STORAGE_CONSTANTS } from "@/constants";
import { hideLoader } from "./helper";

interface FetchOptions extends RequestInit {
  body?: any;
  headers?: Record<string, string>;
}

export async function customFetch(url: string, options: FetchOptions = {}) {
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: (await localStorage.getItem(
      LOCAL_STORAGE_CONSTANTS.TOKEN
    )) as string,
  };

  const headers = { ...defaultHeaders, ...options.headers };

  const fetchOptions: RequestInit = {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    ...options,
  };

  try {
    const response = await fetch(url, fetchOptions).then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      }
      return response;
    });

    let success;

    if (!response.ok) {
      const error = await response.json();
      toast.error(error.message || "Something went wrong");
      hideLoader();
      return error;
    } else if (response.ok) {
      success = await response.json();
      toast.success(success.message);
    }

    return success;
  } catch (error) {
    throw error;
  }
}
