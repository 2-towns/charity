import cookie from "cookie";
import { SessionService } from "../services/session.service.js";
import { SESSION_NAME } from "../util/constants.js";
import { Context } from "../util/context.js";
import { CharityRequest, CharityResponse } from "../util/http.js";
import { logger } from "../util/logger.js";
import { URLs } from "../util/urls.js";

export function guard<Request extends CharityRequest, Response extends CharityResponse>(type: "admin" | "user" = "user") {

	return function actualDecorator(
		originalMethod: (req: Request, res: Response) => Promise<void>,
		_: ClassMethodDecoratorContext) {

		async function replacementMethod(this: any, req: Request, res: Response) {
			const cookies = cookie.parse(req.headers["cookie"] ?? "");
			const sessionId = cookies[SESSION_NAME]

			if (!sessionId) {
				logger.log("auth_invalid", "The user is trying to access to restricted page without sessionId !")

				res.redirect(URLs.index)

				return
			}

			const session = await SessionService.get(sessionId)

			if (!session) {
				logger.log("auth_invalid", "[WARN] The user is trying to access to restricted page without session !")

				res.redirect(URLs.index)

				return
			}

			if (type === "admin" && session.type === "user") {
				logger.log("auth_invalid", "[WARN] The user is trying to access to restricted page without session !")

				res.redirect(URLs.index)

				return
			}

			Context.getStore()?.set("session", session)
			Context.getStore()?.set("sessionId", sessionId)

			try {
				const result = await originalMethod.call(this, req, res);

				return result;
			} catch (e) {
				res.error(e as Error)
			}
		}

		return replacementMethod
	}

}
