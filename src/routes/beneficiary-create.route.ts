import { IncomingMessage } from "http";
import { BeneficiaryService } from "../services/beneficiary.service.js";
import { ModalHTML } from "../templates/modal.template.js";
import { CharityRequest, CharityResponse } from "../util/http.js";

class BeneficiaryCreateRouteClass {

	async post(req: CharityRequest, res: CharityResponse<IncomingMessage>) {
		const body = await req.body()

		await BeneficiaryService.create(body)

		res.html(ModalHTML({
			title: "Succès",
			message: "Vos coordonnées ont été enregistrées avec succès.",
		}))
	}

}

export const BeneficiaryCreateRoute = new BeneficiaryCreateRouteClass()
