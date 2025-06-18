'use client'
import styles from './simon.module.css';
import { useEffect, useReducer, useState } from 'react';
import '@/app/lib/fontawesome'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Router, { useRouter } from 'next/navigation';
import Help from '@/componets/howtoplaysimon';

export default function Simon(){
        const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
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

        let game_pattern = [];
        let user_pattern = [];
        let colors = ["green","blue","red","yellow"];
        let game_start = false;
        let level = 0;
        let heading  = document.querySelector(".heading");
        refershicon = document.querySelector(".icon");

        document.addEventListener("click",function(){
            if(!game_start){
                console.log("game chalu kar diya");
                game_start = true;
                level = 0;
                game_pattern = [];
                user_pattern = [];
                level_up();
            }
        },{once:true});

        function flash(cont) {
    cont.classList.add("white");
    
    setTimeout(function () {
        cont.classList.remove("white");
    }, 250);
}


        
    return(
    <>
    <div className={styles.page}>
        <div className={styles.bar}>
            <div className={styles.mainNav}>
                <p>Let'go {data ? data.username : '  '}</p>
                <p className={styles.highscore}>Highscore {data ? data.simonScore : " "}</p>
                <p className={styles.leaderboard}>Leaderboard</p>
            </div>
        </div>
        <div className={styles.gamepage}>
            <div className={styles.status}>
                <div className={styles.icon}>
                    <FontAwesomeIcon icon={faRotateRight} />
                </div>  
                <div >
                    <p className={styles.heading}></p>

                </div>
                <div className={styles.currentscore}>
                    <p>Level {level}</p>
                </div>
            </div>
            <div className={styles.gamecont}>
                <div className={styles.up}>
                    <div  className={styles.red }></div>
                    <div className={styles.green}></div>
                </div>
                <div className={styles.down}>
                    <div className={styles.blue}></div>
                    <div className={styles.yellow}></div>
                </div>
            </div>
            <div className={styles.helpandexit}>
                <div className={styles.help} onClick={() => setShowPopup(true)}>
                    <FontAwesomeIcon icon={faQuestion} />
                </div>      
                <div className={styles.exit} onClick={() => router.push('./home')}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </div>
            </div>
            {showPopup && <Help onClose={() => setShowPopup(false)} />}
        </div>
    </div>
    </>
    )
}