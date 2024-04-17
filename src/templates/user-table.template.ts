import { User } from "../types.js"
import { URLs } from "../util/urls.js"

interface Props {
	users: User[]
}

export function UserTableHTML({ users }: Props) {
	let Rows = users.map(user => {
		return /*html*/`
			<tr>
				<td>${user.login}</td>
				<td>${user.phone}</td>
				<td>
					<a
						hx-post="${URLs.users.destroy}"
						hx-target="#table"
						hx-vals='{"email": "${user.login}"}'
						mb-0
					>
						Supprimer
					</button>
				</td>
			</tr>
		`
	}).join("")


	return /*html*/`
		<table role="grid" id="table">
			<thead>
				<tr>
					<th scope="col">Email</th>
					<th scope="col">Téléphone</th>
					<th scope="col">Actions</th>
				</tr>
			</thead>
			<tbody>
				${Rows}
			</tbody>
		</table>
	`
}
