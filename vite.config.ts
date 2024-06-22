import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import vitePluginString from "vite-plugin-string";

export default defineConfig({
	plugins: [sveltekit(), vitePluginString()],
	optimizeDeps: {
		exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
	},
});
