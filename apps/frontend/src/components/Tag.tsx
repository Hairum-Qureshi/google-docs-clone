import { IoClose } from "react-icons/io5";

export default function Tag() {
	return (
		<div className="px-2 py-1 hover:cursor-pointer rounded-md bg-slate-700 flex items-center w-max">
			<p>john@gmail.com</p>
			<button
				className="text-red-500 hover:cursor-pointer text-lg hover:text-red-400 ml-3"
				title="Remove"
			>
				<IoClose />
			</button>
		</div>
	);
}
