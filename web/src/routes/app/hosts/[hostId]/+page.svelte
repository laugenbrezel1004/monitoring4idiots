<script lang="ts">
    import ProcessorChart from './(components)/processor-chart.svelte';
    import MemoryChart from './(components)/memory-chart.svelte';
    import DiskCharts from './(components)/disk-charts.svelte';
    import type {DiskInfo, Host, InterfaceInfo, MemoryInfo, SystemInfo} from "@prisma/client";
    import { Box, CirclePause, FileClock } from '@lucide/svelte';
    import {Button} from "$lib/components/ui/button";
    import {Badge} from "$lib/components/ui/badge";

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
            },
            processorData: {
                availableCpu: number;
                usedCpu: number;
                timestamp: Date,
            }
        }
    }

    let { data }: HostDetailsPageProps = $props();
    const { host, memoryData, processorData } = data;
</script>

<div class="flex flex-row justify-between items-center">
    <div class="flex flex-row gap-3 items-center w-full">
        <Box class="size-6 stroke-primary" />
        <div class="flex flex-col justify-center gap-1">
            <h1 class="text-2xl font-bold">{host.name}</h1>
            <Badge class="text-muted bg-green-500 h-4">
                Online
            </Badge>
        </div>
    </div>
    <div class="flex flex-row gap-2">
        <Button variant="outline">
            <FileClock />
            Logs
        </Button>
    </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <ProcessorChart data={processorData} />
    <MemoryChart data={memoryData} />
</div>

<div class="flex flex-col gap-2">
    <h3 class="w-full text-2xl font-medium">Disks</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DiskCharts diskInfo={host.diskInfo} />
    </div>
</div>