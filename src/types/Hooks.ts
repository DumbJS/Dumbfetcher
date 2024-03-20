import type {RequestOptions} from "./DumbfetcherOptions";

export type FetchHookFunction = BeforeFetchHookFunction & AfterFetchHookFunction
export type BeforeFetchHookFunction = (options: RequestOptions) => RequestOptions
export type AfterFetchHookFunction = (options: RequestOptions, response: Response) => any

export type Hooks = {
    beforeFetch: Map<string, BeforeFetchHookFunction>,
    afterFetchError: Map<string, AfterFetchHookFunction>,
    afterFetchSuccess: Map<string, AfterFetchHookFunction>
}
