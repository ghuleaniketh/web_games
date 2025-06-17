import styles from './home.module.css'

export default function Home(){
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
            <div className={styles.gamecont}>
                <img src='./img/simon.png'/>
            </div>
        </div>
        </>
        
    )
}