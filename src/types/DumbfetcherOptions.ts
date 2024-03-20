export type RequestOptions = RequestInit & {
    query: object
}

export type DumbfetcherOptions = {
    requestOptions: Partial<RequestOptions>
    debug:boolean
}


