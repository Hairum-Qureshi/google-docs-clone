export default function InviteModal({
	setModalVisibility
}: {
	setModalVisibility: (visible: boolean) => void;
}) {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-10">
			<div className="bg-slate-100 border border-slate-300 rounded-lg p-6 w-1/2">
				<h2 className="text-xl font-semibold mb-4">Invite People</h2>
				<input
					type="email"
					placeholder="Enter email address"
					className="w-full border border-slate-400 rounded px-3 py-2 mb-4"
				/>
				<div className="flex justify-end space-x-2">
					<button
						className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 hover:cursor-pointer"
						onClick={() => setModalVisibility(false)}
					>
						Cancel
					</button>
					<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:cursor-pointer">
						Send Invite
					</button>
				</div>
			</div>
		</div>
	);
}
