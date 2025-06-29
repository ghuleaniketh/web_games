'use client'
import styles from './simonleaderboard.module.css';
import '@/app/lib/fontawesome'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';

import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function LeaderBoard({ onClose }) {
    const [fulldata, setfulldata] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/leaderB', { method: 'GET' });
                const data = await res.json();
                setfulldata(data);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className={styles.leaderboard}>
            <div className={styles.cross}>
                <div className={styles.closeButton} onClick={onClose}>
                <FontAwesomeIcon icon={faXmark} />
            </div>  
            </div>
            <h2>Leaderboard</h2>
            {fulldata ? (
                <ul className={styles.list}>
                    {fulldata.map((user, index) => (
                        <li key={index} className={styles.item}>
                            <span>{user.username}</span> <span>Score: {user.simonScore}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
