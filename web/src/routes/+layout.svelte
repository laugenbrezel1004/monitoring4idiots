<script lang="ts">
    import '../app.css';
    import {ModeWatcher} from 'mode-watcher';
    import {getFlash} from "sveltekit-flash-message";
    import {page} from "$app/state";
    import {executeFlash} from "$lib/utils";

    let { children } = $props();

    const flash = getFlash(page);
    $effect(() => {
        if(!$flash) return;
        executeFlash($flash);
    });
</script>

<ModeWatcher />

{@render children()}
