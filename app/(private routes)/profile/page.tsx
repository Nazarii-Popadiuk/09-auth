import Link from 'next/link'
import styles from './ProfilePage.module.css'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getServerMe } from '@/lib/serverApi'


export const metadata: Metadata = {
    title: "My App",
    description: "My app account and settings",
    openGraph: {
        title: "My App",
        description: "My app account and settings",
        url: 'https://notehub.com/profile',
        images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: "Image of my app",
        },
      ],
    }
}

export default async function Profile() {

  const user = await getServerMe();

    return (
        <main className={styles.mainContent}>
  <div className={styles.profileCard}>
      <div className={styles.header}>
	     <h1 className={styles.formTitle}>Profile Page</h1>
	     <Link href="/profile/edit" className={styles.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     <div className={styles.avatarWrapper}>
      <Image
        src={user?.avatar || "/default-avatar.png"}
        alt="User Avatar"
        width={120}
        height={120}
        className={styles.avatar}
      />
    </div>
    <div className={styles.profileInfo}>
      <p>
        Username: {user?.username}
      </p>
      <p>
        Email: {user?.email}
      </p>
    </div>
  </div>
</main>

    )
}