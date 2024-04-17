import validator from "validator"
import { NoSqlRepository } from "../repositories/nosql.repository.js"
import { Beneficiary, Food } from "../types.js"
import { RedisKey } from "../util/constants.js"
import { logger } from "../util/logger.js"
import createHttpError from "http-errors"
import { SessionService } from "./session.service.js"

class BeneficiaryServiceClass {
	private validate(body: Map<string, string>) {
		const required = [
			"firstName",
			"lastName",
			"address",
			"zipCode",
			"parts",
			"phone",
			"city"
		]

		const firstName = body.get("firstName") ?? ""
		const lastName = body.get("lastName") ?? ""
		const address = body.get("address") ?? ""
		const complementary = body.get("complementary") ?? ""
		const city = body.get("city") ?? ""
		// const department = body.get("department") ?? ""
		const department = "59"
		const zipCode = body.get("zipCode") ?? ""
		const parts = body.get("parts") ?? ""
		const phone = body.get("phone") ?? ""
		const food = body.get("food") ?? ""
		const notes = body.get("notes") ?? ""
		const agreed = body.get("agreed") ?? ""

		for (const name of required) {
			if (validator.isEmpty(body.get(name) ?? "")) {
				logger.log("validation_vailed", `The field ${name} is not fullfilled (${name}).`)

				throw createHttpError(400, `Le champ ${name} est incorrect.`)
			}
		}

		if (!validator.isMobilePhone(phone, "fr-FR")) {
			logger.log("validation_vailed", `The field phone is not fullfilled (${phone}).`)

			throw createHttpError(400, `Le champ téléphone est incorrect.`)
		}

		if (!validator.isInt(parts)) {
			logger.log("validation_vailed", `The field parts is not fullfilled (${parts}).`)

			throw createHttpError(400, `Le champ nombre de parts est incorrect.`)
		}

		if (!validator.isIn(food, ["maghreb", "afrique", "europe", "proche-orient", "asie"])) {
			logger.log("validation_vailed", `The field food is not fullfilled (${food}).`)

			throw createHttpError(400, `Le champ coutume alimentaire est incorrect.`)
		}

		const benefiary = {
			firstName,
			lastName,
			address,
			complementary,
			city,
			department,
			zipCode,
			parts: validator.toInt(parts),
			agreed: validator.toBoolean(agreed),
			phone,
			food: food as Food,
			notes,
		}

		return benefiary
	}

	async create(body: Map<string, string>) {
		const data = this.validate(body)

		console.info("data", data)

		const id = await NoSqlRepository.incr(RedisKey.Beneficiary)

		const beneficiary: Beneficiary = {
			...data,
			id,
			updatedAt: new Date().toJSON(),
			deliverable: true,
			delivered: false
		}

		const key = `${RedisKey.Beneficiary}-${id}`

		return NoSqlRepository.set(key, beneficiary)
	}

	async edit(body: Map<string, string>) {
		const id = body.get("id")

		if (!id) {
			logger.log("validation_vailed", "The id is null or undefined.")

			throw createHttpError(400, "L'id du bénéficiaire est requis.")
		}

		const previous = await this.get(id)

		if (!previous) {
			logger.log("data_not_found", `The beneficiary ${id} does not exist.`)

			throw createHttpError(400, "Le bénéficiaire n'existe pas.")
		}

		const data = this.validate(body)
		const deliverable = validator.toBoolean(body.get("deliverable") ?? "")
		const delivered = validator.toBoolean(body.get("delivered") ?? "")
		const beneficiary: Beneficiary = {
			...data,
			id: parseInt(id, 10),
			updatedAt: new Date().toJSON(),
			deliverable,
			delivered
		}

		const session = SessionService.current
		const message = `${new Date().toJSON()}: ${session.firstName} a modifié le bénéficiaire.`

		await NoSqlRepository.push(`${RedisKey.History}-${id}`, message)

		const key = `${RedisKey.Beneficiary}-${id}`

		return NoSqlRepository.set(key, beneficiary)
	}

	async list(page: number) {
		const beneficiaries = await NoSqlRepository.list<Beneficiary>(RedisKey.Beneficiary, page)

		const b = beneficiaries.sort((a, b) => a.id - b.id)

		return b
	}

	get(id: string | number) {
		const key = `${RedisKey.Beneficiary}-${id}`

		return NoSqlRepository.get<Beneficiary>(key)
	}

	history(id: string) {
		const key = `${RedisKey.History}-${id}`

		return NoSqlRepository.range<string>(key)
	}

	async remove(id: number) {
		const key = `${RedisKey.Beneficiary}-${id}`;
		const beneficiary = this.get(id)
		if (!beneficiary) {
			logger.log("data_not_found", `Le bénéficiaire ${id} n'existe pas.`)
			throw createHttpError(400, "Le bénéficiaire n'existe pas.")
		}

		await NoSqlRepository.remove(key)

		return `Le bénéficiaire ${id} a été supprimé.`
	}

}

export const BeneficiaryService = new BeneficiaryServiceClass()
