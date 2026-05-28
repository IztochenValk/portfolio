import StaticRowTitle from "./StaticRowTitle";
import EditableRowTitle from "./EditableRowTitle";

export type RowTitleCellProps = {
  title: string;
  editable?: boolean;
  onRename?: (next: string) => Promise<void> | void;
  rightSlot?: React.ReactNode;
  className?: string;
};

export default function RowTitleCell({
  title,
  editable = false,
  onRename,
  rightSlot,
  className,
}: RowTitleCellProps) {
  if (editable && onRename) {
    return (
      <EditableRowTitle
        className={className}
        value={title}
        onSave={onRename}
        validate={(v) => (v.length === 0 ? "Le titre ne peut pas être vide" : null)}
      />
    );
  }
  return (
    <StaticRowTitle
      className={className}
      title={title}
      rightSlot={rightSlot}
    />
  );
}
