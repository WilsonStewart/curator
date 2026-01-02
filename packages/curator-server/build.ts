await Bun.build({
	entrypoints: ["./src/index.ts"],
	outdir: "./dist",
	target: "bun",
	format: "esm",
	sourcemap: "linked",
	splitting: true,
	minify: true,
	packages: "external",
	root: "./src",
});
