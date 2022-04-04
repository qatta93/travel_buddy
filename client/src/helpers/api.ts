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
  try {
    const res = await fetch(`${host}${path}`, {
      credentials: 'include',
      ...options,
    });
    const json = await res.json();
    return json;
  } catch (err) {
    if (err instanceof Error) {
      return { status: 'error', message: err.message };
    }
    return { status: 'error', message: 'There was an error with your request' };
  }
};
