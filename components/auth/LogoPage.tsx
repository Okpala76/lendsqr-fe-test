import Image from "next/image";
import { BrandIcon } from "../ui/BrandIcon";
import styles from "./LogoPage.module.scss";

export const LogoPage = () => {
  return (
    <section className={styles.container}>
      <BrandIcon className={styles.brandGroup} />

      <div className={styles.illustrationWrap}>
        <Image
          src="/pablo-sign-in 1.svg"
          alt="Lendsqr Signin Logo"
          width={600}
          height={338}
          className={styles.illustration}
          priority
          aria-hidden="true"
        />
      </div>
    </section>
  );
};
