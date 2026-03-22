import { Link } from "react-router-dom";
import UserDoc from "../components/UserDoc";
import useDocument from "../hooks/useDocument";
import type { UserDocument } from "../interfaces";

export default function MyDocuments() {
	const { allDocuments } = useDocument();

	console.log(allDocuments);

	return (
		<div className="min-h-screen max-h-auto bg-zinc-900 text-white">
			{/* <div className="mt-5 w-full flex justify-center">
				<input
					type="text"
					placeholder="Search documents..."
					className="w-1/2 p-2 bg-zinc-800 text-white rounded"
				/>
				<button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">
					Search
				</button>
			</div> */}
			<div className="p-10">
				<h2 className="text-3xl font-semibold">My Documents</h2>
				<div className="flex justify-center">
					{!allDocuments ||
						(!allDocuments.createdDocuments.length && (
							<h3 className="text-center font-semibold text-2xl mt-10">
								No documents found
							</h3>
						))}
					<div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
						{allDocuments &&
							allDocuments.createdDocuments.map((doc: UserDocument) => (
								<Link to={`/${doc._id}/document`} key={doc._id}>
									<UserDoc />
								</Link>
							))}
					</div>
				</div>
			</div>
			<div className="p-10">
				<h2 className="text-3xl font-semibold">Documents I'm Added To</h2>
				<div className="flex justify-center">
					{!allDocuments ||
						(!allDocuments.addedToDocuments.length && (
							<h3 className="text-center font-semibold text-2xl mt-10">
								You haven't been added to any documents yet
							</h3>
						))}
					<div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
						{allDocuments &&
							allDocuments.addedToDocuments.map((doc: UserDocument) => (
								<Link to={`/${doc._id}/document`} key={doc._id}>
									<UserDoc />
								</Link>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
