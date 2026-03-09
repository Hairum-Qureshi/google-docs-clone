import { Hocuspocus } from "@hocuspocus/server";

const server = new Hocuspocus({
	port: 8000,
	async onConnect() {
		console.log("Client connected! 🔮");
	}
});

server.listen();
console.log("Hocuspocus server running at ws://127.0.0.1:8000");
