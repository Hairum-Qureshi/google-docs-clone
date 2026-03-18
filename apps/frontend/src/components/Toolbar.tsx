import { Editor } from "@tiptap/react";
import { HiMiniBold } from "react-icons/hi2";
import { FaItalic } from "react-icons/fa";
import { ImUnderline } from "react-icons/im";
import { FaStrikethrough } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa6";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { GrTextAlignRight } from "react-icons/gr";
import { GrTextAlignLeft } from "react-icons/gr";
import { GrTextAlignCenter } from "react-icons/gr";

export default function Toolbar({ editor }: { editor: Editor | null }) {
	if (!editor) return null;

	return (
		<div>
			<div className="flex items-center gap-4 text-white mx-10">
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={!editor.can().chain().focus().toggleBold().run()}
				>
					<HiMiniBold
						className={`text-xl cursor-pointer ${
							editor.isActive("bold") ? "text-blue-500" : "hover:text-zinc-400"
						}`}
					/>
				</button>

				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					disabled={!editor.can().chain().focus().toggleItalic().run()}
				>
					<FaItalic
						className={`text-xl cursor-pointer ${
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
						className={`text-xl cursor-pointer ${
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
						className={`text-xl cursor-pointer ${
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
						className={`text-xl cursor-pointer ${
							editor.isActive("blockquote")
								? "text-blue-500"
								: "hover:text-zinc-400"
						}`}
					/>
				</button>

				<div className="border border-zinc-400 h-8" />

				<button
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					disabled={!editor.can().chain().focus().toggleBulletList().run()}
				>
					<MdOutlineFormatListBulleted
						className={`text-2xl cursor-pointer ${
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
						className={`text-2xl cursor-pointer ${
							editor.isActive("orderedList")
								? "text-blue-500"
								: "hover:text-zinc-400"
						}`}
					/>
				</button>

				<div className="border border-zinc-400 h-8" />

				<button
					onClick={() => editor.chain().focus().setTextAlign("left").run()}
					disabled={!editor.can().chain().focus().setTextAlign("left").run()}
				>
					<GrTextAlignLeft
						className={`text-xl cursor-pointer ${
							editor.isActive({ textAlign: "left" })
								? "text-blue-500"
								: "hover:text-zinc-400"
						}`}
					/>
				</button>

				<button
					onClick={() => editor.chain().focus().setTextAlign("center").run()}
					disabled={!editor.can().chain().focus().setTextAlign("center").run()}
				>
					<GrTextAlignCenter
						className={`text-xl cursor-pointer ${
							editor.isActive({ textAlign: "center" })
								? "text-blue-500"
								: "hover:text-zinc-400"
						}`}
					/>
				</button>

				<button
					onClick={() => editor.chain().focus().setTextAlign("right").run()}
					disabled={!editor.can().chain().focus().setTextAlign("right").run()}
				>
					<GrTextAlignRight
						className={`text-xl cursor-pointer ${
							editor.isActive({ textAlign: "right" })
								? "text-blue-500"
								: "hover:text-zinc-400"
						}`}
					/>
				</button>
			</div>
		</div>
	);
}
