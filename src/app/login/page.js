'use client'
import styles from './login.module.css';
import { useState } from 'react';

export default function Login(){
    const [formData,setFormData] = useState({
        username:'',
        password:''
    });

    const handleSubmit = async(e)=>{

        const res = await fetch('/api/login',{
            method:'POST',
            headers:{
                'constent-Type' :'application/json',
            },
            body:JSON.stringify({
                username:formData.username,
                password:formData,
            }),
        });

        const data = await res.json();
        
    }
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return(
        
        <>
        <div className={styles.cont}>
            <div className={styles.formcont}>
            <p>Hello buddy</p>
            <h3>Let's Login</h3>
            <form>
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
                <button className={styles.btn}>Submit</button>
            </form>

            <a className={styles.newuser} href='./register'>new user ? come register now</a>
            </div>
        </div>
        </>
    )
}