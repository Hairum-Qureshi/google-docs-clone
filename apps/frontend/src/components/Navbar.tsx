import { Link, useLocation } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import useDocument from "../hooks/useDocument";
import { modalStore } from "../store/modalStore";

export default function Navbar() {
	const { data: currUserData } = useCurrentUser();
	const { googleSignInMutation } = useGoogleAuth();
	const [showDropDownUsers, setShowDropDownUsers] = useState(false);
	const location = useLocation();
	const { createDocumentMutate } = useDocument();
	const { setShowModal } = modalStore();

	return (
		<div className="bg-zinc-900 text-white pt-4">
			<div className="container mx-auto flex items-center justify-between">
				<div className="text-2xl">
					<Link to="/">Insomnia</Link>
				</div>
				{location.pathname.includes("document") ? (
					<div className="flex flex-col items-center gap-4 relative">
						<div className="flex items-center space-x-3">
							<div
								className="border border-slate-600 rounded-md flex items-center px-2 py-1 bg-zinc-800 hover:cursor-pointer"
								onClick={() => setShowDropDownUsers(prev => !prev)}
							>
								<span className="relative flex size-3 mr-2">
									<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
									<span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
								</span>
								<p>10 Writing</p>
							</div>
							<div>
								<button
									className="flex items-center border border-blue-600 rounded-md px-3 py-1 bg-blue-800 hover:cursor-pointer hover:bg-blue-700 transition-colors duration-300"
									onClick={() => setShowModal(true)}
								>
									<span className="text-xl mr-2">
										<FaUserPlus />
									</span>{" "}
									Invite Users
								</button>
							</div>
						</div>
						{showDropDownUsers && (
							<div className="w-11/12 text-white wrap-break-word border border-zinc-500 rounded-md p-1 absolute mt-10 bg-zinc-800">
								<div className="space-y-3">
									<p className="px-2 text-sm">
										{currUserData
											? currUserData.firstName + " " + currUserData.lastName
											: "Unknown User"}
									</p>
									<p className="px-2 text-sm">
										{currUserData
											? currUserData.firstName + " " + currUserData.lastName
											: "Unknown User"}
									</p>
									<p className="px-2 text-sm">
										{currUserData
											? currUserData.firstName + " " + currUserData.lastName
											: "Unknown User"}
									</p>
									<p className="px-2 text-sm">
										{currUserData
											? currUserData.firstName + " " + currUserData.lastName
											: "Unknown User"}
									</p>
								</div>
							</div>
						)}
					</div>
				) : (
					<div className="flex items-center gap-4">
						<Link
							to="/about"
							className="hover:text-blue-400 transition-colors duration-300"
						>
							About
						</Link>

						<Link
							to="/my-documents"
							className="hover:text-blue-400 transition-colors duration-300"
						>
							My Documents
						</Link>

						{!currUserData ? (
							<button
								className="px-4 py-1.5 bg-blue-600 rounded hover:cursor-pointer hover:bg-blue-700 transition-colors duration-300"
								onClick={() => googleSignInMutation()}
							>
								Sign In
							</button>
						) : (
							<button
								className="px-3 py-1.5 bg-blue-600 rounded hover:cursor-pointer hover:bg-blue-700 transition-colors duration-300"
								onClick={() => createDocumentMutate()}
							>
								New Document
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
