import { IncomingMessage, ServerResponse } from "http";
import { ErrorHTML } from "../templates/error.template.js";
import { LayoutHTML } from "../templates/layout.template.js";
import { ModalHTML } from "../templates/modal.template.js";

export class CharityRequest extends IncomingMessage {
	get pathname() {
		const url = new URL(this.url ?? "", `http://${this.headers.host}`);

		return url.pathname
	}

	async body() {
		const chunks: Uint8Array[] = [];

		for await (const chunk of this) {
			chunks.push(chunk);
		}

		const buffer = Buffer.concat(chunks);
		const s = decodeURIComponent(buffer.toString().replace(/\+/g, " "))
		const map = new Map();

		if (!s) {
			return map
		}

		const parts = s.split("&");

		for (const part of parts) {
			const [key, value] = part.split("=");
			map.set(key, value);
		}

		return map
	}

	isHx() {
		return this.headers["hx-request"] === "true"
	}
}

export class CharityResponse<T extends IncomingMessage = IncomingMessage> extends ServerResponse<T> {
	html(content: string) {
		this.writeHead(200, {
			"Content-Type": "text/html",
			"X-Content-Type-Options": "nosniff",
			"X-Powered-By": "WordPress",
			"Access-Control-Allow-Credentials": "true",
			"Referrer-Policy": "strict-origin",
			"X-Frame-Options": "deny",
			"Accept-CH": "Sec-CH-Prefers-Color-Scheme",
			"X-XSS-Protection": "1; mode=block",
			"Strict-Transport-Security":
				"max-age=63072000; includeSubDomains; preload"
		})

		if (this.req.headers["hx-request"] === "true") {
			this.end(content)
		} else {
			const color = this.req.headers["sec-ch-prefers-color-scheme"] as "dark" | "light" | undefined

			const html = LayoutHTML({ body: content, color });

			this.end(html)
		}
	}

	redirect(location: string, code = 302) {
		this.writeHead(code, {
			"Cache-Control": "no-cache, no-store, must-revalidate",
			Expires: "0",
			Date: new Date().toUTCString(),
			Pragma: "no-cache",
			Location: location,
		});

		this.end()
	}

	error(error: Error) {
		console.log(error)

		if (this.req.headers["hx-request"] === "true") {
			const body = ModalHTML({
				title: "Erreur",
				message: error.message
			})

			this.setHeader("HX-Retarget", "#htmx-container")
			this.setHeader("HX-Reswap", "innerHTML")
			this.html(body)
		} else {
			const body = ErrorHTML({
				message: error.message
			})

			const color = this.req.headers["sec-ch-prefers-color-scheme"] as "dark" | "light" | undefined

			this.html(LayoutHTML({ body, color }))
		}
	}
}
