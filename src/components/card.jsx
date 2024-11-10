import styles from '../styles/styles.module.css'
import img from '../images/icons8-landlord-32.png'

// This is used in  the register page. The card is used as a prop to display two different options
function Card(card){
    return(
    <div className={styles.card} onClick={card.click}>
        <img width="30" height="30" src={img} alt="landlord"/>
        <h1 className="card-title">{card.title}</h1>
        <p className="card-desc">{card.desc}</p>
        </div>
    )
}

export default Card;