import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import "../css/index.css";
import Navbar from "./Navbar";
import MyDocuments from "../pages/MyDocuments";
import Document from "../pages/Document";

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/my-documents" element={<MyDocuments />} />
				<Route path="/:id/document" element={<Document />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
