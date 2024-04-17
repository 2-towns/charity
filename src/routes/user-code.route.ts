import { IncomingMessage } from "http";
import { UserService } from "../services/user.service.js";
import { ModalHTML } from "../templates/modal.template.js";
import { UserCodeHTML } from "../templates/user-code.template.js";
import { CharityRequest, CharityResponse } from "../util/http.js";
import { URLs } from "../util/urls.js";

class UserCodeRouteClass {

	async get(_: CharityRequest, res: CharityResponse<IncomingMessage>) {
		res.html(UserCodeHTML())
	}

	async post(req: CharityRequest, res: CharityResponse<IncomingMessage>) {
		const body = await req.body()

		await UserService.code(body)

		res.html(ModalHTML({
			title: "Succès !",
			message: "Un nouveau code a été envoyé.",
			href: URLs.login.form
		}))
	}

}

export const UserCodeRoute = new UserCodeRouteClass()
