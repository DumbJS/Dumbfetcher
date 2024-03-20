import type { DumbfetcherOptions, RequestOptions } from "./types/DumbfetcherOptions";
import type { Hooks, FetchHookFunction } from "./types/Hooks";
export declare const DumbfetcherHooks: Readonly<{
    beforeFetch: "beforeFetch";
    afterFetchSuccess: "afterFetchSuccess";
    afterFetchError: "afterFetchError";
}>;
export declare const Dumbfetcher: (baseURL: string, defaultOptions: Partial<DumbfetcherOptions>) => {
    fetch: (url: string, requestOptions: Partial<RequestOptions>) => Promise<unknown>;
    hooks: {
        add: (hookName: keyof Hooks, name: string, fn: FetchHookFunction) => void;
        remove: (hookName: keyof Hooks, name: string) => void;
    };
};
