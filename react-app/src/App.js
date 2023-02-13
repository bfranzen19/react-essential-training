import React from "react";
import "./App.css";
import {Link} from "react-router-dom";

function Home() {
    return (
        <div>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/contact'>Contact</Link>
            </nav>
            <h1>my website</h1>
        </div>
    );
}

export function About() {
    return (
        <div>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/contact'>Contact</Link>
            </nav>
            <h1>about</h1>
        </div>
    );
}

export function Contact() {
    return (
        <div>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/contact'>Contact</Link>
            </nav>
            <h1>contact</h1>
        </div>
    );
}

export function App() {
    return <Home />;
}