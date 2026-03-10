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
import { useMemo } from "react";

// ! if you're typing on the first line, the caret seems to get cut off from the top 

export default function Document() {
	const { data: currUser } = useCurrentUser();

	const provider = useMemo(() => {
		return new HocuspocusProvider({
			url: import.meta.env.VITE_HOCUSPOCUS_WEBSOCKET, // your Hocuspocus WS endpoint
			name: "document-1",
			document: new Y.Doc()
		});
	}, []); // Empty dependency array means create once

	// 3. Wrap extensions in useMemo so they don't trigger re-renders
	const extensions = useMemo(
		() => [
			StarterKit,
			Link,
			Underline,
			Collaboration.configure({ document: provider.document }),
			CollaborationCaret.configure({
				provider,
				user: {
					name: currUser
						? `${currUser.firstName} ${currUser.lastName}`
						: "Anonymous",
					color: "#f783ac"
				},
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
			})
		],
		[provider]
	); // Only recreate if provider changes

	const editor = useEditor({ extensions }); // No need for [provider] here now

	if (!editor) return null;

	return (
		<div className="min-h-screen max-h-auto bg-zinc-900">
			<div className="p-10">
				<div className="m-auto p-3 flex w-2/3 bg-white tr-rounded-md tl-rounded-md">
					<Toolbar editor={editor} />
				</div>
				<div className="w-2/3 outline-0 border-0 bg-white p-2 h-[80vh] overflow-hidden m-auto">
					<div className="mx-10 h-full">
						<TipTapEditor editor={editor} />
					</div>
				</div>
			</div>
		</div>
	);
}
