import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		fs: {
			allow: ["../.."]
		}
	},
	resolve: {
		alias: {
			"@tiptap/react": path.resolve(
				__dirname,
				"../../node_modules/@tiptap/react"
			),
			"@tiptap/starter-kit": path.resolve(
				__dirname,
				"../../node_modules/@tiptap/starter-kit"
			),
			"@tiptap/extension-collaboration": path.resolve(
				__dirname,
				"../../node_modules/@tiptap/extension-collaboration"
			),
			"@tiptap/extension-collaboration-caret": path.resolve(
				__dirname,
				"../../node_modules/@tiptap/extension-collaboration-caret"
			),
			"@tiptap/extension-link": path.resolve(
				__dirname,
				"../../node_modules/@tiptap/extension-link"
			),
			"@tiptap/extension-underline": path.resolve(
				__dirname,
				"../../node_modules/@tiptap/extension-underline"
			)
		}
	}
});
