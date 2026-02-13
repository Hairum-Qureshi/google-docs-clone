interface UseGoogleAuthHook {
	googleSignInMutation: () => Promise<void>;
	signOut: () => Promise<void>;
}

interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	profilePicture: string;
	createdAt: string;
}

export type { UseGoogleAuthHook, User };
