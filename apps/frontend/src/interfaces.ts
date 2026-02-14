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

interface Document {
	_id: string;
	title: string;
	authorUID: string;
	createdAt: string;
	updatedAt: string;
}

export type { UseGoogleAuthHook, User, Document };
