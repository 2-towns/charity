import cookie from "cookie";
import { IncomingMessage } from "http";
import { guard } from "../decorators/guard.decorator.js";
import { BeneficiaryService } from "../services/beneficiary.service.js";
import { BeneficiaryListHTML } from "../templates/beneficiary-list.template.js";
import { BeneficiaryRowHTML } from "../templates/beneficiary-row.template.js";
import { Food } from "../types.js";
import { TOGGLE_DELIVERED } from "../util/constants.js";
import { CharityRequest, CharityResponse } from "../util/http.js";

class BeneficiaryListRouteClass {

	@guard()
	async get(req: CharityRequest, res: CharityResponse<IncomingMessage>) {
		const page = 0
		const { [TOGGLE_DELIVERED]: value } = cookie.parse(req.headers["cookie"] ?? "")
		const excludeDelivered = value == "1"

		let beneficiaries = await BeneficiaryService.list(page)

		if (req.isHx()) {
			const html = beneficiaries
				.map(b => BeneficiaryRowHTML({ beneficiary: b }))
				.join("")
			res.html(html)

			return
		}

		const total = beneficiaries.length
		let parts = 0
		const foods: Map<Food, number> = new Map()
		const families: Map<number, number> = new Map()

		for (const beneficiary of beneficiaries) {
			parts += beneficiary.parts

			const food = (foods.get(beneficiary.food) ?? 0) + beneficiary.parts
			foods.set(beneficiary.food, food)

			if (beneficiary.parts) {
				const family = (families.get(beneficiary.parts) ?? 0) + 1

				families.set(beneficiary.parts, family)
			}
		}

		if (excludeDelivered) {
			beneficiaries = beneficiaries.filter(beneficiary => !beneficiary.delivered)
		}

		res.html(BeneficiaryListHTML({
			beneficiaries,
			excludeDelivered,
			total,
			parts,
			foods,
			families
		}))
	}

}

export const BeneficiaryListRoute = new BeneficiaryListRouteClass()
