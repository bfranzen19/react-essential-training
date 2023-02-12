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
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true); // sets the loading state from false to true

        fetch(`https://api.github.com/users/bfranzen19`)
            .then((response) => response.json())
            .then(setData)
            .then(() => setLoading(false)) // set loading back to false because we have the data
            .catch(setError); // error handling - if there's an error, set it
    }, []);

    if (loading) return <h1>loading...</h1>; // use loading state
    if (error) return <pre>{JSON.stringify(error)}</pre>; // use error state
    if (!data) return null;

    return (
        <GithubUser
            name={data.name}
            location={data.location}
            avatar={data.avatar_url}
        />
    );
};

export default App;
