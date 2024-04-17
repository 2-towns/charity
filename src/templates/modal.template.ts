interface Props {
	title: string
	message: string
	href?: string
	reset?: boolean
}

export function ModalHTML({ title, message, reset = false, href = "#" }: Props) {
	return /*html*/`
		<dialog open id="dialog">
			<article>
				<h3>${title}</h3>
				<p>${message}</p>
				<footer>
					<a id="dialog-close" href="${href}" role="button" data-reset="${reset}">Fermer</a>
				</footer>
			</article>

			<script>
				document.getElementById("dialog-close").onclick = function(e){
					const a = document.getElementById("dialog-close");
					const href = a.getAttribute("href")

					if(href === "#") {
						e.preventDefault();

						document.getElementById("dialog").removeAttribute("open");
					}
				}
			</script>
  		</dialog>
	`
}
