import { Editor, EditorContent } from "@tiptap/react";

export default function TipTapEditor({ editor }: { editor: Editor | null }) {
	return (
		<div className="w-full">
			<div
				className="leading-5 h-screen overflow-y-auto
                [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4
                [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-4
                [&_p]:mb-2
                [&_blockquote]:pl-4 [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:italic [&_blockquote]:text-slate-400
                [&_ul]:list-disc [&_ul]:pl-6
                [&_ol]:list-decimal [&_ol]:pl-6
                [&_li]:mb-1
                [&_a]:text-zinc-400 [&_a]:underline [&_a]:hover:text-zinc-300"
			>
				<EditorContent editor={editor} className="flex-1 h-full" />
			</div>
		</div>
	);
}
