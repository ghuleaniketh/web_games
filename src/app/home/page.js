'use client'
import styles from './home.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function Home(){
    
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/data', {
                method: 'GET',
            });
            const result = await res.json();
            setData(result[0]);
        }
        fetchData();
    }, []);
    let router = useRouter();
    return(
        <>
        <div className={styles.topnav}>
            <div className={styles.username}>
                <p>Hello {data ? data.username : 'Loading...'} Buddy 😁</p>
            </div>
        </div>
        <div className={styles.nav}>
            <div className={styles.branding}>
                <h1>Wel-Come to Games Snap</h1>
            </div>
        </div>
        <div className={styles.heading1}>
            <p>Available Games</p>
        </div >
        <div className={styles.gamecont}>
            <div className={styles.g1} onClick={()=>router.push('./simon')}>
                <img src='/simon.png'/>
                <div className={styles.gamename}>
                    <p>Simon</p>
                </div>
            </div>
            <div className={styles.g1} onClick={()=>router.push('./coming')}>
                <img src='/comingsoon.png'/>
                <div className={styles.gamename}>
                    <p>Coming Soon</p>
                </div>

            </div>
            <div className={styles.g1}  onClick={()=>router.push('./coming')}>
                 <img src='/comingsoon.png'/>
                <div className={styles.gamename}>
                    <p>Coming Soon</p>
                </div>
            </div>
        </div>
        
        </>
        
    )
}