'use client'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { useState } from 'react';

export default function Login(){
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loader state
    const [formData,setFormData] = useState({
        username:'',
        password:''
    });

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true); // Start loader
        setError('');
        try {
            const res = await fetch('/api/login',{
                method:'POST',
                headers:{
                    'content-Type' :'application/json', // fixed typo
                },
                body:JSON.stringify({
                    username:formData.username,
                    password:formData.password,
                }),
            });

            const data = await res.json();
            if (res.ok){
                if(data[0].password === formData.password){
                    Cookies.set('token', data[0].id, { expires: 7 });
                    router.push('/home');
                }else{
                    setError('Give correct Password buddy!!!!!!!!!');
                }
            }else{
                setError(data.error);
            }
        }catch{
            setError('user not found buddy!!!!!')
        }
        setLoading(false); // Stop loader
    }

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return(
        <>
        <div className={styles.cont}>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.formcont}>
            <p>Hello buddy</p>
            <h3>Let's Login</h3>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputcont}>
                    <input
                    type='text'
                    placeholder='Username'
                    onChange={(e) => setFormData({...formData,username: e.target.value})}
                    />
                    <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    onChange={(e) => setFormData({...formData,password: e.target.value})}
                    />
                </div>
                <div className={styles.checkinput}>
                    <input
                    type='checkbox'
                    onChange={togglePasswordVisibility}
                    checked={showPassword}
                    />
                <label>Show Password</label>
                </div>
                <button className={styles.btn} disabled={loading}>
                    {loading ? 'Logging in...' : 'Submit'}
                </button>
                {loading && <div className={styles.loader}></div>}
            </form>
            <a className={styles.newuser} href='./register'>new user ? come register now</a>
            </div>
        </div>
        </>
    )
}