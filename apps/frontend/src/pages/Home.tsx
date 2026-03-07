export default function Home() {
	return (
		<div className="min-h-screen bg-zinc-900 text-white relative overflow-hidden flex flex-col font-sans">
			<div className="relative w-full my-30 flex justify-center">
				{/* Glow */}
				<div className="absolute inset-0 flex justify-center items-center pointer-events-none">
					<div className="w-[500px] h-[220px] bg-gradient-to-r from-white/10 via-zinc-200/10 to-white/10 blur-[100px] rounded-full"></div>
				</div>

				{/* Content */}
				<div className="relative z-10 text-center">
					<h1 className="text-7xl">Welcome to Insomnia</h1>
					<h3 className="text-4xl mt-5 text-zinc-500 font-sans">
						A hub for late-night writers
					</h3>
					<div className="flex items-center justify-center mt-4">
						<span className="relative flex size-3 mr-2">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
							<span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
						</span>
						<h3 className="text-xl text-slate-400 font-sans">
							<span className="text-green-400">
								<strong>10</strong>
							</span>{" "}
							night owls are currently writing
						</h3>
					</div>
				</div>
			</div>
			<div className="border border-slate-600 p-3 rounded-tl-2xl rounded-tr-2xl bg-zinc-950 w-5/6 mt-10 m-auto min-h-screen max-h-auto"></div>
		</div>
	);
}
