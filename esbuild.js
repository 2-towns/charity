import { context } from "esbuild";

context({
	bundle: true,
	keepNames: true,
	target: "es6",
	external: ["*.svg", "*.png", "*.jpg", "*.jpeg", "*.wepb", "*.ttf"],
	sourcemap: "both",
	entryPoints: ["public/css/main.css"],
	entryNames: "[dir]/[name]",
	platform: "browser",
	outdir: "dist/public/css",
}).then((c) => {
	c.watch()

	console.info("Watching files...", ["public/css/main.css"])
})

