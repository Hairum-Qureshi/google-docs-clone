import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Document from "../pages/Document";
import "../css/index.css";
import useSocketStore from "../store/socketStore";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useEffect } from "react";

export default function App() {
	const connectSocket = useSocketStore(state => state.connectSocket);
	const disconnectSocket = useSocketStore(state => state.disconnectSocket);
	const { data: userData } = useCurrentUser();

	useEffect(() => {
		if (!userData) return;

		connectSocket(userData._id);

		return () => {
			disconnectSocket();
		};
	}, [userData]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/document/:docID" element={<Document />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
