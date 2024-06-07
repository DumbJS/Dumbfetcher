export type RequestOptions = RequestInit & {
    query: object,
    extra: object
}

export type DumbfetcherOptions = {
    requestOptions: Partial<RequestOptions>
    debug:boolean
}


