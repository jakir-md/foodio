// import { getNewAccessToken } from "@/services/auth/auth.service";
import { getCookie } from "@/services/auth/tokenHandlers";

const BACKEND_API_URL =
  process.env.BACKEND_URL;

// /auth/login
const serverFetchHelper = async (
  endpoint: string,
  options: RequestInit,
): Promise<Response> => {
  const { headers, ...restOptions } = options;
  const accessToken = await getCookie("accessToken");
  console.log("accessToken", { accessToken });
  // console.log(accessToken,'accessToken in server-fetch');

  //   //to stop recursion loop
  //   if (endpoint !== "/auth/refresh-token") {
  //     await getNewAccessToken();
  //   }

  const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
    credentials: "include",
    headers: {
      Cookie: accessToken ? `accessToken=${accessToken}` : "",
      ...headers,
      // ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {}),
      // ...(accessToken ? { "Authorization": accessToken } : {}),
    },
    ...restOptions,
  });

  return response;
};

export const serverFetch = {
  get: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: async (
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "POST" }),

  put: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PUT" }),

  patch: async (
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

  delete: async (
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};
