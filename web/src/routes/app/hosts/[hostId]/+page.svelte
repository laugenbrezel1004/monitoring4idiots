<script lang="ts">
    import MemoryChart from './(components)/memory-chart.svelte';
    import type {DiskInfo, Host, InterfaceInfo, MemoryInfo, SystemInfo} from "@prisma/client";

    type HostDetailsPageProps = {
        data: {
            host: Host & {
                systemInfo: SystemInfo[];
                memoryInfo: MemoryInfo[];
                diskInfo: DiskInfo[];
                interfaceInfo: InterfaceInfo[];
            },
            memoryData: {
                totalMemory: number,
                availableMemory: number,
                usedMemory: number,
                timestamp: Date,
            }
        }
    }

    let { data }: HostDetailsPageProps = $props();
    const { host, memoryData } = data;
</script>

<h1 class="text-2xl font-bold">{host.name}</h1>

<MemoryChart data={memoryData} />