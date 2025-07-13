<script lang="ts">
    import type {Host} from "@prisma/client";
    import HostDetailCard from "./(components)/host-detail-card.svelte";

    type HostsPageProps = {
        data: {
            hosts: Host[];
        }
    }

    let { data }: HostsPageProps = $props();
    const { hosts } = data;
</script>

<h1 class="text-2xl font-bold">Hosts</h1>

<div class="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4">
    {#each hosts as host (host.id)}
        <HostDetailCard {host} />
    {/each}
</div>