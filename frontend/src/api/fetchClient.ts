import { ApiError } from '@/utils/apiError';
import { createUrl } from '@/utils/utility';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: BodyInit | Record<string, unknown> | null = null,
  isFormData: boolean = false
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = isFormData ? (data as FormData) : JSON.stringify(data);

    if (!isFormData) {
      options.headers = {
        'Content-Type': 'application/json; charset=UTF-8',
      };
    }
  }

  return fetch(createUrl(url), options).then(async (response) => {
    const contentType = response.headers.get('Content-Type');
    const isJson = contentType && contentType.includes('application/json');
    const responseData = isJson ? await response.json() : null;

    if (!response.ok) {
      throw new ApiError(
        responseData?.message ||
          `Request failed with status ${response.status}`,
        response.status,
        responseData?.errors
      );
    }

    return response.status === 204 ? (null as T) : (responseData as T);
  });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(
    url: string,
    data: BodyInit | Record<string, unknown> | null,
    isFormData = false
  ) => request<T>(url, 'POST', data, isFormData),

  patch: <T>(
    url: string,
    data: BodyInit | Record<string, unknown> | null,
    isFormData = false
  ) => request<T>(url, 'PATCH', data, isFormData),

  delete: (url: string) => request(url, 'DELETE'),
};
