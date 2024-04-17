import cookie from "cookie";
import { IncomingMessage } from "http";
import { guard } from "../decorators/guard.decorator.js";
import { BeneficiaryService } from "../services/beneficiary.service.js";
import { BeneficiaryRowHTML } from "../templates/beneficiary-row.template.js";
import { MAX_AGE_IN_SEC, TOGGLE_DELIVERED } from "../util/constants.js";
import { CharityRequest, CharityResponse } from "../util/http.js";

class BeneficiarySearchRouteClass {

	@guard()
	async post(req: CharityRequest, res: CharityResponse<IncomingMessage>) {
		const page = 0
		const body = await req.body()
		const search = body.get("search").toLocaleLowerCase()
		const excludeDelivered = body.get("excludeDelivered") == "1"

		let beneficiaries = await BeneficiaryService.list(page)

		if (excludeDelivered) {
			beneficiaries = beneficiaries.filter(beneficiary => !beneficiary.delivered)
		}

		if (search) {
			beneficiaries = beneficiaries.
				filter(b => {
					return b.firstName.toLocaleLowerCase().includes(search) ||
						b.lastName.toLocaleLowerCase().includes(search) ||
						b.address.toLocaleLowerCase().includes(search) ||
						b.city.toLocaleLowerCase().includes(search) ||
						b.id.toString().includes(search)
				})
		}

		const html = beneficiaries
			.map(b => BeneficiaryRowHTML({ beneficiary: b }))
			.join("")

		const c = cookie.serialize(TOGGLE_DELIVERED, excludeDelivered ? "1" : "", {
			maxAge: MAX_AGE_IN_SEC,
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
		});

		res.setHeader('Set-Cookie', c);
		res.html(html)
	}

}

export const BeneficiarySearchRoute = new BeneficiarySearchRouteClass()
