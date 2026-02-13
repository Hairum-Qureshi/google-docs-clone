import useGoogleAuth from "../hooks/useGoogleAuth";
import { useCurrentUser } from "../hooks/useCurrentUser";
import DisplayDocument from "../components/DisplayDocument";
import { Link, useNavigate } from "react-router-dom";
import ObjectID from "bson-objectid";

export default function Home() {
	const { googleSignInMutation } = useGoogleAuth();
	const { data: currUserData } = useCurrentUser();
	const navigate = useNavigate();
	const documents: any[] = [];

	// TODO - have 'create document' generate a unique ID

	return (
		<div>
			<div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">
				<div className="w-full p-4 m-auto flex flex-col items-center">
					<h1 className="text-7xl text-sky-500">
						<span className="font-semibold text-blue-600">Live</span>Doc
					</h1>
					<div className="w-full text-center mt-6">
						<p className="text-2xl text-sky-600">
							Collaborate on documents in real-time with LiveDoc. Sign in to get
							started!
						</p>
					</div>
					<div className="flex flex-col items-center">
						{!currUserData ? (
							<button
								className="group relative flex items-center gap-3 bg-white text-slate-900 px-8 py-3.5 rounded-lg font-medium hover:bg-slate-100 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:cursor-pointer mt-10"
								onClick={() => googleSignInMutation()}
							>
								Continue with Google
							</button>
						) : (
							<button
								className="group relative flex items-center gap-3 bg-white text-blue-900 px-8 py-3.5 rounded-lg font-medium hover:bg-slate-100 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] border border-sky-500 hover:cursor-pointer mt-10"
								onClick={() =>
									navigate(`/document/${new ObjectID().toString()}`)
								}
							>
								Create Document
							</button>
						)}
					</div>
				</div>
			</div>
			<div className="w-full min-h-70 max-h-auto p-4 bg-slate-100">
				<h1 className="text-4xl font-semibold m-6 text-blue-600">
					My existing documents
				</h1>
				{!documents.length ? (
					<p className="flex items-center justify-center mt-20 text-xl text-sky-600">
						No documents found. Create a new document to get started!
					</p>
				) : (
					<div className="grid grid-cols-5 gap-5 space-y-10 my-10 justify-items-center">
						<Link to="/document/123">
							<DisplayDocument />
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
