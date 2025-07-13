<script lang="ts">
    import * as Card from '$lib/components/ui/card';
    import { Badge } from '$lib/components/ui/badge';
    import { Box } from '@lucide/svelte';
    import type {Host} from "@prisma/client";
    import {goto} from "$app/navigation";

    type HostDetailsCardProps = {
        host: Host;
    }

    let { host }: HostDetailsCardProps = $props();
</script>

<Card.Root class="@container/card hover:cursor-pointer" onclick={() => goto(`/app/hosts/${host.id}`)}>
    <Card.Header>
        <Card.Title class="@[250px]/card:text-2xl text-xl font-semibold tabular-nums">
            {host.name}
        </Card.Title>
        <Card.Action>
            <Box class="size-4 stroke-muted-foreground" />
        </Card.Action>
        <Card.Description>10.0.0.1</Card.Description>
    </Card.Header>
</Card.Root>
