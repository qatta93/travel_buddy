const host = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5500';

interface Success<T> {
  status: 'success';
  data: T;
}

interface ErrorMessage {
  status: 'error';
  message: string;
}

interface Options {
  [key: string] : any
}

type FetchReturn<T> = Success<T> | ErrorMessage;

export const fetchApi = async <T>(path: string, options: Options = {}): Promise<FetchReturn<T>> => {
  const res = await fetch(`${host}${path}`, options);
  const json = await res.json();
  return json;
};
