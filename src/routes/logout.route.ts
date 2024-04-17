import cookie from "cookie";
import { guard } from "../decorators/guard.decorator.js";
import { NoSqlRepository } from "../repositories/nosql.repository.js";
import { SESSION_NAME } from "../util/constants.js";
import { Context } from "../util/context.js";
import { CharityRequest, CharityResponse } from "../util/http.js";
import { URLs } from "../util/urls.js";

export class LogoutRouteClass {

	@guard()
	async post(_: CharityRequest, res: CharityResponse) {
		const sessionId = Context.getStore()?.get("sessionId")

		await NoSqlRepository.remove(sessionId)

		const c = cookie.serialize(SESSION_NAME, sessionId, {
			maxAge: 0,
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			priority: 'high',
		});

		res.setHeader('Set-Cookie', c);
		res.setHeader("HX-Redirect", URLs.index)
		res.end()
	}
}

export const LogoutRoute = new LogoutRouteClass()

