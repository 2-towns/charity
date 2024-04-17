import { AsyncLocalStorage } from "async_hooks";

export const Context = new AsyncLocalStorage<Map<string, any>>()
