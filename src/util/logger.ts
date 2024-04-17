import { Context } from "./context.js"

type Tag = "auth_invalid" | "http_info" | "validation_vailed" | "data_not_found" | "data_duplicate" | "sequence_fail"

export const logger = {
	log(tag: Tag, message: string) {
		const requestId = Context.getStore()?.get("request-id")

		console.log(new Date().toJSON(), `[${requestId}]`, tag, message)
	},
}
