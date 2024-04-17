import { IncomingMessage } from "http";
import { guard } from "../decorators/guard.decorator.js";
import { UserService } from "../services/user.service.js";
import { UserTableHTML } from "../templates/user-table.template.js";
import { CharityRequest, CharityResponse } from "../util/http.js";

class UserDestroyRouteClass {

	@guard("admin")
	async post(req: CharityRequest, res: CharityResponse<IncomingMessage>) {
		const body = await req.body()

		await UserService.remove(body.get("email"))

		const users = await UserService.list(0)

		res.html(UserTableHTML({ users }))
	}

}

export const UserDestroyRoute = new UserDestroyRouteClass()
