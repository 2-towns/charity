import { IncomingMessage } from 'http';
import { BeneficiaryFormHTML } from '../templates/beneficiary-form.template.js';
import { CharityRequest, CharityResponse } from '../util/http.js';
import { URLs } from '../util/urls.js';

export function indexRoute(_: CharityRequest, res: CharityResponse<IncomingMessage>) {
	const html = /*html*/ `

		<nav class="container">
			<ul>
			<li>
			<a href="/" class="logo">Charity</a>
			</li>
			</ul>
			<ul>
				<li><a href="${URLs.login.form}">Connexion</a></li>
			</ul>

		</nav>

		<main class="container layout">
			${BeneficiaryFormHTML()}
		</main>
	`;

	res.html(html);
}
