interface UseGoogleAuthHook {
	googleSignInMutation: () => Promise<void>;
	signOut: () => Promise<void>;
}

interface UserDocument {
	_id: string;
	authorUID: string;
	title: string;
	isPublic: boolean;
	createdAt: string;
	updatedAt: string;
}

export type { UseGoogleAuthHook, UserDocument };
