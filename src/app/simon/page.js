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
import { doc } from 'firebase/firestore';


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

        // game logic
        let game_pattern = [];
        let user_pattern = [];
        let colors = ["green", "blue", "red", "yellow"];
        const [level,newLevel] = useState(0)
        const [heading, changeHeading] = useState( "click to start the game");
        const [game_start, setGameStarted] = useState(false);

            let game = ()=>{
                if(game_start === false){
                    console.log("game start ho gaya");
                    setGameStarted(true);
                    console.log(game_start)
                    game_pattern = [];
                    user_pattern = [];
                    level_up()
                }
            };
            function level_up(){
                let gameLevel = level+1;
                newLevel(gameLevel);
                let Rcolor = random_color();
                game_pattern.push(Rcolor);
                console.log(game_pattern)
                changeHeading("game started !!!!!!!");
                glow(Rcolor)
            }
            function random_color (){
                let random = Math.floor(Math.random() * 3);
                return(colors[random]);
            }
            function glow(color){
                let el = document.getElementById(color);
                if(el){
                    setTimeout(()=>{
                        el.classList.add(styles.glow);
                    },500);
                    
                    setTimeout(()=>{
                        el.classList.remove(styles.glow);
                    },1000);
                }
            }
            function user_click(event){
                if(game_start === true){
                let el = event.target.id;
                console.log(el);
                level_up();

                }
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
                    <p className={styles.heading}>{heading}</p>

                </div>
                <div className={styles.currentscore}>
                    <p>Level {level}</p>
                </div>
            </div>
            <div className={styles.gamecont} onClick={game}>
                <div className={styles.up}>
                    <div onClick={user_click} id='red' className={styles.red } ></div>
                    <div onClick={user_click} id='green' className={styles.green}></div>
                </div>
                <div className={styles.down}>
                    <div onClick={user_click} id='blue' className={styles.blue}></div>
                    <div onClick={user_click} id='yellow' className={styles.yellow}></div>
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