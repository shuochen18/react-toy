import React from 'react'
import { Button } from './Button'
import './HeroSection.css';
import '../App.css';

function HeroSection() {
    console.log("herosection")
    return (
        <div className='hero-container'>
            <video src="/videos/video-2.mp4" autoPlay loop muted />
            <h1>ADVENTURE AWAITS</h1>
            <p>What are you waiting for?</p>
            <div className="hero-btns">
                <Button className='btns' buttonSize='btn--outline' buttonSize='btn-large'>GET STARTED</Button>
                <Button className='btns' buttonSize='btn--primary' buttonSize='btn-large'>
                    WATCH TRAILER
                    <i className="far-fa-play-circle"></i>
                </Button>
            </div>
        </div>
    )
}

export default HeroSection
