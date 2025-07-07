import { Component, createMemo, For } from "solid-js"
import { DataTable, DataTableCell, DataTableHeader, DataTableRow } from "../dataTable"
import {z} from 'zod'

const StatusSchema = z.enum(["full_day", "conge", "ferie", "half_day"]);

export const DailyRevenueTable: Component<{
    dailyRevenue: number,
    currency: string,
    taxes: {
        name: string,
        /** In percentage */
        amount: number
    }[]
    dataset: {
        status: z.infer<typeof StatusSchema>;
        date: Date
    }[]
}> = (props) => {
    const totalRatePercentage = props.taxes.reduce((acc, tax) => acc + tax.amount, 0);
    const totalRate = totalRatePercentage / 100;

    const rows = createMemo(() => {
        return props.dataset.map((row) => {
            const revenue = row.status === "full_day"
                ? props.dailyRevenue
                : row.status === "half_day"
                    ? props.dailyRevenue / 2
                    : 0;

            return { revenue, revenueAfterTaxes: revenue * (1 - totalRate), ...row };
        });
    })

    const totalRevenue = createMemo(() => rows().reduce((acc, { revenue }) => acc + revenue, 0));
    const totalRevenueAfterTaxes = createMemo(() => totalRevenue() * (1 - totalRate));

    function onStatusChange(status: string) {
        console.log(`Status changed to: ${status}`);
    }

    return (
        <DataTable
            head={[
              <DataTableRow>
                <For
                  each={[
                    `Date`,
                    `Daily Revenue (${props.currency})`,
                    `Revenue after taxes (${props.currency})`,
                    ...props.taxes.map(tax => `${tax.name} (${tax.amount}%)`),
                    `Status`,
                  ]}
                >
                  {(column) => <DataTableHeader>{column}</DataTableHeader>}
                </For>
              </DataTableRow>,
            ]}
            body={
                <For each={rows()}>
                    {
                        ({ date, revenueAfterTaxes, status, revenue }) => (
                            <DataTableRow>
                                <DataTableCell>{date.toISOString()}</DataTableCell>
                                <DataTableCell>{revenue}</DataTableCell>
                                <DataTableCell>{revenueAfterTaxes}</DataTableCell>

                                <For each={props.taxes}>
                                    {(tax) => (
                                        <DataTableCell>{(tax.amount / 100 * revenue).toFixed(2)}</DataTableCell>
                                    )}
                                </For>

                                <DataTableCell>
                                    <select class="select" onChange={e => onStatusChange(e.currentTarget.value)}>
                                        <For each={StatusSchema._def.values}>
                                            {(statusOption) => <option value={statusOption} selected={status === statusOption}>{statusOption}</option>}
                                        </For>
                                    </select>
                                </DataTableCell>
                            </DataTableRow>
                        )
                    }
                </For>
            }
            footer={
                <DataTableRow>
                    <DataTableCell>Total</DataTableCell>
                    <DataTableCell>{totalRevenue().toFixed(2)}</DataTableCell>
                    <DataTableCell>{totalRevenueAfterTaxes().toFixed(2)}</DataTableCell>

                    <For each={props.taxes}>
                        {(tax) => (
                            <DataTableCell>
                                {(tax.amount / 100 * totalRevenue()).toFixed(2)}
                            </DataTableCell>
                        )}
                    </For>

                    {/* <DataTableCell></DataTableCell> */}
                </DataTableRow>
            }
        ></DataTable>
    )
}
