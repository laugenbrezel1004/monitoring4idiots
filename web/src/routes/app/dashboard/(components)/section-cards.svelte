<script lang="ts">
    import * as Card from '$lib/components/ui/card';
    import { Badge } from '$lib/components/ui/badge';

    import { Users, Cpu } from '@lucide/svelte';

    let { data } = $props();
</script>

<div class="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4">
    <Card.Root class="@container/card">
        <Card.Header>
            <Card.Description>Total Hosts</Card.Description>
            <Card.Title class="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                {data.hostsCount ?? 0}
            </Card.Title>
            <Card.Action>
                <Cpu class="size-4 stroke-muted-foreground" />
            </Card.Action>
        </Card.Header>
    </Card.Root>
    <Card.Root class="@container/card">
        <Card.Header>
            <Card.Description>Total Hosts</Card.Description>
            <Card.Title class="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                {data.hostsCount ?? 0}
            </Card.Title>
            <Card.Action>
                <Cpu class="size-4 stroke-muted-foreground" />
            </Card.Action>
        </Card.Header>
    </Card.Root>
    <Card.Root class="@container/card">
        <Card.Header>
            <Card.Description>Total Users</Card.Description>
            <Card.Title class="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                {data.usersCount ?? 0}
            </Card.Title>
            <Card.Action>
                <Users class="size-4 stroke-muted-foreground" />
            </Card.Action>
        </Card.Header>
    </Card.Root>
    <Card.Root class="@container/card">
        <Card.Header>
            <Card.Description>Total Users</Card.Description>
            <Card.Title class="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                {data.usersCount ?? 0}
            </Card.Title>
            <Card.Action>
                <Users class="size-4 stroke-muted-foreground" />
            </Card.Action>
        </Card.Header>
    </Card.Root>
</div>
