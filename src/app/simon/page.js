'use client'
import styles from './simon.module.css';
import { useEffect, useState } from 'react';

export default function Simon(){
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
    
    return(
    <>
    <div className={styles.page}>
        <div className={styles.bar}>
            <div className={styles.mainNav}>
                <h1>Let'go {data? data.username : 'loading.........'}</h1>
                <h2 className={styles.highscore}>Highscore {data? data.simonScore:" "}</h2>
            </div>
        </div>
        <div className={styles.gamepage}>
            <div className={styles.status}>
                <div className={styles.icon}>

                </div>
                <div className={styles.current}>

                </div>
            </div>
            <div className={styles.gamecont}>
                <div className={styles.up}>
                    <div className={styles.red}></div>
                    <div className={styles.green}></div>
                </div>
                <div className={styles.down}>
                    <div className={styles.blue}></div>
                    <div className={styles.yellow}></div>
                </div>
                
            </div>
        </div>
    </div>
        </>
    )
}