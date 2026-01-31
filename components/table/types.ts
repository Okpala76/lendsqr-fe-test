export type UserRow = {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
};

export type UserStatus = "Inactive" | "Pending" | "Blacklisted" | "Active";

export type FilterDraft = {
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  date: string;
  status: "" | UserStatus;
};

export const DEFAULT_FILTERS: FilterDraft = {
  organization: "",
  username: "",
  email: "",
  phoneNumber: "",
  date: "",
  status: "",
};

export const STATUSES: readonly UserStatus[] = [
  "Inactive",
  "Pending",
  "Blacklisted",
  "Active",
] as const;
