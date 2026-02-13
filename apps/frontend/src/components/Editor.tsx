import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Toolbar from "./Toolbar";

export default function Editor() {
	const editor = useEditor({
		extensions: [StarterKit, Underline],
		editorProps: {
			attributes: {
				class: "focus:outline-none flex-1 h-full"
			}
		}
	});

	if (!editor) return null;

	return (
		<div className="w-full">
			<div className="-mt-5">
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
