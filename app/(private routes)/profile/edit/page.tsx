'use client'

import styles from './EditProfilePage.module.css'
import Image from 'next/image'
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { User } from '@/types/user';


export default function Edit() {


  const router = useRouter();
  const { setUser } = useAuthStore();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const userData: User = await getMe();
      setUserName(userData.username ?? '');
      setEmail(userData.email ?? '');
      setAvatar(userData.avatar ?? '');
    }; fetchUser()
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const updatedUser = await updateMe({ username:userName });
      setUser(updatedUser);
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

    <Image src={avatar || 'default-avatar.png'}
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
                value={userName}
        />
      </div>

            <p>Email:{email || ''}</p>

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