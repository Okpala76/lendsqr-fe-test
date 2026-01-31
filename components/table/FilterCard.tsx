import styles from "./UserTable.module.scss";
import { FilterDraft, STATUSES } from "./types";

// FilterInput Component
function FilterInput({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.filterGroup}>
      <label className={styles.filterLabel}>{label}</label>
      <input
        className={styles.filterInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

// FilterSelect Component
function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.filterGroup}>
      <label className={styles.filterLabel}>{label}</label>
      <select
        className={styles.filterSelect}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

// UsersFilterCard Component
function UsersFilterCard(props: {
  organizations: string[];
  draft: FilterDraft;
  onChange: (next: FilterDraft) => void;
  onReset: () => void;
  onApply: () => void;
}) {
  const { organizations, draft, onChange, onReset, onApply } = props;

  return (
    <div data-filter-card="true" className={styles.filterCard}>
      <div className={styles.filterSpace}>
        <FilterSelect
          label="Organization"
          value={draft.organization}
          options={organizations}
          onChange={(value) => onChange({ ...draft, organization: value })}
        />

        <FilterInput
          label="Username"
          value={draft.username}
          placeholder="User"
          onChange={(value) => onChange({ ...draft, username: value })}
        />

        <FilterInput
          label="Email"
          value={draft.email}
          placeholder="Email"
          onChange={(value) => onChange({ ...draft, email: value })}
        />

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Date</label>
          <input
            type="date"
            className={styles.filterInput}
            value={draft.date}
            onChange={(e) => onChange({ ...draft, date: e.target.value })}
          />
        </div>

        <FilterInput
          label="Phone Number"
          value={draft.phoneNumber}
          placeholder="Phone Number"
          onChange={(value) => onChange({ ...draft, phoneNumber: value })}
        />

        <FilterSelect
          label="Status"
          value={draft.status}
          options={Array.from(STATUSES)}
          onChange={(value) =>
            onChange({ ...draft, status: value as FilterDraft["status"] })
          }
        />

        <div className={styles.filterButtons}>
          <button
            type="button"
            className={styles.filterButtonReset}
            onClick={onReset}
          >
            Reset
          </button>
          <button
            type="button"
            className={styles.filterButtonApply}
            onClick={onApply}
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}

export { FilterInput, FilterSelect, UsersFilterCard };
