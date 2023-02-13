import React from "react";
import "./App.css";

function Home() {
    return (
        <div>
            <h1>my website</h1>
        </div>
    );
}

export function About() {
    return (
        <div>
            <h1>about</h1>
        </div>
    );
}

export function Contact() {
    return (
        <div>
            <h1>contact</h1>
        </div>
    );
}

export function App() {
    return <Home />;
}