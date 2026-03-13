import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import type { Document } from "../interfaces";
import type { DocumentType, MarkType, NodeType, TextType } from "@tiptap/core";

interface UseDocumentHook {
	createDocumentMutate: () => void;
	allDocuments: Document[] | undefined;
	document: Document | undefined;
	updateDocumentTitleMutate: (title: string) => void;
	updateDocumentContentMutate: (content: string) => void;
}

export default function useDocument(): UseDocumentHook {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { docID } = useParams();

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
			navigate(`/${response.data}/document`);
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

	const { data: document } = useQuery({
		queryKey: ["document", docID],
		queryFn: async () => {
			try {
				if (docID) {
					const response = await axios.get(
						`${import.meta.env.VITE_BACKEND_URL}/api/document/${docID}`,
						{
							withCredentials: true
						}
					);
					return response.data;
				}
				return undefined;
			} catch (error) {
				console.error(error);
			}
		}
	});

	const { mutate: updateDocumentTitleMutate } = useMutation({
		mutationFn: async (title: string) => {
			try {
				const response = await axios.patch(
					`${import.meta.env.VITE_BACKEND_URL}/api/document/${docID}/update-title`,
					{
						title
					},
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
			queryClient.invalidateQueries({
				queryKey: ["documents", response.data._id]
			});
		}
	});

	const { mutate: updateDocumentContentMutate } = useMutation({
		mutationFn: async (content: string) => {
			try {
				const response = await axios.patch(
					`${import.meta.env.VITE_BACKEND_URL}/api/document/${docID}/update-content`,
					{
						content
					},
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
			queryClient.invalidateQueries({
				queryKey: ["documents", response.data._id]
			});
		}
	});

	return {
		createDocumentMutate,
		allDocuments,
		document,
		updateDocumentTitleMutate,
		updateDocumentContentMutate
	};
}
