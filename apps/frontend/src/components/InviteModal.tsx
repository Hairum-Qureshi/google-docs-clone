import { modalStore } from "../store/modalStore";

export default function InviteModal() {
	const { setShowModal } = modalStore();

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

				<input
					type="email"
					placeholder="Enter email address"
					className="w-full rounded px-3 py-2 mb-4 
					bg-gray-700 border border-slate-600 
					text-slate-100 placeholder-slate-400 
					focus:outline-none focus:ring-2 focus:ring-slate-400"
				/>

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
