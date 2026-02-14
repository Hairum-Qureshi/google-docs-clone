export default function DisplayDocument({ title }: { title: string }) {
	return (
		<div className="bg-white w-40 h-60 border border-slate-300 rounded-lg p-3 hover:cursor-pointer hover:shadow-lg transition-shadow duration-300">
			<div className="text-center">{title}</div>
		</div>
	);
}
