import { AuthUser } from "../types.js";
import { Context } from "../util/context.js";
import { URLs } from "../util/urls.js";

export function AuthHeaderHTML() {
	const session = Context.getStore()?.get("session") as AuthUser
	return /*html*/`
		<nav class="container">
			<ul>
			</ul>
			<ul>
				<li><a href="${URLs.beneficiaries.list}">Bénéficiaires</a></li>
				${session.type === "admin" ? `
					<li><a href="${URLs.users.list}">Utilisateurs</a></li>
				`: ""}
				<li><a class="#" hx-post="${URLs.logout}">Déconnexion</a></li>
			</ul>

		</nav>
	`
}
