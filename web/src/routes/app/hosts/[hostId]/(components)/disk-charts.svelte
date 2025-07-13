<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import {HardDrive, Folder} from '@lucide/svelte';
    import type {DiskInfo} from "@prisma/client";
    import * as Chart from "$lib/components/ui/chart";
    import {PieChart, Text} from 'layerchart';

    type DiskChartsProps = {
        diskInfo: DiskInfo[];
    }

    let {diskInfo}: DiskChartsProps = $props();

    const chartData = diskInfo.map((info: DiskInfo) => {
        return {
            availableSpace: info.availableSpace,
            totalSpace: info.totalSpace,
            usedSpace: info.totalSpace - info.availableSpace,
            timestamp: info.timestamp
        }
    });

    const chartConfig = {
        availableSpace: { label: "Available Space", color: "var(--chart-1)" },
        totalSpace: { label: "Total Space", color: "var(--chart-2)" },
        usedSpace: { label: "Used Space", color: "var(--chart-3)" },
    } satisfies Chart.ChartConfig;
</script>

{#each diskInfo as info}
    <Card.Root>
        <Card.Header class="flex items-center gap-2 space-y-0 sm:flex-row">
            <div class="grid flex-1 gap-1 text-center sm:text-left">
                <Card.Title class="flex flex-row gap-2 items-center">
                    <HardDrive class="size-5 stroke-muted-foreground" />
                    Disk
                </Card.Title>
                <Card.Description>{info.name}</Card.Description>
            </div>
            <span>{info.mountPoint}</span>
        </Card.Header>
        <Card.Content>
            <Chart.Container config={chartConfig} class="mx-auto aspect-square max-h-[250px]">
                <PieChart
                        data={chartData}
                        key="availableSpace"
                        value="availableSpace"
                        c="color"
                        innerRadius={60}
                        padding={28}
                        props={{ pie: { motion: "tween" } }}
                >
                    {#snippet aboveMarks()}
                        <Text
                                value={String(80)}
                                textAnchor="middle"
                                verticalAnchor="middle"
                                class="fill-foreground text-3xl! font-bold"
                                dy={3}
                        />
                        <Text
                                value="%"
                                textAnchor="middle"
                                verticalAnchor="middle"
                                class="fill-muted-foreground! text-muted-foreground"
                                dy={22}
                        />
                    {/snippet}
                    {#snippet tooltip()}
                        <Chart.Tooltip hideLabel />
                    {/snippet}
                </PieChart>
            </Chart.Container>
        </Card.Content>
    </Card.Root>
{/each}
