import { ListFilter } from "lucide-react";
import styles from "./UserTable.module.scss";

function TableHeaderWithFilter(props: {
  label: string;
  onFilterClick: (anchorRect: DOMRect) => void;
}) {
  const { label, onFilterClick } = props;

  return (
    <div className={styles.headerWithFilter}>
      <span className={styles.headerLabel}>{label}</span>
      <button
        type="button"
        aria-label={`Filter ${label}`}
        className={styles.filterButton}
        onClick={(e) => {
          e.stopPropagation();
          const rect = (
            e.currentTarget as HTMLButtonElement
          ).getBoundingClientRect();
          onFilterClick(rect);
        }}
      >
        <ListFilter />
      </button>
    </div>
  );
}

export default TableHeaderWithFilter;
