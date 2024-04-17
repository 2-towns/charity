import { Beneficiary } from '../types.js';
import { URLs } from '../util/urls.js';

interface Props {
	beneficiary?: Beneficiary;
}

export function BeneficiaryFormHTML({ beneficiary }: Props = {}) {
	const url = beneficiary ? URLs.beneficiaries.edit : URLs.beneficiaries.create;

	const a = beneficiary?.address.replace(/ /g, '+');
	const c = beneficiary?.city.replace(/ /g, '+');
	const z = beneficiary?.zipCode.replace(/ /g, '+');
	const maps = `https://www.google.com/maps/place/${a}+${c}+${z}`;

	return /*html*/ `
		<form
			hx-post="${url}"
			hx-swap="outerHTML"
		>
		<div class="beneficiaries-form" id="beneficiaries-form">
			<div class="grid">
				<label for="firstname">
					Prénom

					<input
						type="text"
						id="firstName"
						name="firstName"
						required
						value="${beneficiary?.firstName ?? ''}"
					/>

				</label>

				<label for="lastName">
					Nom

					<input
						type="text"
						id="lastName"
						name="lastName"
						required
						value="${beneficiary?.lastName ?? ''}"
					/>
				</label>

	  		</div>

			<div class="grid">

			  	<label for="address">
				 	Adresse

					<input
						type="text"
					 	id="address"
					 	name="address"
					 	required
					 	value="${beneficiary?.address ?? ''}"
				 	/>

			  	</label>

				<label for="complementary">
					Complément d'adresse (facultatif)

					<input
						type="text"
					 	id="complementary"
					 	name="complementary"
					 	value="${beneficiary?.complementary ?? ''}"
				 	/>

				</label>

			</div>

			<p>
				${beneficiary
			? `
					<a href="${maps}" target="_blank">Voir sur maps</a>
				`
			: ''
		}
			</p>

			<div class="grid">

			  	<label for="city">
				 	Ville

					<input
					 	type="text"
					  	id="city"
					  	name="city"
					  	required
					  	value="${beneficiary?.city ?? ''}"
				  	/>

			  	</label>

				<label for="zipcode">
					Code postal

					<input
					 	type="text"
					  	id="zipCode"
					  	name="zipCode"
					  	required
					  	value="${beneficiary?.zipCode ?? ''}"
				  	/>
				</label>

			</div>

			<div class="grid">

			  	<label for="department">
				 	Département

					<input
						type="text"
					  	id="department"
					  	name="department"
					  	value="59"
							disabled
				  	/>

			  	</label>

				<label for="phone">
				  	Téléphone

					<input
					  type="tel"
						id="phone"
						name="phone"
						required
						value="${beneficiary?.phone ?? ''}"
					/>

			  	 </label>
			</div>

			<div class="grid">
			  	<label for="parts">
				 	Parts*

					<input
					 	type="number"
				   		id="parts"
				   		name="parts"
				   		required
				   		value="${beneficiary?.parts ?? ''}"
			   		/>
						 *Nombre de personnes bénéficiaires de la zakât
			  	</label>

				<label for="food">
				  	Coutumes alimentaires

					<select id="food" name="food">
						<option value="maghreb" ${beneficiary?.food === 'maghreb' ? 'selected' : ''}>Maghreb</option>
						<option value="afrique" ${beneficiary?.food === 'afrique' ? 'selected' : ''}>Afrique subsaharienne</option>
						<option value="europe" ${beneficiary?.food === 'europe' ? 'selected' : ''}>Europe</option>
						<option value="proche-orient" ${beneficiary?.food === 'proche-orient' ? 'selected' : ''}>Proche-orient(Syrie, Liban)</option>
						<option value="asie" ${beneficiary?.food === 'asie' ? 'selected' : ''}>Asie</option>
					</select>
			   </label>
			</div>

			<div class="grid mt-1">
				<label for="notes">
					Remarques (facultatif)

					<textarea
						id="notes"
						name="notes"
					>${beneficiary?.notes ?? ''}</textarea>

				</label>
			</div>

			<div class="grid">
				<label for="agreed" class="mt-1 pl-1">
					<input type="checkbox" role="switch" id="agreed" name="agreed" value="1" ${beneficiary?.agreed === false ? '' : 'checked'}>

					Acceptez-vous de nous confier la responsabilité de votre don en cas d'indisponibilité lors de sa distribution ?
				</label>
			</div>


				${beneficiary
			? /*html*/ `
			    <div class="grid">

					<label for="deliverable" class="mt-1 pl-1">
						<input type="checkbox" role="switch" id="deliverable" name="deliverable" value="1" ${beneficiary.deliverable ? 'checked' : ''}>

						Livrable
					</label>
                </div>

				<div class="grid">

					<label for="delivered" class="mt-1 pl-1">
						<input type="checkbox" role="switch" id="delivered" name="delivered" value="1" ${beneficiary.delivered ? 'checked' : ''}>

						Livré
					</label>

					<input type="hidden" name="id" value="${beneficiary?.delivered}"/>
				</div>

				<input type="hidden" name="id" value="${beneficiary?.id}"/>
				`
			: ''
		}

			<div class="grid mt-2">
				${beneficiary
			? /*html*/ `
					<a href="${URLs.beneficiaries.list}" role="button" class="secondary">Retour</a>
				`
			: ''
		}

				<button>Valider</button>
				</div>
				${beneficiary
			? /*html*/ `
			<button hx-post="${URLs.beneficiaries.delete}?id=${beneficiary?.id}" hx-trigger="click" class="danger w-100">Supprimer</button>
			`
			: ''
		}
			</form>
	`;
}
