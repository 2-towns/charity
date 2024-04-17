import { writeFileSync } from "fs";

// const b = await BeneficiaryService.list(0);

// writeFileSync(
// 	"beneficiairies.json",
// 	JSON.stringify(
// 		b.map((ben) => ({
// 			...ben,
// 			zipcode: ben.zipCode,
// 			createdAt: ben.updatedAt,
// 		}))
// 	)
// );

// const { keys } = await redisClient.scan(0, {
// 	COUNT: ITEMS_PER_PAGE,
// 	MATCH: `*`,
// });

// const map = new Map();

// for (const key of keys) {
// 	if (key.startsWith("ben") || key.startsWith("his")) {
// 		continue;
// 	}
// 	const item = await NoSqlRepository.get(key);

// 	if (typeof item === "object" && (item as any).login) {
// 		map.set((item as any).login, item);
// 	}
// }

// writeFileSync("users.json", JSON.stringify(Object.fromEntries(map.entries())));

// process.exit(0);

const data = {
	"rabhiouim@yahoo.fr": {
		firstName: "Mustapha",
		lastName: "Rabhioui",
		login: "rabhiouim@yahoo.fr",
		type: "user",
		password: "cd9a15b8-b82e-4062-9333-fbdd144cc783",
	},
	"y.kamouch@gmail.com": {
		firstName: "Youssef",
		lastName: "Kamouch",
		login: "y.kamouch@gmail.com",
		type: "user",
		password: "a6098974-1fbf-44db-8d60-037c9eaf2d29",
		phone: "0752463198",
	},
	heros: {
		firstName: "Admin",
		lastName: "Arnaud",
		login: "heros",
		password:
			"8323be2f3b4af9a49695965037a63335e5c5a4428203aef9cee76cde563361f0",
		type: "admin",
	},
	"touil.fayssal@hotmail.fr": {
		firstName: "Fayssal ",
		lastName: "Touil",
		login: "touil.fayssal@hotmail.fr",
		type: "user",
		password: "67c44ed3-e4a6-4fc9-8965-1811fbd83d41",
		phone: "0753402433",
	},
	"brahim.rabhioui@gmail.com": {
		firstName: "Brahim",
		lastName: "Rabhioui",
		login: "brahim.rabhioui@gmail.com",
		type: "user",
		password: "e5f66c6c-7229-48fb-bb23-0fd980af6c5d",
		phone: "0671570735",
	},
	"seddik.ayoub05@gmail.com": {
		firstName: "Ayoub",
		lastName: "Seddik",
		login: "seddik.ayoub05@gmail.com",
		type: "user",
		password: "fc4511b7-2e48-41fe-95f7-e9fa730c662c",
		phone: "0767718777",
	},
	"ouznaliazzedine@gmail.com": {
		firstName: "Ali",
		lastName: "Chafchaf",
		login: "ouznaliazzedine@gmail.com",
		type: "user",
		password: "dbca0231-751f-4f90-85db-90522a3ae737",
		phone: "0643687033",
	},
	"elbachir4675@gmail.com": {
		firstName: "Mokhtar",
		lastName: "El Bachir ",
		login: "elbachir4675@gmail.com",
		type: "user",
		password: "77d962d4-1e2a-4584-a4d4-ff149318d1b5",
		phone: "0769799596",
	},
	"nordine599@outlook.fr": {
		firstName: "Nordine ",
		lastName: "Abou Mimoun ",
		login: "nordine599@outlook.fr",
		type: "user",
		password: "00601672-92ca-4fd1-9f97-e7120cd8e5a6",
		phone: "0673812026",
	},
	"rsafarbati@gmail.com": {
		firstName: "Rafik",
		lastName: "Safar bati",
		login: "rsafarbati@gmail.com",
		type: "user",
		password: "2a7ed9a5-6a2d-40bf-9a44-51fdfba640fe",
		phone: "0667651935",
	},
	"bouchlaghem.nordine01@gmail.com": {
		firstName: "Noureddine",
		lastName: "Bouchlaghem",
		login: "bouchlaghem.nordine01@gmail.com",
		type: "user",
		password: "7761292b-ad55-46b5-9ce4-92f597a2c31d",
		phone: "0749559329",
	},
	"boudebza.khaled@gmail.com": {
		firstName: "Khaled",
		lastName: "Boudebza",
		login: "boudebza.khaled@gmail.com",
		type: "user",
		password: "82b6c943-7a61-470f-afa6-51fd116a3271",
		phone: "0662492663",
	},
	"arno.deville@gmail.com": {
		firstName: "Arnaud",
		lastName: "Arnaud",
		login: "arno.deville@gmail.com",
		type: "user",
		password: "",
	},
	"aurelien.stangret@gmail.com": {
		firstName: "Ali",
		lastName: "Stangret ",
		login: "aurelien.stangret@gmail.com",
		type: "user",
		password: "ee2a15e1-c1ef-45ec-90f7-b10e7e7824e8",
		phone: "0622605521",
	},
	"ahmed597@hotmail.fr": {
		firstName: "Ahmed",
		lastName: "El arrassi",
		login: "ahmed597@hotmail.fr",
		type: "user",
		password: "6c672d94-de6a-42b8-9af8-2c2b38580621",
		phone: "0609766744",
	},
	"tflamez120174@gmail.com": {
		firstName: "Talal",
		lastName: "Flamez",
		login: "tflamez120174@gmail.com",
		type: "user",
		password: "dd89d3a8-d54c-4802-affb-cf73d72082a8",
		phone: "0768959513",
	},
	"m.rabhioui@yahoo.fr": {
		firstName: "Mohamed ",
		lastName: "Rabhioui",
		login: "m.rabhioui@yahoo.fr",
		type: "user",
		password: "a33739bd-3336-46f7-a2f9-c880600c0eaf",
		phone: "0770010282",
	},
	"jimirimi93@gmail.com": {
		firstName: "Djamal",
		lastName: "Abidi",
		login: "jimirimi93@gmail.com",
		type: "user",
		password: "10348556-1077-4ca5-abb9-114592d41f04",
		phone: "0685622237",
	},
	"salimtison@protonmail.com": {
		firstName: "salim",
		lastName: "tison",
		login: "salimtison@protonmail.com",
		type: "user",
		password: "874bb99d-d8f6-4c48-854e-c97f43b5c8f3",
	},
	"abdellah.sairou@gmail.com": {
		firstName: "Abdellah",
		lastName: "Sairou",
		login: "abdellah.sairou@gmail.com",
		type: "user",
		password: "adbb272d-f94a-4bd7-b26f-d0224073fd35",
		phone: "0629002900",
	},
	"yanisrabhioui@icloud.com": {
		firstName: "Yanis",
		lastName: "Rabhioui",
		login: "yanisrabhioui@icloud.com",
		type: "user",
		password: "99896199-2717-486c-902e-9bc3c4656de8",
		phone: "0636110669",
	},
	"elb.farid59@gmail.com": {
		firstName: "Farid",
		lastName: "El Boundati ",
		login: "elb.farid59@gmail.com",
		type: "user",
		password: "c0de204d-0a49-483a-b701-78d22a26ed29",
		phone: "0782995986",
	},
};

const users = [];
for (const key in data) {
	const user = (data as any)[key];
	users.push(user);
}
writeFileSync("users.json", JSON.stringify(users));
