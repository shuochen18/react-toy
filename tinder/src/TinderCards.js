import React,{useState, useEffect} from 'react';
import TinderCard from "react-tinder-card";
import './TinderCards.css';
import database from './Firebase';
function TinderCards() {
    const [people, setPeople] = useState([]);
    // useEffect: Piece of code which runs based on a condition.
    useEffect(() => {
        // this will run ONCE when component loads, and never again ([])
        // a listener: when the db changes, take a picture of database
        const unsubscribe = database.collection('people').onSnapshot(snapshot=>(
            setPeople(snapshot.docs.map(doc=>doc.data()))
        ))
        return ()=>{
            // this is the clean up...
            unsubscribe()
        }
    }, [])
    return (
        <div>
            <h1>Tidner cards</h1>
            <div className="tinderCards__cardContainer">
                {people.map(person => (
                    <TinderCard
                    className="swipe"
                    key={person.name}
                    preventSwipe={['up','down']}
                    >
                        <div 
                        className="card"
                        style={{backgroundImage:`url(${person.url})`}}
                        >
                        <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    )
}

export default TinderCards
