var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const DumbfetcherHooks = Object.freeze({
    'beforeFetch': 'beforeFetch',
    'afterFetchSuccess': 'afterFetchSuccess',
    'afterFetchError': 'afterFetchError',
});
export const Dumbfetcher = function (baseURL, defaultOptions) {
    defaultOptions = defaultOptions || { debug: true };
    const hooks = {
        [DumbfetcherHooks.beforeFetch]: new Map(),
        [DumbfetcherHooks.afterFetchSuccess]: new Map(),
        [DumbfetcherHooks.afterFetchError]: new Map()
    };
    return {
        fetch: function (url, requestOptions) {
            return __awaiter(this, void 0, void 0, function* () {
                requestOptions = Object.assign({}, defaultOptions.requestOptions, requestOptions);
                //? beforeFetch hook
                for (const [name, fn] of hooks.beforeFetch) {
                    if (defaultOptions.debug) {
                        console.debug(`1️⃣ beforeFetch: ${name} hook called`);
                    }
                    requestOptions = yield fn.call(null, requestOptions);
                }
                // *URl construction
                let fetchUrl = new URL(url, baseURL);
                // *URL SearchParams construction
                const query = {};
                for (const key in requestOptions.query) {
                    //Removes URLQuery with null values
                    const value = requestOptions.query[key];
                    if (value) {
                        query[key] = value;
                    }
                }
                fetchUrl.search = new URLSearchParams(query).toString();
                return fetch(fetchUrl.toString(), {
                    headers: new Headers(requestOptions.headers),
                    method: requestOptions.method,
                    body: requestOptions.body
                }).then(function (response) {
                    return __awaiter(this, void 0, void 0, function* () {
                        return new Promise(function (resolve, reject) {
                            return __awaiter(this, void 0, void 0, function* () {
                                if (!response.ok) {
                                    //? afterFetchError hook
                                    for (const [name, fn] of hooks.afterFetchError) {
                                        if (defaultOptions.debug) {
                                            console.debug(`1️⃣ afterFetchError: ${name} hook called`);
                                        }
                                        response = yield fn.call(null, requestOptions, response);
                                    }
                                    return reject(response);
                                }
                                //? afterFetchSuccess hook
                                for (const [name, fn] of hooks.afterFetchSuccess) {
                                    if (defaultOptions.debug) {
                                        console.debug(`1️⃣ afterFetchSuccess: ${name} hook called`);
                                    }
                                    response = yield fn.call(null, requestOptions, response);
                                }
                                return resolve(response);
                            });
                        });
                    });
                });
            });
        },
        hooks: {
            add: function (hookName, name, fn) {
                if (!Object.prototype.hasOwnProperty.call(hooks, hookName)) {
                    return;
                }
                hooks[hookName].set(name, fn);
            },
            remove: function (hookName, name) {
                if (!Object.prototype.hasOwnProperty.call(hooks, hookName)) {
                    return;
                }
                hooks[hookName].delete(name);
            }
        }
    };
};
//# sourceMappingURL=index.js.map