import { User } from "../types.js";
import { URLs } from "../util/urls.js";
import { AuthHeaderHTML } from "./auth-header.template.js";
import { UserTableHTML } from "./user-table.template.js";

interface Props {
	users: User[]
}

export function UserListHTML({ users }: Props) {
	return /*html*/`
		${AuthHeaderHTML()}

		<div class="container">
			<a role="button" href="${URLs.users.create}">Ajouter un utilisateur</a>

			<section>
				<figure>
					${UserTableHTML({ users })}
				</figure>
			</section>
		</div>

    `;
}
