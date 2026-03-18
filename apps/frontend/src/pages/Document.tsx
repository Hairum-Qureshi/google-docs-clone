import TipTapEditor from "../components/TipTapEditor";
import Toolbar from "../components/Toolbar";
import { useEditor } from "@tiptap/react";
import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";
import Collaboration from "@tiptap/extension-collaboration";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import "../css/index.css";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import TextAlign from "@tiptap/extension-text-align";
import { modalStore } from "../store/modalStore";
import InviteModal from "../components/InviteModal";

// ! if you're typing on the first line, the caret seems to get cut off from the top

// ! Resolve issue where if you're the only one in a document, autosave doesn't work
// ! For some reason you have to click at the top to get the textarea focused
// TODO - add the 'saving...' text when the document is being saved, and 'saved' text when it finishes saving.
// TODO - add a space for the title
// TODO - make the 'add user' button work, and show the list of users in the document

export default function Document() {
	const { data: currUser } = useCurrentUser();
	const { docID } = useParams();
	const { showModal } = modalStore();

	// 1. Provider needs docID. If docID changes, you need a new connection.
	const provider = useMemo(() => {
		return new HocuspocusProvider({
			url: import.meta.env.VITE_HOCUSPOCUS_WEBSOCKET,
			name: docID || "-1", // docID might be undefined initially
			document: new Y.Doc()
		});
	}, [docID]); // Add docID here

	// 2. Extensions need currUser and provider.
	const extensions = useMemo(
		() => [
			StarterKit,
			Link,
			Underline,
			Collaboration.configure({
				document: provider.document
			}),
			CollaborationCaret.configure({
				provider,
				// user: {
				// 	// Now this updates when currUser fetches/changes
				// 	name: currUser
				// 		? `${currUser.firstName} ${currUser.lastName}`
				// 		: "Anonymous",
				// 	color: "#f783ac"
				// },
				render: user => {
					const caret = document.createElement("span");
					caret.classList.add("collaboration-carets__caret");
					caret.setAttribute(
						"style",
						`border-color: ${user.color}; --caret-color: ${user.color}`
					);

					const label = document.createElement("div");
					label.classList.add("collaboration-carets__label");
					label.setAttribute("style", `background-color: ${user.color}`);
					label.innerText = user.name;

					caret.appendChild(label);
					return caret;
				}
			}),
			TextAlign.configure({
				types: ["heading", "paragraph"]
			})
		],
		[provider, currUser]
	); // Add both dependencies here

	const editor = useEditor({ extensions }); // No need for [provider] here now

	useEffect(() => {
		if (editor && currUser && !editor.isDestroyed) {
			editor.commands.updateUser({
				name: `${currUser.firstName} ${currUser.lastName}`,
				color: "#f783ac"
			});
		}
	}, [currUser, editor]);

	if (!editor) return null;

	return (
		<div className="min-h-screen bg-zinc-900 flex flex-col items-center p-5">
			{showModal && <InviteModal />}
			<div className="w-full border border-slate-700 rounded-md p-3">
				<Toolbar editor={editor} />
			</div>
			<div className="w-2/3 bg-white p-4 h-[80vh] overflow-hidden mt-6">
				<TipTapEditor editor={editor} />
			</div>
		</div>
	);
}
