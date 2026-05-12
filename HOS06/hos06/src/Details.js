import React from 'react';
import { useNavigate } from 'react-router-dom';

function Details() {

    let navigate = useNavigate();
    function goForward() {
        navigate(1)
    }

    return <div>
        <h2>Understanding browser router</h2>

        In this HOS we are implementing routing using BrowserRouter. You can learn more <a href="https://reactrouter.com/api/declarative-routers/BrowserRouter" target="_blank" rel="noopener noreferrer">here
        </a>
        <br />
        <br />
        <button onClick={goForward}>Go Forward</button>
    </div>
}

export default Details;