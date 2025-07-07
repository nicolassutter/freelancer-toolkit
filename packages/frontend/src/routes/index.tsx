import { createFileRoute } from "@tanstack/solid-router";
import { DailyRevenueTable } from "~/components/patterns/tables";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main class="p-4">
      <DailyRevenueTable
        dailyRevenue={415}
        currency="€"
        dataset={[
          { status: 'full_day', date: new Date() },
          { status: 'half_day', date: new Date() },
          { status: 'conge', date: new Date() },
          { status: 'ferie', date: new Date() },
        ]}
        taxes={[
          {
            name: 'Urssaf',
            amount: 24.6,
          },
          {
            name: 'Impots',
            amount: 2.2,
          },
          {
            name: 'Cotisations professionnelles',
            amount: 0.2,
          }
        ]}
      />
    </main>
  );
}
