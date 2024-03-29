import React from 'react'
import './Header.css'
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link, useHistory} from 'react-router-dom';

function Header({backButton}) {
    const history = useHistory();
    return (
        // BEM <<<<<
        <div className="header">
            {backButton ? (
                <IconButton onClick={()=>history.replace(backButton)}>
                <ArrowBackIosIcon className="header__icon" fontSize="large"/>
                </IconButton>
            ):(
                <IconButton>
                <PersonIcon className="header__icon" fontSize="large"/>
                </IconButton>
            )
            }
            <Link to="/">
                <img 
                    className="header__logo"
                    src="https://logos-world.net/wp-content/uploads/2020/09/Tinder-Emblem.png" 
                    alt="tinder logo"/>
            </Link>
            <Link to="chat">
                <IconButton>
                    <ForumIcon className="head__icon" fontSize="large"/>
                </IconButton>
            </Link>

        </div>
    )
}

export default Header
