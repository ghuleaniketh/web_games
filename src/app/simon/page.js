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

        //game ka Logic 
        let [userPattern,setUserPattern] = useState([]);
        let [gamePattern,setGamePattern] = useState([]);
        let [game,setGameMode] = useState(false);
        let [heading,setHeading] = useState("Click me to  Start the Game");
        let [level , setGameLevel] = useState(0);
        let colors = ['red','green','blue','yellow'];

        let startGame = ()=>{
            if(game === false){
                setGameMode(true);
                console.log("game started......");
                setHeading("Game Started !!!!!!!!!!");
                setTimeout(inclevel,750);
            }
        }

        function inclevel(){
            let Rcolor = getRandomColor();
            console.log("random color  " +  Rcolor);
            glow(green);
            setGamePattern([...gamePattern,Rcolor]);
            let newLevel = level + 1;
            setGameLevel(newLevel);

        }
        function userClick(event){
            let el = event.target.id;
            console.log(el);
            setUserPattern([...userPattern,el]);
        }

        function getRandomColor(){ 
            let random = Math.floor(Math.random() * 4);
            return(colors[random]);
        }
        
        function glow(color){
            console.log("i am getting " + color)
                let el = document.getElementById(color);
                console.log(el);
                        }
        
        useEffect(()=>{
                console.log("user array " + userPattern);
                console.log("game array " + gamePattern);
            },[userPattern,gamePattern]);


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
        <div className={styles.gamepage} >
            <div className={styles.status}>
                <div className={styles.icon}>
                    <FontAwesomeIcon icon={faRotateRight} />
                </div>  
                <div >
                    <p onClick={startGame} className={styles.heading}>{heading}</p>
                </div>
                <div className={styles.currentscore}>
                    <p>Level {level}</p>
                </div>
            </div>
            <div className={styles.gamecont} >
                <div className={styles.up}>
                    <div onClick={userClick} id='red' className={styles.red } ></div>
                    <div id='green' className={styles.green}></div>
                </div>
                <div className={styles.down}>
                    <div id='blue' className={styles.blue}></div>
                    <div id='yellow' className={styles.yellow}></div>
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