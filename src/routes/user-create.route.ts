import { IncomingMessage } from "http";
import { guard } from "../decorators/guard.decorator.js";
import { UserService } from "../services/user.service.js";
import { ModalHTML } from "../templates/modal.template.js";
import { UserCreateHTML } from "../templates/user-create.template.js";
import { CharityRequest, CharityResponse } from "../util/http.js";
import { URLs } from "../util/urls.js";

class UserCreateRouteClass {

	@guard("admin")
	async get(_: CharityRequest, res: CharityResponse<IncomingMessage>) {
		res.html(UserCreateHTML())
	}

	@guard("admin")
	async post(req: CharityRequest, res: CharityResponse<IncomingMessage>) {
		const body = await req.body()

		await UserService.create(body)

		res.html(ModalHTML({
			title: "Succès !",
			message: "L'utilisateur a été ajouté.",
			href: URLs.users.list
		}))
	}

}

export const UserCreateRoute = new UserCreateRouteClass()
