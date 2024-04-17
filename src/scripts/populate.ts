import { faker } from "@faker-js/faker";
import crypto from "node:crypto";
import { BeneficiaryService } from "../services/beneficiary.service.js";
import { AdminService } from "../services/login.service.js";
import { Admin } from "../types.js";

faker.setLocale("fr");

export async function main() {
	const passwordHash = crypto.createHash("sha256").update("123").digest("hex");
	const admin: Admin = {
		firstName: "Salim",
		lastName: "Tison",
		login: "sasalilime",
		password: passwordHash,
		type: "admin",
	};

	// await redisClient.flushAll()

	const setResult = await AdminService.login(admin.login, admin);

	console.log("Admin enregistré:", setResult);

	for (let i = 0; i < 10; i++) {
		const o = {
			address: faker.address.streetAddress(),
			complementary: faker.address.secondaryAddress(),
			city: faker.address.city(),
			department: faker.address.state(),
			zipCode: faker.address.zipCode(),
			parts: faker.datatype.number({ max: 10 }).toString(),
			phone: faker.phone.number("07########"),
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			food: "maghreb",
			notes: faker.name.lastName(),
			agreed: faker.datatype.boolean().toString(),
		};

		const map = new Map(Object.entries(o));

		await BeneficiaryService.create(map);

		console.info(o);

		await new Promise((resolve) => {
			setTimeout(resolve, 10);
		});
	}

	process.exit(0);
}

main();
