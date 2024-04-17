export const SESSION_SIZE = 24
export const SESSION_NAME = "jsession"
export const TOGGLE_DELIVERED = "delivered"
export const MAX_AGE_IN_SEC = 400 * 24 * 60 * 60
export enum RedisKey {
	Beneficiary = "beneficiary",
	History = "history",
	User = "user"
}
export const ITEMS_PER_PAGE = 999999999
export const CACHEBUSTER = Date.now()
