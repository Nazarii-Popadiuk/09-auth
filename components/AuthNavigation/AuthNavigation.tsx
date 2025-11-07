import Link from 'next/link'
import styles from './AuthNavigation.module.css'
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/clientApi';


export default function AuthNavigation() {
    const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push('/sign-in');
  };
    return isAuthenticated ? (
         <><li className={styles.navigationItem}>
            <Link href="/profile" prefetch={false} className={styles.navigationLink}>
                Profile
            </Link>
        </li>
            <li className={styles.navigationItem}>
                <p className={styles.userEmail}>{user?.email}</p>
                <button onClick={handleLogout } className={styles.logoutButton}>
                    Logout
                </button>
            </li>
        </>) : (
            <>
            <li className={styles.navigationItem}>
                <Link href="/sign-in" prefetch={false} className={styles.navigationLink}>
                    Login
                </Link>
            </li>
            <li className={styles.navigationItem}>
                <Link href="/sign-up" prefetch={false} className={styles.navigationLink}>
                    Sign up
                </Link>
            </li>
        </>

    )
}