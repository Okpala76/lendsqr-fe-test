"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import styles from "./page.module.scss";

export default function LoginPage() {
  return (
    <section className={styles.card}>
      <div className={styles.formWrapper}>
        <h1 className={styles.welcome}>Welcome!</h1>
        <p className={styles.subtitle}>Enter details to login.</p>
        <LoginForm />
      </div>
    </section>
  );
}
