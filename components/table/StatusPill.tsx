import styles from "./UserTable.module.scss";
import { UserStatus } from "./types";

function StatusPill({ status }: { status: UserStatus }) {
  const statusClassMap: Record<UserStatus, string> = {
    Inactive: styles.statusInactive,
    Pending: styles.statusPending,
    Blacklisted: styles.statusBlacklisted,
    Active: styles.statusActive,
  };

  return (
    <span className={`${styles.statusPill} ${statusClassMap[status]}`}>
      {status}
    </span>
  );
}

export default StatusPill;
