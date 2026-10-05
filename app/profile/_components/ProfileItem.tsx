import styles from "@/app/_components/interfaces.module.css";

type Props = {
  title: string;
  value: string;
};

const ProfileItem = ({ title, value }: Props) => {
  return (
    <div className={styles.profileItem}>
      <span>
        {title}
      </span>
      <span>
        {value}
      </span>
    </div>
  );
};

export default ProfileItem;
