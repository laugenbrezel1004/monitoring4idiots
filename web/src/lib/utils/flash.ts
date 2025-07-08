import { toast } from 'svelte-sonner';

export type Flash = {
	type: 'loading' | 'info' | 'success' | 'warning' | 'error';
	message: string;
	description?: string;
	duration?: number;
};

export function executeFlash($flash: Flash) {
	switch ($flash.type) {
		case 'loading':
			toast.loading($flash.message, {
				description: $flash.description,
				duration: $flash.duration
			});
			break;
		case 'info':
			toast.info($flash.message, {
				description: $flash.description,
				duration: $flash.duration
			});
			break;
		case 'success':
			toast.success($flash.message, {
				description: $flash.description,
				duration: $flash.duration
			});
			break;
		case 'warning':
			toast.warning($flash.message, {
				description: $flash.description,
				duration: $flash.duration
			});
			break;
		case 'error':
			toast.error($flash.message, {
				description: $flash.description,
				duration: $flash.duration
			});
			break;
	}
}
