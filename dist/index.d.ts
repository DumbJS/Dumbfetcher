import type { DumbfetcherOptions, requestOptions } from "./types/DumbfetcherOptions";
import type { DumbfetcherHooks, FetchHookFunction } from "./types/DumbfetcherHooks";
export default function Dumbfetcher(baseURL: string, defaultOptions: Partial<DumbfetcherOptions>): {
    fetch: (url: string, requestOptions: Partial<requestOptions>) => Promise<unknown>;
    hooks: {
        add: (hookName: keyof DumbfetcherHooks, name: string, fn: FetchHookFunction) => void;
        remove: (hookName: keyof DumbfetcherHooks, name: string) => void;
    };
};
