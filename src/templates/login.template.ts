import { URLs } from "../util/urls.js";

export function LoginHTML() {
	return /*html*/`
	<main>
        <div class="container">
		<h1 class="text-center">Se connecter</h1>

        <form hx-post="${URLs.login.api}" >
            <label for="id">Email</label>
            <input id="login" name="login" type="text" required />

            <label for="password">Code ou password</label>
            <input id="password" name="password" type="password" required />

			<div class="grid">
			   <a href="${URLs.index}" role="button" class="secondary">Retour</a>
			   <button type="submit" hx-trigger="click">Se connecter</button>
            </div>
			<a href="${URLs.users.code}">Obtenir un code</a>
        </form>
		</div>
	</main>
    `;
}
