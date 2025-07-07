import { type Component, type JSX, type ParentComponent } from "solid-js";

export const DataTableRow: ParentComponent = (props) => {
  return <tr>{props.children}</tr>;
};

export const DataTableHeader: ParentComponent = (props) => {
  return <th>{props.children}</th>;
};

export const DataTableCell: ParentComponent<{
  colSpan?: number;
}> = (props) => {
  return <td colSpan={props.colSpan}>{props.children}</td>;
};

export const DataTable: Component<{
  head: JSX.Element;
  body: JSX.Element;
  footer?: JSX.Element;
}> = (props) => {
  return (
    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table class="table">
        <thead>{props.head}</thead>
        <tbody>{props.body}</tbody>
        {props.footer && <tfoot>{props.footer}</tfoot>}
      </table>
    </div>
  );
};
