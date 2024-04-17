import { Beneficiary } from "../types.js"
import { URLs } from "../util/urls.js"

interface Props {
	beneficiary: Beneficiary
}

export function BeneficiaryRowHTML({ beneficiary }: Props) {
	const a = beneficiary?.address.replace(/ /g, "+")
	const c = beneficiary?.city.replace(/ /g, "+")
	const z = beneficiary?.zipCode.replace(/ /g, "+")
	const maps = `https://www.google.com/maps/place/${a}+${c}+${z}`
	return /*html*/`
		<tr>
			<td>${beneficiary.id}</td>
			<td>${beneficiary.firstName} ${beneficiary.lastName}</td>
			<td>${beneficiary.city}</td>
			<td><a href="${maps}" target="_blank">Google MAPS</a></td>
			<td>${beneficiary.parts}</td>
			<td>${beneficiary.phone}</td>
			<td class="text-center">
				<input type="checkbox" disabled ${beneficiary.deliverable ? "checked" : ""}>
			</td>
			<td class="text-center">
			    <input type="checkbox" disabled ${beneficiary.delivered ? "checked" : ""}>
		    </td>
			<td>
				<a href="${URLs.beneficiaries.edit}?id=${beneficiary.id}">
					Modifer
				</a>
			</td>
		</tr>
	`
}
