export type Person = {
	firstName: string
	lastName: string
}

export type AuthUser = {
	login: string
	password: string
	type: "admin" | "user"
}

export type Admin = Person & AuthUser & {
	type: "admin"
}

export type User = Person & AuthUser & {
	type: "user"
	phone: string
}

export type Food = "maghreb" | "afrique" | "europe" | "proche-orient" | "asie"

export type Beneficiary = Person & {
	id: number
	updatedAt: string
	address: string
	complementary: string
	city: string
	department: string
	zipCode: string
	parts: number
	phone: string
	deliverable: boolean
	delivered: boolean
	food: Food
	notes: string
	agreed: boolean

}

export type Rider = Person & {
	email: string
}

interface RedisJSONArray extends Array<RedisJSON> {
}

interface RedisJSONObject {
	[key: string]: RedisJSON;
	[key: number]: RedisJSON;
}

export declare type RedisJSON = null | boolean | number | string | Date | RedisJSONArray | RedisJSONObject;
