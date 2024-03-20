import type {DumbfetcherOptions, RequestOptions} from "./types/DumbfetcherOptions";
import type {
  Hooks,
  FetchHookFunction
} from "./types/Hooks";


export const DumbfetcherHooks = Object.freeze({
  'beforeFetch' : 'beforeFetch',
  'afterFetchSuccess' : 'afterFetchSuccess',
  'afterFetchError' : 'afterFetchError',
})

export const Dumbfetcher = function (baseURL: string, defaultOptions: Partial<DumbfetcherOptions>) {
  defaultOptions = defaultOptions || {debug: true}
  const hooks: Hooks = {
    [DumbfetcherHooks.beforeFetch]: new Map(),
    [DumbfetcherHooks.afterFetchSuccess]: new Map(),
    [DumbfetcherHooks.afterFetchError]: new Map()
  }

  return {
    fetch: async function (url: string, requestOptions: Partial<RequestOptions>) {
      requestOptions = Object.assign({}, defaultOptions.requestOptions, requestOptions);

      //? beforeFetch hook
      for (const [name, fn] of hooks.beforeFetch) {
        if (defaultOptions.debug) {
          console.debug(`1️⃣ beforeFetch: ${name} hook called`)
        }
        requestOptions = await fn.call(null, requestOptions)
      }

      // *URl construction
      let fetchUrl = new URL(url, baseURL)

      // *URL SearchParams construction
      const query = {}
      for (const key in requestOptions.query) {
        //Removes URLQuery with null values
        const value = requestOptions.query[key]
        if (value) {
          query[key] = value
        }
      }

      fetchUrl.search = new URLSearchParams(query).toString();

      return fetch(fetchUrl.toString(), {
        headers: new Headers(requestOptions.headers),
        ...requestOptions
      }).then(
        async function (response) {
          return new Promise(async function (resolve, reject) {
            if (!response.ok) {
              //? afterFetchError hook
              for (const [name, fn] of hooks.afterFetchError) {
                if (defaultOptions.debug) {
                  console.debug(`1️⃣ afterFetchError: ${name} hook called`)
                }
                response = await fn.call(null, requestOptions, response)
              }

              return reject(response);
            }

            //? afterFetchSuccess hook
            for (const [name, fn] of hooks.afterFetchSuccess) {
              if (defaultOptions.debug) {
                console.debug(`1️⃣ afterFetchSuccess: ${name} hook called`)
              }
              response = await fn.call(null, requestOptions, response)
            }

            return resolve(response)
          })
        }
      )
    },
    hooks: {
      add: function (hookName: keyof Hooks, name: string, fn: FetchHookFunction) {
        if (!Object.prototype.hasOwnProperty.call(hooks, hookName)) {
          return;
        }
        hooks[hookName].set(name, fn)
      },
      remove: function (hookName: keyof Hooks, name: string) {
        if (!Object.prototype.hasOwnProperty.call(hooks, hookName)) {
          return;
        }
        hooks[hookName].delete(name)
      }
    }
  }
}
