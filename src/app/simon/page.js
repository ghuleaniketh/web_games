'use client'
import styles from './simon.module.css';
import { useEffect, useRef, useState } from 'react';
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
        const userPatternRef = useRef([]);
        let [gamePattern,setGamePattern] = useState([]);
        const gamePatternRef = useRef([]);
        let [game,setGameMode] = useState(false);
        let [heading,setHeading] = useState("Click me to  Start the Game");
        const setHeadingRef = useRef("Click me to  Start the Game");
        let [level , setGameLevel] = useState(0);
        const setGameLevelRef = useRef(0);
        let colors = ['red','green','blue','yellow'];

        let startGame = ()=>{
            if(game === false){
                setGameMode(true);
                console.log("game started......");
                setHeading("Game Started !!!!!!!!!!");
                setTimeout(inclevel,600);
            }
        }

        function inclevel(){
            userPatternRef.current = [];
            let Rcolor = getRandomColor();
            glow(Rcolor);
            gamePatternRef.current.push(Rcolor);  
            let newLevel = level + 1;
            setGameLevel(newLevel);

        }
        function userClick(event){
            if(game === true){
                let el = event.target;
                userPatternRef.current.push(el.id);     
                el.classList.add(styles["userglow"]);
                setTimeout(()=>{
                    el.classList.remove(styles["userglow"]);
                },200)
                let index = userPatternRef.current.length - 1;
                movecheck(index);
            }
        }

        function getRandomColor(){ 
            let random = Math.floor(Math.random() * 4);
            return(colors[random]);
        }
        

        let glow = (Rcolor)=>{
            let el = document.getElementById(Rcolor)
            if(el){
                console.log("all good")
                el.classList.add(styles["glow"]);
                setTimeout(()=>{
                    el.classList.remove(styles["glow"]);
                },1000)
                
            }else{
                console.log("gadbad hai bhai")
            }
        }
        function movecheck(index){
            console.log(index);
            console.log(userPatternRef.current);
            console.log(gamePatternRef.current);
            if(userPatternRef.current[index] === gamePatternRef.current[index]){
                if(userPatternRef.current.length === gamePatternRef.current.length){
                    setTimeout(()=>{
                        inclevel();
                    },800)
                }
            }else{
                    gameOver();
                }
        }
        
        const handleSubmit = async () => {
            try {
                const res = await fetch('/api/updateData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        newScore: level - 1, // send the correct score
                    }),
                });

                if (res.ok) {
                    const result = await res.json();
                    console.log("Score updated:", result);
                } else {
                    console.error("Failed to update score");
                }
            } catch (error) {
                console.error("Error updating score:", error);
            }
        };

        function gameOver(){
            console.log("game over");
            setGameMode(false);
            setHeading("Game Over!!!!!!");
            console.log("high score is" + data.simonScore);
            console.log("your score is " +  (level - 1));
            if(data.simonScore < level - 1){
                handleSubmit();
            }else{
                console.log("good try buddy ");
            }
        }
        
        function gameReset(event) {
            console.log("game restarted")
            setGameLevel(0);
            setHeading("Click me to Start the Game");
            setGameMode(false);

            userPatternRef.current = [];
            setUserPattern([]);         // <--- for UI sync
            gamePatternRef.current = [];
            setGamePattern([]);         // <--- for UI sync
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
        <div className={styles.gamepage} >
            <div className={styles.status}>
                <div onClick={gameReset} className={styles.icon}>
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
                    <div onClick={userClick} id='green' className={styles.green}></div>
                </div>
                <div className={styles.down}>
                    <div onClick={userClick} id='blue' className={styles.blue}></div>
                    <div onClick={userClick} id='yellow' className={styles.yellow}></div>
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