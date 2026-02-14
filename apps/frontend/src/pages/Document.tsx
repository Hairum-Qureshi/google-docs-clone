import { useState } from "react";
import Editor from "../components/Editor";
import InviteModal from "../components/InviteModal";

export default function Document() {
	// TODO - make the document title editable
	// TODO - make the invite button open a modal with sharing options
	// TODO - make the share button open a modal with sharing options and link to the document
	// TODO - make the user profile pictures dynamic based on the users that are currently viewing/editing the document (make sure not to show your profile picture)
	// TODO - make the document content dynamic based on the document ID in the URL and update in real-time as other users edit the document
    // TODO - add a delete document option for the author of the document, and make sure to remove access for all collaborators when a document is deleted
	// TODO - implement real-time collaboration using WebSockets to sync document changes between users

	const [showModal, setModalVisibility] = useState(false);

	return (
		<div className="min-h-screen max-h-auto bg-slate-100 p-3">
			<div className="flex items-center justify-between w-full mb-5">
				<div className="w-full flex items-center mb-5 justify-start text-blue-700 space-x-3 text-3xl font-semibold">
					<h1>Document Title</h1>
				</div>
				<div className="w-full flex items-center mb-5 justify-end space-x-3">
					<div className="flex items-center">
						<img
							src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
							alt="User Profile"
							className="w-10 h-10 rounded-full"
						/>
						<img
							src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
							alt="User Profile"
							className="w-10 h-10 rounded-full"
						/>
						<img
							src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
							alt="User Profile"
							className="w-10 h-10 rounded-full"
						/>
						<div>
							<p className="text-lg text-sky-600 w-10 h-10 rounded-full flex items-center justify-center bg-sky-300 font-semibold">
								+3
							</p>
						</div>
					</div>
					<button className="bg-blue-500 text-white py-2 px-6 rounded hover:cursor-pointer">
						Share
					</button>
					<button
						className="bg-blue-800 text-white py-2 px-6 rounded hover:cursor-pointer"
						onClick={() => setModalVisibility(true)}
					>
						Invite
					</button>
				</div>
			</div>
			<div className="m-auto h-screen w-7/12 border border-slate-300 bg-white py-5">
				{showModal && <InviteModal setModalVisibility = {setModalVisibility} />}
				<Editor />
			</div>
		</div>
	);
}
