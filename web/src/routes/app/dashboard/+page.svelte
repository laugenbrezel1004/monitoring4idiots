<script lang="ts">
    import SectionCards from './(components)/section-cards.svelte';

    let { data } = $props();

    console.log(data.usersCount);
</script>

<h1 class="text-2xl font-bold">Dashboard</h1>

<SectionCards {data} />