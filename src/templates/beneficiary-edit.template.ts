import { Beneficiary } from '../types.js';
import { BeneficiaryFormHTML } from './beneficiary-form.template.js';

interface Props {
	beneficiary: Beneficiary;
	history: string[];
}

export function BeneficiaryEditHTML({ beneficiary, history }: Props) {
	const History = history?.map(
		(h) => /*html*/ `
			<li>${h}</li>
		`
	).join("")

	return /*html*/ `
		<main class="container">
			${BeneficiaryFormHTML({ beneficiary })}

			<h2>Historique</h2>

			<ul>
				${History}
			</ul>
		</main>
	`;
}
