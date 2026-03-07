import TipTapEditor from "../components/TipTapEditor";
import Toolbar from "../components/Toolbar";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";

export default function Document() {
	const editor = useEditor({
		extensions: [StarterKit, Link, Underline],
		editorProps: {
			attributes: {
				class: "focus:outline-none flex-1 h-full"
			}
		}
	});

	if (!editor) return null;

	return (
		<div className="min-h-screen max-h-auto bg-zinc-900">
			<div className="p-10">
				<div className="m-auto p-3 flex w-2/3 bg-white tr-rounded-md tl-rounded-md">
					<Toolbar editor={editor} />
				</div>
				<div className="w-2/3 bg-white p-2 h-screen wrap-break-word m-auto">
					<div className="mx-10">
						<TipTapEditor editor={editor} />
					</div>
				</div>
			</div>
		</div>
	);
}
