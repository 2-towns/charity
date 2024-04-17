import { NoSqlRepository } from "../repositories/nosql.repository.js";
import { Admin, AuthUser } from "../types.js";
import { RedisKey } from "../util/constants.js";

export const AdminService = {
	login(username: string, admin: Admin) {
		return NoSqlRepository.set(username, admin)
	},

	async get(username: string) {
		const user = await NoSqlRepository.get<AuthUser>(username)

		if (user) {
			return user
		}

		return NoSqlRepository.get<AuthUser>(`${RedisKey.User}-${username}`)
	}
}
