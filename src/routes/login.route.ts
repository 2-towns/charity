import cookie from "cookie";
import { SessionService } from "../services/session.service.js";
import { LoginHTML } from "../templates/login.template.js";
import { SESSION_NAME } from "../util/constants.js";
import { CharityRequest, CharityResponse } from "../util/http.js";
import { URLs } from "../util/urls.js";

export async function loginRoute(req: CharityRequest, res: CharityResponse) {
	const html = LoginHTML()

	const cookies = cookie.parse(req.headers["cookie"] ?? "");
	const sessionId = cookies[SESSION_NAME]

	if (!sessionId) {
		res.html(html)

		return
	}

	const session = await SessionService.get(sessionId)

	if (session) {
		res.redirect(URLs.beneficiaries.list)

		return
	}

	res.html(html)
}
