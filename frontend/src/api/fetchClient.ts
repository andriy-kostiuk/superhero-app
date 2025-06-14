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

  return fetch(createUrl(url), options).then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.status === 204 ? (null as T) : response.json();
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
