import { createFileRoute } from "@tanstack/solid-router";
import { For } from "solid-js";
import {
  DataTable,
  DataTableCell,
  DataTableHeader,
  DataTableRow,
} from "~/components/dataTable";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <DataTable
        head={[
          <DataTableRow>
            <For
              each={[
                "TJM",
                `Cotisations Urssaf (${24.6}%)`,
                `Impots (${2.2} %)`,
                `Statut`, // 'travaille', 'conge', 'ferie'
              ]}
            >
              {(column) => <DataTableHeader>{column}</DataTableHeader>}
            </For>
          </DataTableRow>,
        ]}
        body={Array.from({ length: 10 }, (_, i) => (
          <DataTableRow>
            <DataTableCell>{`Row ${i + 1}`}</DataTableCell>
          </DataTableRow>
        ))}
      ></DataTable>
    </main>
  );
}
