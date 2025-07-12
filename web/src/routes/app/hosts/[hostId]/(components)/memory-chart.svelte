<script lang="ts">
    import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
    import * as Chart from "$lib/components/ui/chart/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import {scaleUtc} from "d3-scale";
    import {Area, AreaChart, ChartClipPath} from "layerchart";
    import {curveNatural} from "d3-shape";
    import {cubicInOut} from "svelte/easing";

    let {data} = $props();

    let timeRange = $state("90d");

    const selectedLabel = $derived.by(() => {
        switch (timeRange) {
            case "90d":
                return "Last 3 months";
            case "30d":
                return "Last 30 days";
            case "7d":
                return "Last 7 days";
            default:
                return "Last 3 months";
        }
    });

    const filteredData = $derived(
        data.filter((item) => {
            const referenceDate = new Date();
            let daysToSubtract = 90;
            if (timeRange === "30d") {
                daysToSubtract = 30;
            } else if (timeRange === "7d") {
                daysToSubtract = 7;
            }

            referenceDate.setDate(referenceDate.getDate() - daysToSubtract);
            return item.date >= referenceDate;
        })
    );

    console.log(data);

    const chartConfig = {
        totalMemory: {label: "Total Memory", color: "var(--chart-1)"},
        availableMemory: {label: "Available Memory", color: "var(--chart-2)"},
        usedMemory: {label: "Used Memory", color: "var(--chart-3)"},
    } satisfies Chart.ChartConfig;
</script>

<Card.Root>
    <Card.Header class="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div class="grid flex-1 gap-1 text-center sm:text-left">
            <Card.Title>Memory</Card.Title>
            <Card.Description>Showing memory usage</Card.Description>
        </div>
    </Card.Header>
    <Card.Content>
        <Chart.Container config={chartConfig} class="aspect-auto h-[250px] w-full">
            <AreaChart
                    legend
                    data={filteredData}
                    x="date"
                    xScale={scaleUtc()}
                    series={[
                          {
                            key: "totalMemory",
                            label: "Total Memory",
                            color: chartConfig.totalMemory.color,
                          },
                          {
                            key: "availableMemory",
                            label: "Available Memory",
                            color: chartConfig.availableMemory.color,
                          },
                          {
                            key: "usedMemory",
                            label: "Used Memory",
                            color: chartConfig.usedMemory.color,
                          },
                        ]}
                    seriesLayout="stack"
                    props={{
          area: {
            curve: curveNatural,
            "fill-opacity": 0.4,
            line: { class: "stroke-1" },
            motion: "tween",
          },
          xAxis: {
            ticks: timeRange === "7d" ? 7 : undefined,
            format: (v) => {
              return v.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            },
          },

          yAxis: { format: () => "" },
        }}
            >
                {#snippet marks({ series, getAreaProps })}
                    <defs>
                        <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                    offset="5%"
                                    stop-color="var(--color-desktop)"
                                    stop-opacity={1.0}
                            />
                            <stop
                                    offset="95%"
                                    stop-color="var(--color-desktop)"
                                    stop-opacity={0.1}
                            />
                        </linearGradient>
                        <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stop-color="var(--color-mobile)" stop-opacity={0.8}/>
                            <stop
                                    offset="95%"
                                    stop-color="var(--color-mobile)"
                                    stop-opacity={0.1}
                            />
                        </linearGradient>
                    </defs>
                    <ChartClipPath
                            initialWidth={0}
                            motion={{
              width: { type: "tween", duration: 1000, easing: cubicInOut },
            }}
                    >
                        {#each series as s, i (s.key)}
                            <Area
                                    {...getAreaProps(s, i)}
                                    fill={s.key === "totalMemory"
                  ? "url(#fillTotalMemory)"
                  : "url(#fillMobile)"}
                            />
                        {/each}
                    </ChartClipPath>
                {/snippet}
                {#snippet tooltip()}
                    <Chart.Tooltip hideLabel class="w-full">
                        {#snippet formatter({ name, index, value, item })}
                            {@const data = `${value}`}
                            <div style="--color-bg: var(--color-{name.toLowerCase()})" class="bg-(--color-bg) size-2.5 shrink-0 rounded-[2px]"></div>
                            {chartConfig[name as keyof typeof chartConfig]?.label || name}
                            <div class="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                                {(parseInt(data) / 1073741824).toFixed(2)}
                                <span class="text-muted-foreground font-normal ml-1">GiB</span>
                            </div>
                        {/snippet}
                    </Chart.Tooltip>
                {/snippet}
            </AreaChart>
        </Chart.Container>
    </Card.Content>
</Card.Root>
