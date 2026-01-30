import Image from "next/image";
import styles from "./BrandIcon.module.scss";

interface BrandIconProps {
  className?: string;
}

export const BrandIcon = ({ className }: BrandIconProps) => {
  return (
    <div className={className || ""} aria-label="Lendsqr">
      <Image
        src="/union.svg"
        alt="Lendsqr logo"
        width={24.75}
        height={25.003942489624023}
        className={styles.logo}
        priority
      />

      <Image
        src="/lendsqr.svg"
        alt="Lendsqr"
        width={138.43972778320312}
        height={36}
        className={styles.wordmark}
        priority
      />
    </div>
  );
};
