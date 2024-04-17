import { URLs } from "../util/urls.js";

export function UserCreateHTML() {
	return /*html*/`
	<main>
		<div class="container">
		<h1>Ajouter un utilisateur</h1>

		<form hx-post="${URLs.users.create}" hx-target="#htmx-container">
			<label for="firstName">Prénom</label>
			<input id="firstName" name="firstName" type="text" required />

			<label for="lastName">Nom</label>
			<input id="lastName" name="lastName" type="text" required />

			<label for="email">Email</label>
			<input id="email" name="email" type="email" required />

			<label for="phone">Téléphone</label>
			<input id="phone" name="phone" type="tel" required />

			<div class="grid">
				<a href="${URLs.users.list}" role="button" class="secondary">Retour</a>
				<button type="submit" hx-trigger="click">Enregister</button>
			</div>
		</form>
	</main>
	`
}
