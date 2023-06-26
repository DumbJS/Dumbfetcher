import type { requestOptions } from "./DumbfetcherOptions";
export type FetchHookFunction = BeforeFetchHookFunction & AfterFetchHookFunction;
export type BeforeFetchHookFunction = (options: requestOptions) => requestOptions;
export type AfterFetchHookFunction = (options: requestOptions) => Response;
export type DumbfetcherHooks = {
    beforeFetch: Map<string, BeforeFetchHookFunction>;
    afterFetchError: Map<string, AfterFetchHookFunction>;
    afterFetchSuccess: Map<string, AfterFetchHookFunction>;
};
