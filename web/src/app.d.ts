// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Session, User } from '@prisma/client';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
			session: Session | null;
		}

		interface PageData {
			flash?: {
				type: 'loading' | 'info' | 'success' | 'warning' | 'error';
				message: string;
				description?: string;
				duration?: number;
			};
		}

		interface Document {
			startViewTransition?(callback: () => Promise<void>): void;
		}

		// interface PageState {}
		// interface Platform {}
	}
}

export {};
