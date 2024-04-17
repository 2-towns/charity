interface Props {
	message: string
}

export function ErrorHTML({ message }: Props) {
	return `
		<h1>Erreur</h1>
		<p>${message}</p>
	`
}
