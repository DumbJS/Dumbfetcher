export type requestOptions = {
    searchParams: object;
    headers: HeadersInit;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS' | 'DELETE';
    body: BodyInit;
};
export type DumbfetcherOptions = {
    requestOptions: requestOptions;
    debug: boolean;
};
