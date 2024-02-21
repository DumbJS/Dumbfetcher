export type requestOptions = {
    query: object
    headers: HeadersInit,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS' | 'DELETE',
    body: BodyInit
}

export type DumbfetcherOptions = {
    requestOptions: Partial<requestOptions>
    debug:boolean
}


