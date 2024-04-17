import { CACHEBUSTER } from "../util/constants.js";

interface Props {
	body: string
	color: "dark" | "light" | undefined
}

export function LayoutHTML({ body, color = "light" }: Props): string {
	return /*html*/ `
        <!DOCTYPE html>
        <html lang="fr" data-theme="${color}" >
            <head>
								<title>ZAF</title>
                <meta charset="utf-8" />
                <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap" rel="stylesheet">
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="description" content="Inscription pour bénéficier de zakât el fitr dans la métropole lilloise" />
                <meta name="theme-color" content="#FFF" />
                <meta name="htmx-config" content='{"allowEval": true, "includeIndicatorStyles": false}' />
                <meta name="robots" content="noindex" />
                <meta name="generator" content="WordPress 6.1.1" />
                <meta name="referrer" content="strict-origin-when-cross-origin" />

				<link rel="stylesheet" href="/css/pico.min.css?version=${CACHEBUSTER}">
				<link rel="stylesheet" href="/css/main.css?version=${CACHEBUSTER}">

            </head>

            <body>
                ${body}
				<div id="htmx-container"></div>
				<script src="/js/htmx-1.8.5.min.js"></script>
            </body>
        </html>
    `;
}
