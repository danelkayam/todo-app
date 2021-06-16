import axios, { Method } from 'axios';

export class NetworkError extends Error {
    constructor(readonly message: string, readonly code: number) {
        super(message);
        this.code = code;
    }
}

export type RequestMethod = Method;

export default function performRequest({
    url,
    method,
    data,
    token,
}: {
    url: string;
    method: RequestMethod;
    data?: object;
    token?: string;
}): Promise<any> {
    const headers = !!token ? { Authorization: `Bearer ${token}` } : undefined;

    return axios
        .request({ url, method, data, headers })
        .then(({ data }) => data.data)
        .catch((error) => {
            const message = error.response.data?.error?.message || null;

            if (!!message) {
                throw new NetworkError(message, error.response.code);
            }

            throw error;
        });
}
