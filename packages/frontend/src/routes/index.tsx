import { useQuery } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import { For } from "solid-js";
import { z } from "zod";
import { DailyRevenueTable, DailyRevenueTableSchema } from "~/components/patterns/tables";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const tablesQuery = useQuery(() => ({
    queryKey: ["tables"],
    queryFn: async (): Promise<z.infer<typeof DailyRevenueTableSchema>[]> => {
      // Simulate fetching data
      return [
        {
          dailyRevenue: 415,
          currency: "€",
          taxes: [
            { name: "Urssaf", amount: 24.6 },
            { name: "Impots", amount: 2.2 },
            { name: "Cotisations professionnelles", amount: 0.2 }
          ],
          dataset: [
            { status: "full_day", date: new Date() },
            { status: "half_day", date: new Date() },
            { status: "conge", date: new Date() },
            { status: "ferie", date: new Date() }
          ]
        }
      ]
    },
  }))

  return (
    <main class="p-4">
      {
        <For each={tablesQuery.data ?? []}>
          {(table) => (
            <DailyRevenueTable
              dailyRevenue={table.dailyRevenue}
              currency={table.currency}
              taxes={table.taxes}
              dataset={table.dataset}
            />
          )}
        </For>
      }
    </main>
  );
}
