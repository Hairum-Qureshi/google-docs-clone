import { Editor } from "@tiptap/react";
import { HiMiniBold } from "react-icons/hi2";
import { FaItalic } from "react-icons/fa";
import { ImUnderline } from "react-icons/im";
import { FaStrikethrough } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa6";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { MdOutlineFormatListNumbered } from "react-icons/md";

export default function Toolbar({ editor }: { editor: Editor | null }) {
	if (!editor) return null;

	return (
		<div>
			<div className="flex items-center gap-4 text-black mx-10">
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={!editor.can().chain().focus().toggleBold().run()}
				>
					<HiMiniBold
						className={`text-lg cursor-pointer ${
							editor.isActive("bold") ? "text-blue-500" : "hover:text-zinc-400"
						}`}
					/>
				</button>

				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					disabled={!editor.can().chain().focus().toggleItalic().run()}
				>
					<FaItalic
						className={`text-lg cursor-pointer ${
							editor.isActive("italic")
								? "text-blue-500"
								: "hover:text-zinc-400"
						}`}
					/>
				</button>

				<button
					onClick={() => editor.chain().focus().toggleUnderline().run()}
					disabled={!editor.can().chain().focus().toggleUnderline().run()}
				>
					<ImUnderline
						className={`text-lg cursor-pointer ${
							editor.isActive("underline")
								? "text-blue-500"
								: "hover:text-zinc-400"
						}`}
					/>
				</button>

				<button
					onClick={() => editor.chain().focus().toggleStrike().run()}
					disabled={!editor.can().chain().focus().toggleStrike().run()}
				>
					<FaStrikethrough
						className={`text-lg cursor-pointer ${
							editor.isActive("strike")
								? "text-blue-500"
								: "hover:text-zinc-400"
						}`}
					/>
				</button>

				<button
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					disabled={!editor.can().chain().focus().toggleBlockquote().run()}
				>
					<FaQuoteRight
						className={`text-lg cursor-pointer ${
							editor.isActive("blockquote")
								? "text-blue-500"
								: "hover:text-zinc-400"
						}`}
					/>
				</button>

				<div className="border border-zinc-400 h-5" />

				<button
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					disabled={!editor.can().chain().focus().toggleBulletList().run()}
				>
					<MdOutlineFormatListBulleted
						className={`text-xl cursor-pointer ${
							editor.isActive("bulletList")
								? "text-blue-500"
								: "hover:text-zinc-400"
						}`}
					/>
				</button>

				<button
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					disabled={!editor.can().chain().focus().toggleOrderedList().run()}
				>
					<MdOutlineFormatListNumbered
						className={`text-xl cursor-pointer ${
							editor.isActive("orderedList")
								? "text-blue-500"
								: "hover:text-zinc-400"
						}`}
					/>
				</button>
			</div>
		</div>
	);
}
