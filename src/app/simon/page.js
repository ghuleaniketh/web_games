'use client'
import styles from './simon.module.css';
import { useEffect, useState } from 'react';
import '@/app/lib/fontawesome'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config} from "@fortawesome/free-solid-svg-icons";

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
            let score = 2;
    return(
    <>
    <div className={styles.page}>
        <div className={styles.bar}>
            <div className={styles.mainNav}>
                <h1>Let'go {data? data.username : '  '}</h1>
                <h2 className={styles.highscore}>Highscore {data? data.simonScore:" "}</h2>
            </div>
        </div>
        <div className={styles.gamepage}>
            <div className={styles.status}>
                <div className={styles.icon}>
                    <FontAwesomeIcon icon={faRotateRight} />
                </div>  
                <div className={styles.currentscore}>
                    <p>score {score}</p>
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