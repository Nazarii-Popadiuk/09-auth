'use client'

import styles from './EditProfilePage.module.css'
import Image from 'next/image'
import { getMe, updateMe } from '@/lib/clientApi';
import { useEffect, useState } from 'react';
import router from 'next/router';


export default function Edit() {

  const [userName, setUserName] = useState('')

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.username ?? '');
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateMe({ userName });
      router.push('/profile')
    } catch {
alert('Impossible to save')
    }
  };

  const handleCancel = () => {
    router.push('/profile')
  }
    return (
        <main className={styles.mainContent}>
  <div className={styles.profileCard}>
    <h1 className={styles.formTitle}>Edit Profile</h1>

    <Image src=''
      alt="User Avatar"
      width={120}
      height={120}
      className={styles.avatar}
    />

          <form onSubmit={ handleSaveUser} className={styles.profileInfo}>
      <div className={styles.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
        <input id="username"
          type="text"
                className={styles.input}
                onChange={handleChange}
        />
      </div>

            <p>Email:</p>

      <div className={styles.actions}>
        <button type="submit" className={styles.saveButton}>
          Save
        </button>
        <button type="button" className={styles.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>

    )
}