export type requestOptions = {
    query: object
    headers: HeadersInit,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS' | 'DELETE',
    body: BodyInit,
    additional: object
}

export type DumbfetcherOptions = {
    requestOptions: requestOptions
    debug:boolean
}


