import { IncomingMessage } from "http";
import { guard } from "../decorators/guard.decorator.js";
import { UserService } from "../services/user.service.js";
import { UserListHTML } from "../templates/user-list.template.js";
import { CharityRequest, CharityResponse } from "../util/http.js";

class UserListRouteClass {

	@guard("admin")
	async get(_: CharityRequest, res: CharityResponse<IncomingMessage>) {
		const page = 0
		const users = await UserService.list(page)

		res.html(UserListHTML({ users }))
	}

}

export const UserListRoute = new UserListRouteClass()
