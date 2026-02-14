import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Toolbar from "./Toolbar";
import useAutoSave from "../hooks/useAutoSave";
import useDocument from "../hooks/useDocument";
import { useEffect } from "react";

export default function Editor() {
	const { autosave } = useAutoSave();
	const { document } = useDocument();

	const editor = useEditor({
		extensions: [StarterKit, Underline],
		editorProps: {
			attributes: {
				class: "focus:outline-none flex-1 h-full"
			}
		},
		onUpdate({ editor }) {
			autosave(JSON.stringify(editor.getJSON()), "content");
		}
	});

	if (!editor) return null;

	useEffect(() => {
		try {
			if (!document?.content) return;
			editor.commands.setContent(JSON.parse(document.content));
		} catch (error) {
			console.error("Error parsing document content:", error);
		}
	}, [document]);

	return (
		<div className="w-full">
			<div className="-mt-2 flex justify-center">
				<Toolbar editor={editor} />
			</div>
			<div
				className="mx-4 leading-5 overflow-y-auto
                [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4
                [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-4
                [&_p]:mb-2
                [&_blockquote]:pl-4 [&_blockquote]:border-l-4 [&_blockquote]:border-sky-500 [&_blockquote]:italic [&_blockquote]:text-slate-400
                [&_ul]:list-disc [&_ul]:pl-6
                [&_ol]:list-decimal [&_ol]:pl-6
                [&_li]:mb-1
                [&_a]:text-sky-400 [&_a]:underline [&_a]:hover:text-sky-300 mt-3 h-[calc(100vh-4rem)]"
			>
				<EditorContent editor={editor} className="flex-1 h-full" />
			</div>
		</div>
	);
}
