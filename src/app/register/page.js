'use client';
import styles from './register.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.username,
                password: formData.password,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            router.push('/login');
        } else {
            setError(data.error || 'Registration failed');
        }
    } catch (err) {
        console.error('Registration error:', err);
        setError('Registration failed. Please try again.');
    }
};

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.cont}>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.formcont}>
                <p>Wel-Come to Games Snap</p>
                <p>Create an account</p>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputcont}>
                        <input
                            placeholder='Enter Username'
                            className={styles.username}
                            type='text'
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                        <input
                            placeholder='Enter Password'
                            className={styles.password}
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <div className={styles.showpasscont}>
                        <input
                            type='checkbox'
                            className={styles.showpass}
                            onChange={togglePasswordVisibility}
                            checked={showPassword}
                        />
                        <label className={styles.showpasslabel}>Show Password</label>
                    </div>
                    <button type="submit" className={styles.btn}>Submit</button>
                </form>
                <Link className={styles.login} href="/login">Already registered? Login now</Link>
            </div>
        </div>
    );
}
