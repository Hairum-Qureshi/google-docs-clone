import useGoogleAuth from "../hooks/useGoogleAuth";
import { useCurrentUser } from "../hooks/useCurrentUser";
import DisplayDocument from "../components/DisplayDocument";
import { Link } from "react-router-dom";
import useDocument from "../hooks/useDocument";
import type { Document } from "../interfaces";

export default function Home() {
	const { googleSignInMutation } = useGoogleAuth();
	const { data: currUserData } = useCurrentUser();
	const { createDocumentMutate, allDocuments } = useDocument();
	// TODO - have 'create document' generate a unique ID from the backend (right now, it's using a static placeholder ID)

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
								onClick={() => createDocumentMutate()}
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
				{!allDocuments?.length ? (
					<p className="flex items-center justify-center mt-20 text-xl text-sky-600">
						No documents found. Create a new document to get started!
					</p>
				) : (
					allDocuments?.map((document: Document) => (
						<div className="inline-block m-4" key={document._id}>
							<Link to={`/document/${document._id}`} key={document._id}>
								<DisplayDocument title={document.title} />
							</Link>
						</div>
					))
				)}
			</div>
		</div>
	);
}
