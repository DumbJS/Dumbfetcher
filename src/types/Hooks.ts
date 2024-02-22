import type {requestOptions} from "./DumbfetcherOptions";

export type FetchHookFunction = BeforeFetchHookFunction & AfterFetchHookFunction
export type BeforeFetchHookFunction = (options: requestOptions) => requestOptions
export type AfterFetchHookFunction = (options: requestOptions, response: Response) => Response

export type Hooks = {
    beforeFetch: Map<string, BeforeFetchHookFunction>,
    afterFetchError: Map<string, AfterFetchHookFunction>,
    afterFetchSuccess: Map<string, AfterFetchHookFunction>
}
