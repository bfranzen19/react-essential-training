import "./App.css";
import {useState, useEffect} from "react";

function GithubUser({name, location, avatar}) {
    return (
        <div>
            <h1>{name}</h1>
            <p>{location}</p>
            <img src={avatar} height={150} alt={name} />
        </div>
    );
}

function App() {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(`https://api.github.com/users/bfranzen19`)
            .then((response) => response.json())
            .then(setData);
    }, []); // [] ensures this happens once when the app renders the 1st time

    if (data)
        return (
            <GithubUser
                name={data.name}
                location={data.location}
                avatar={data.avatar_url}
            />
        ); // <pre>{JSON.stringify(data, null, 2)}</pre>;

    return <h1>data</h1>;
};

export default App;
