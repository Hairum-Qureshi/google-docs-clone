import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { Document } from "../interfaces";

interface UseDocumentHook {
	createDocumentMutate: () => void;
	allDocuments: Document[] | undefined;
}

export default function useDocument(): UseDocumentHook {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: createDocumentMutate } = useMutation({
		mutationFn: async () => {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/api/document/new`,
					{},
					{
						withCredentials: true
					}
				);

				return response;
			} catch (error) {
				console.error(error);
			}
		},
		onSuccess: response => {
			if (!response) return;
			queryClient.invalidateQueries({ queryKey: ["documents"] });
			navigate(`/document/${response.data}`);
		}
	});

	const { data: allDocuments } = useQuery({
		queryKey: ["documents"],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/api/document/all`,
					{
						withCredentials: true
					}
				);
				return response.data;
			} catch (error) {
				console.error(error);
			}
		}
	});

	return { createDocumentMutate, allDocuments };
}
