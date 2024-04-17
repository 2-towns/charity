import createHttpError from "http-errors"
import { NoSqlRepository } from "../repositories/nosql.repository.js"
import { Admin, AuthUser } from "../types.js"
import { Context } from "../util/context.js"
import { logger } from "../util/logger.js"

export const SessionService = {
	get(sessionId: string) {
		return NoSqlRepository.get<AuthUser>(sessionId)
	},

	set(sessionId: string, user: AuthUser) {
		return NoSqlRepository.set(sessionId, user)
	},

	remove(sessionId: string) {
		return NoSqlRepository.remove(sessionId)
	},

	get current() {
		const session = Context.getStore()?.get("session")

		if (!session) {
			logger.log("auth_invalid", "The session does not exist.")

			throw createHttpError(400, "Vous n'êtes pas autorisé à faire cette action !")
		}

		return session as Admin
	}
}
