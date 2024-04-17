import { IncomingMessage } from "http";
import createHttpError from "http-errors";
import { guard } from "../decorators/guard.decorator.js";
import { BeneficiaryService } from "../services/beneficiary.service.js";
import { BeneficiaryEditHTML } from "../templates/beneficiary-edit.template.js";
import { ModalHTML } from "../templates/modal.template.js";
import { CharityRequest, CharityResponse } from "../util/http.js";
import { logger } from "../util/logger.js";
import { URLs } from "../util/urls.js";

class BeneficiaryEditRouteClass {

	@guard()
	async get(req: CharityRequest, res: CharityResponse<IncomingMessage>) {
		const url = new URL(req.url ?? "", `http://${req.headers.host}`);
		const params = url.searchParams
		const id = params.get("id")

		if (!id) {
			logger.log("validation_vailed", "The id is null or undefined.")

			throw createHttpError(400, "L'id du bénéficiaire est requis.")
		}

		const beneficiary = await BeneficiaryService.get(id)

		if (!beneficiary) {
			logger.log("data_not_found", `The beneficiary ${id} does not exist.`)

			throw createHttpError(400, "Le bénéficiaire n'existe pas.")
		}

		const history = await BeneficiaryService.history(id)

		res.html(BeneficiaryEditHTML({ beneficiary, history }))
	}

	@guard()
	async post(req: CharityRequest, res: CharityResponse<IncomingMessage>) {
		const body = await req.body()

		await BeneficiaryService.edit(body)

		res.setHeader("HX-Retarget", "#htmx-container")
		res.setHeader("HX-Reswap", "innerHTML")

		res.html(ModalHTML({
			title: "Succès !",
			message: "Le bénéficiaire a été modifié.",
			href: URLs.beneficiaries.list
		}))
	}

}

export const BeneficiaryEditRoute = new BeneficiaryEditRouteClass()
