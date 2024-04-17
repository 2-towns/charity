import { Beneficiary, Food } from "../types.js";
import { URLs } from "../util/urls.js";
import { AuthHeaderHTML } from "./auth-header.template.js";
import { BeneficiaryRowHTML } from "./beneficiary-row.template.js";

interface Props {
	beneficiaries: Beneficiary[]
	excludeDelivered?: boolean
	total: number
	parts: number
	foods: Map<Food, number>
	families: Map<number, number>
}

export function BeneficiaryListHTML({
	beneficiaries,
	excludeDelivered,
	total,
	parts,
	foods,
	families
}: Props) {
	let Rows = beneficiaries
		.map(beneficiary => BeneficiaryRowHTML({ beneficiary }))
		.join("")

	let Foods = ""

	for (const [entry, value] of foods.entries()) {
		Foods += `
		<tr>
			<td>Parts selon la coutume alimentaire: ${entry}</td>
			<td>${value}</td>
		</tr>
	`
	}

	let Families = ""

	for (const [entry, value] of families.entries()) {
		Families += `
		<tr>
			<td>Famille de ${entry} parts</td>
			<td>${value}</td>
		</tr>
	`
	}

	return /*html*/`
		${AuthHeaderHTML()}

		<div class="container">
			<input
				type="search"
				hx-post="${URLs.beneficiaries.search}"
				hx-trigger="keyup changed delay:500ms, search"
				hx-target="#tbody"
				hx-swap="innerHTML"
				hx-include="[name='excludeDelivered']"
				name="search"
				placeholder="Tapez pour rechercher parmis les utilisateurs..."
			/>

			<label for="excludeDelivered" class="mt-1 mb-1">
				<input
					type="checkbox"
					id="excludeDelivered"
					name="excludeDelivered"
					value="1"
					role="switch"
					hx-post="${URLs.beneficiaries.search}"
					hx-include="[name='search']"
					hx-trigger="click"
					hx-target="#tbody"
					${excludeDelivered ? "checked" : ""}
				/>
				Exclure les bénéficiaires livrés
			</label>



			<section>
				<figure>
					<table role="grid">
						<thead>
							<tr>
								<th scope="col">ID</th>
								<th scope="col">Nom</th>
								<th scope="col">Ville</th>
								<th scope="col">GPS</th>
								<th scope="col">Parts</th>
								<th scope="col">Mobile</th>
								<th scope="col">Livrable</th>
								<th scope="col">Livré</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody id="tbody">
							${Rows}
						</tbody>
					</table>
				</figure>
			</section>
			<details open class="mt-2">
			<summary>Statistiques</summary>

		<figure>
			<table role="grid">
				<thead>
					<tr>
						<th scope="col">Nom</th>
						<th scope="col">Total</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Famille</td>
						<td>${total}</td>
					</tr>
					<tr>
						<td>Parts</td>
						<td>${parts}</td>
					</tr>
					${Foods}

					${Families}
				</tbody>
			</table>
		</figure>
	</details>
		</div>
    `;
}
