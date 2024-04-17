import { redisClient } from '../db/redis.js';
import { RedisJSON } from '../types.js';
import { ITEMS_PER_PAGE } from '../util/constants.js';

export const NoSqlRepository = {
	get<T>(key: string) {
		return redisClient.json.get(key) as Promise<T>
	},

	set(key: string, value: RedisJSON) {
		return redisClient.json.set(key, "$", value)
	},

	remove(key: string) {
		return redisClient.del(key)
	},

	push(key: string, value: string) {
		return redisClient.lPush(key, value)
	},

	range<T>(key: string) {
		return redisClient.lRange(key, 0, 9999999) as Promise<T[]>
	},

	incr(key: string) {
		return redisClient.incr(key)
	},

	async list<T>(key: string, page = 0) {
		const items = []

		const { keys } = await redisClient.scan(page, {
			COUNT: ITEMS_PER_PAGE,
			MATCH: `${key}-*`
		})


		for (const key of keys) {
			const item = await NoSqlRepository.get(key);

			items.push(item);
		}

		return items as T[]
	}
}
