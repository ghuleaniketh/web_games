import styles from './simon.module.css';

export default function Simon(){
    let username = "aniketh";
    let highscore = 34
    
    return(
    <>
    <div className={styles.page}>
        <div className={styles.bar}>
            <div className={styles.mainNav}>
                <h1>Let'go {username}</h1>
                <h2 className={styles.highscore}>Highscore {highscore}</h2>
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