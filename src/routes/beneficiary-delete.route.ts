import { IncomingMessage } from "http";
import createHttpError from "http-errors";
import { guard } from "../decorators/guard.decorator.js";
import { BeneficiaryService } from "../services/beneficiary.service.js";
import { ModalHTML } from "../templates/modal.template.js";
import { CharityRequest, CharityResponse } from "../util/http.js";
import { URLs } from "../util/urls.js";

class BeneficiaryDeleteRouteClass {
	@guard()
	async post(req: CharityRequest, res: CharityResponse<IncomingMessage>) {
		const body = await req.body()

		const id = body.get("id")

		if (!id) {
			throw createHttpError(400, "L'ID du bénéficiaire est manquant.")
		}


		await BeneficiaryService.remove(id)

		res.html(ModalHTML({
			title: "Succès",
			message: "Le bénéficiaire a bien été supprimé.",
			href: URLs.beneficiaries.list
		}))
	}


}

export const BeneficiaryDeleteRoute = new BeneficiaryDeleteRouteClass()
