'use client'
import { login, LoginRequest } from '@/lib/api/clientApi';
import styles from './SignInPage.module.css'
import { ApiError } from '@/app/api/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';


export default function SignIn() {

const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser)


  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as LoginRequest;
      const res = await login(formValues);
      if (res) {
        setUser(res)
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      )
    }
  };

    return (
        <main className={styles.mainContent}>
            <form action={handleSubmit} className={styles.form}>
    <h1 className={styles.formTitle}>Sign in</h1>

    <div className={styles.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={styles.input} required />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={styles.input} required />
    </div>

    <div className={styles.actions}>
      <button type="submit" className={styles.submitButton}>
        Log in
      </button>
    </div>

    {error && <p className={styles.error}>{error}</p>}
  </form>
</main>

    )
}