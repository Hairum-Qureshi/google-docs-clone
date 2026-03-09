import { Hocuspocus } from "@hocuspocus/server";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.HOCUSPOCUS_PORT || 8000;
const server = new Hocuspocus({
	port: +PORT,
	async onConnect() {
		console.log("Client connected! 🔮");
	}
});

server.listen();
console.log(
	`Hocuspocus server and websocket server running successfully on port ${PORT}!`
);
