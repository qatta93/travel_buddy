const host = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5500';

interface Success<T> {
  status: 'success';
  data: T;
}

interface ErrorMessage {
  status: 'error';
  message: string;
}

type FetchReturn<T> = Success<T> | ErrorMessage;

export const fetchApi = async <T>(path: string): Promise<FetchReturn<T>> => {
  const res = await fetch(`${host}${path}`, {
    credentials: 'include',
  });
  const json = await res.json();
  return json;
};
