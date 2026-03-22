import { useState } from "react";
import { modalStore } from "../store/modalStore";
import Tag from "./Tag";

export default function InviteModal() {
	const { setShowModal } = modalStore();
	const [emails, setEmails] = useState<string[]>([]);
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("viewer");

	// TODO - will need to add verification (most likely from the backend) when adding users to the document. Will need to check if the newly added users exceed the max user limit (i.e. if there are 50 users in the document and the user tries adding another 60 users, we should show an error message that only 50 more users can be added). Will also need to add a way to display the list of added users (probably in the form of tags) and a way to remove any added user before sending out the invites.

	function removeEmail(index: number) {
		setEmails(prev => prev.filter((_, i) => i !== index));
	}

	return (
		<div className="fixed inset-0 z-10 flex items-center justify-center">
			<div
				className="absolute inset-0 bg-black/60"
				onClick={() => setShowModal(false)}
			/>
			<div
				className="relative z-20 w-1/2 rounded-lg p-6 
				bg-gray-800 border border-slate-700 text-slate-100 shadow-xl"
				onClick={e => e.stopPropagation()}
			>
				<h2 className="text-xl font-semibold mb-4">Invite People</h2>

				<div className="flex w-full mb-2">
					<input
						type="email"
						placeholder="Enter email address"
						className="w-[80%] rounded-bl-md rounded-tl-md px-3 py-2 
    					bg-gray-700 border border-slate-600 
    					text-slate-100 placeholder-slate-400 outline-none"
						value={email}
						onChange={e => setEmail(e.target.value)}
						onKeyDown={e => {
							if (e.key === "Enter" && email) {
								if (emails.includes(`${email} (${role})`)) {
									return alert("This email has already been added.");
								}

								if (!/\S+@\S+\.\S+/.test(email)) {
									return alert("Please enter a valid email address.");
								}

								if (emails.length >= 100) {
									return alert(
										"You can only add up to 100 users to a document."
									);
								}

								setEmails(prev => [...prev, `${email} (${role})`]);
								setEmail("");
							}
						}}
					/>
					<select
						className="w-[20%] px-3 py-2 
						rounded-tr-md rounded-br-md
						bg-slate-600 border border-l-0 border-slate-600
						text-slate-100 outline-none cursor-pointer"
						defaultValue="viewer"
						onChange={e => setRole(e.target.value)}
					>
						<option value="viewer">Viewer</option>
						<option value="editor">Editor</option>
					</select>
				</div>
				<p className="text-sm text-slate-400 mb-2">
					Max 100 users per document.
				</p>
				<div className="flex flex-wrap gap-3 mb-4 max-h-40 overflow-y-auto">
					<p className="text-sm text-slate-300 w-full text-center italic my-2">
						If you're planning to add more than one user, please enter their
						email, select their role, then hit enter to add them to the list.
						You can remove any added email by clicking the "x" on the tag.
						Please play close attention to the email addresses you enter and
						roles you assign, as we won't ask for confirmation before sending
						out the invites.
					</p>
					{emails.map((email, index) => (
						<div onClick={() => removeEmail(index)} key={index}>
							<Tag email={email} />
						</div>
					))}
				</div>
				<div className="flex justify-end space-x-2">
					<button
						className="px-4 py-2 rounded 
						bg-slate-600 hover:bg-slate-500 text-slate-100 hover:cursor-pointer"
						onClick={() => setShowModal(false)}
					>
						Cancel
					</button>

					<button
						className="px-4 py-2 rounded 
						bg-blue-600 hover:bg-blue-500 text-white hover:cursor-pointer"
					>
						Send Invite
					</button>
				</div>
			</div>
		</div>
	);
}
