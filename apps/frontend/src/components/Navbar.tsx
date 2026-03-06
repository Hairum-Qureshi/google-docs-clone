import { Link } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import useGoogleAuth from "../hooks/useGoogleAuth";

export default function Navbar() {
	const { data: currUserData } = useCurrentUser();
	const { googleSignInMutation } = useGoogleAuth();

	return (
		<div className="bg-zinc-900 text-white pt-4">
			<div className="container mx-auto flex items-center justify-between">
				<div className="text-2xl">
					<Link to="/">Insomnia</Link>
				</div>
				<div className="flex items-center gap-4">
					<Link
						to="/about"
						className="hover:text-blue-400 transition-colors duration-300"
					>
						About
					</Link>
					<Link
						to="/my-documents"
						className="hover:text-blue-400 transition-colors duration-300"
					>
						My Documents
					</Link>
					{!currUserData ? (
						<button
							className="px-4 py-1.5 bg-blue-600 rounded hover:cursor-pointer hover:bg-blue-700 transition-colors duration-300"
							onClick={() => googleSignInMutation()}
						>
							Sign In
						</button>
					) : (
						<button className="px-3 py-1.5 bg-blue-600 rounded hover:cursor-pointer hover:bg-blue-700 transition-colors duration-300">
							New Document
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
