'use client'
import styles from './home.module.css';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


export default function Home(){
    let router = useRouter();
    let username = "Aniketh"
    return(
        <>
        <div className={styles.topnav}>
            <div className={styles.username}>
                <p>Hello {username}</p>
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