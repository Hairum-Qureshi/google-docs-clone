import { Hocuspocus } from "@hocuspocus/server";
import axios from "axios";
import { Database } from "@hocuspocus/extension-database";

import dotenv from "dotenv";

dotenv.config();

const server = new Hocuspocus({
	port: +process.env.HOCUSPOCUS_PORT! || 8000,
	async onConnect(data) {
		// Access the unique connection ID
		console.log("Client connected");
	},
	async onDisconnect(data) {
		// Access the unique connection ID
		console.log("Client disconnected");
	},
	extensions: [
		// Database extension cast to 'any' to avoid type mismatch between @hocuspocus packages
		new Database({
			fetch: async ({ documentName }: { documentName: string }) => {
				try {
					console.log(`Attempting to fetch doc: ${documentName}`);
					const response = await axios.get(
						`${process.env.NEST_BACKEND}/api/document/${documentName}/binary`,
						{ responseType: "arraybuffer" }
					);

					if (response.data && response.data.byteLength > 0) {
						return new Uint8Array(response.data);
					}

					// IMPORTANT: Return null for brand-new documents
					return null;
				} catch (e) {
					return null; // Start fresh if 404 or error
				}
			},
			store: async ({ documentName, state }) => {
				try {
					await axios.patch(
						`${process.env.NEST_BACKEND}/api/document/${documentName}/update-content`,
						state, // Send the raw Uint8Array directly, NOT an object
						{
							headers: {
								"Content-Type": "application/octet-stream" // Tells NestJS this is binary
							}
						}
					);
				} catch (error: any) {
					// Log the actual error message from NestJS to debug the 500
					console.error("Save Error:", error.response?.data || error.message);
				}
			}
		}) as unknown as any
	]
});

server.listen();
