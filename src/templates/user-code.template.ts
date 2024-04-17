import { URLs } from "../util/urls.js";

export function UserCodeHTML() {
	return /*html*/`
<main>
	<div class="container">
	<h1>Obtenir un code de connexion</h1>
	<form hx-post="${URLs.users.code}" hx-target="#htmx-container">
		<label for="email">Email</label>
		<input id="email" name="email" type="email" required />

		<div class="grid">
		    <a href="${URLs.login.form}" role="button" class="secondary">Retour</a>
		    <button type="submit" hx-trigger="click">Enregister</button>
		</div>
	</form>
	</div>
</main>
	`
}
