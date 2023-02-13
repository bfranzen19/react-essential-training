# [`LinkedIn Learning - React.js Essential Training`](https://www.linkedin.com/learning/react-js-essential-training-14836121/building-modern-user-interfaces-with-react?autoplay=true&u=83102426)

## 2. INTRO TO REACT ELEMENTS
### ADDING REACT 
#### using CDN
* in `index.html`, in the `<head>` tag, add the `<script>` tags for the [cdn](https://reactjs.org/docs/cdn-links.html) to add the `react` and `react-dom` libraries.

```html
<body>
    <div id="root"></div>

    <script type="text/javascript">
        ReactDOM.render(
            React.createElement("h1", null, "getting started"), // what to create
            document.getElementById("root") // where to inject the new element
        );
    </script>
</body>
```

### CREATING REACT ELEMENTS
#### creating elements
* can also store in a variable and create it that way

```html
<body>
    <div id="root"></div>

    <script type="text/javascript">
        const heading = React.createElement("h1", null, "getting started"); 

        ReactDOM.render(
            heading
            document.getElementById("root") // where to inject the new element
        );
    </script>
</body>
```

### REFACTORING ELEMENTS USING `JSX`
#### nesting elements
* changing heading to `<ul>` and adding `<li>` with `React.createElement` as the final argument

```html
<body>
    <div id="root"></div>

    <script type="text/javascript">
        const ul = React.createElement(
            "ul", {style: { color: "blue" } }, 
            React.createElement("li", null, "first bullet"),  // nested element
            React.createElement("li", null, "second bullet"), // nested element
            React.createElement("li", null, "third bullet")   // nested element
        ); 

        ReactDOM.render(
            ul
            document.getElementById("root")
        );
    </script>
</body>
```

* this gets cumbersome >>>  _`jsx has entered the chat`_
* `jsx` stands for `javascript as xml` and is an `html`-like syntax

```html
<body>
    <div id="root"></div>

    <script type="text/javascript"> // this will throw an error 'unexpected token <'
        ReactDOM.render(
            <ul>    
                <li>first element</li>
                <li>second element</li>
                <li>third element</li>
            </ul>,
            document.getElementById("root")
        );
    </script>
</body>
```

### INCORPORATING `BABEL`
#### getting rid of the `unexpected token '<'` error with `jsx` using `babel`
* this error happens because tag-based syntax is not supported in the browser so we have to compile it
* `babel` takes code that isn't supported by the browser and compiles it into code that is supported by the browser to give us readability and shorter syntax.
* `babel` can also be imported via cdn and the script type needs to change from `text/javascript` to `text/babel`.

```html
<head>
    <script src="https://unpkg.com/babel-strandalone@6/babel.min.js"></script>
</head>
...
<script type="text/babel"> 
    ReactDOM.render(
            <ul>    
                <li>first element</li>
                <li>second element</li>
                <li>third element</li>
            </ul>,
            document.getElementById("root")
        );
</script>
```

### WORKING WITH `JSX` SYNTAX
#### power of `jsx`
* can use it to inject dynamic content into tags by referencing them by variable name

```html
<script type="text/babel"> 
    const robot = "🤖";
    const cowboy = "🤠";
    const moon = "🌝";
    const name = "riot bacon"

    ReactDOM.render(
            <ul>    
                <li>{ robot }</li>
                <li>{ cowboy }</li>
                <li>{ moon }</li>
                <li>{ name.toUpperCase() }</li> // RIOT BACON
            </ul>,
            document.getElementById("root")
        );
</script>
```


---
## 3. REACT COMPONENTS
### CREATING A REACT COMPONENT
#### components 
* a small building block of the user interface
* when creating a component, use a capital first letter, and create it as a function
* react wants to only render a single component so it must either be wrapped in an element (like a `<div>`) or a different function that's responsible for rendering all of the components.
* a component is just a function that returns some `jsx`

```html
<script type="text/babel">
    function Header() {
        return (
            <header>
                <h1>title</h1>
            </header>
        );
    }

    function Main() {
        return (
            <section>
                <p>main component</p>
            </section>
        );
    }

    function App() {
        return (
            <div>
                <Header/>
                <Main/>
            </div>
        );
    }
    
    // ReactDOM.render(  // rendering a single component
    //     <Header/>,  // referencing the Header()
    //     document.getElementById("root")
    // );

    //  ReactDOM.render( // rendering both components wrapped in a <div>
    //     <div>
    //         <Header/>
    //         <Main/>
    //     </div>,
    //     document.getElementById("root")
    // );

    ReactDOM.render( // rendering with a function
        <App/>
        document.getElementById("root")
    );
</script>
```

### ADDING COMPONENT PROPERTIES
#### using `props`
* pass `props` into any component (function)
    * `props` is an object
* to add values to `props`, need to add them wherever the component is being rendered as `property="value"`
* access the `props` using a `jsx` expression (`{}`) with `{ props.propertyName }`

```html
<script type="text/babel">
    function Header(props) {
        return (
            <header>
                <h1>{ props.name }</h1> // riot
            </header>
        );
    }

    function Main() {
        return (
            <section>
                <p>{ props.adjective } component</p>  // main component
            </section>
        );
    }

    function Footer(props) {
        return (
            <footer>
                <p>copyright { props.year }</p>
            </footer>
        );
    }

    function App() {
        return (
            <div>
                <Header name="riot"/>
                <Main adjective="main"/>
                <Footer year={ new Date().getFullYear() }/> // can use a function
                // <Footer year={ 2023 }/> // to use a number, must wrap in {}
            </div>
        );
    }

    ReactDOM.render( // rendering with a function
        <App/>
        document.getElementById("root")
    );
</script>
```

### WORKING WITH LISTS
#### passing an array with `props`
* to display array elements in a component, use `map()`
* without a `key` prop, there will be an error

```html
<script type="text/babel">
    const things = [
        "thing 1",
        "thing 2",
        "thing 3",
    ];

    function Header(props) {
        return (
            <header>
                <h1>{ props.name }</h1> // riot
            </header>
        );
    }

    function Main(props) {
        return (
            <section>
                <ul>
                    // { things.map(thing => (<li>{ thing }</li>)) } // via `things`
                    { props.things.map(thing => (<li>{ thing }</li>)) } // via props
                </ul>
            </section>
        );
    }

    function Footer(props) {
        return (
            <footer>
                <p>copyright { props.year }</p>
            </footer>
        );
    }

    function App() {
        return (
            <div>
                <Header name="riot"/>
                <Main things={ things }/>
                <Footer year={ new Date().getFullYear() }/> // can use a function
            </div>
        );
    }

    ReactDOM.render( // rendering with a function
        <App/>
        document.getElementById("root")
    );
</script>
```


### ADDING KEYS TO LIST ITEMS
#### fixing the `key` prop error
* `key`s help keep data in sync as the `state` of the app changes over time
* error: `each child in a list should have a unique "key" prop`
    * this error occurs because it's possible that things might get out of sync when rendering occurs, particularly when something is added to the front or middle of the list
    * the `key` acts as an `id` that keeps everything in sync
* *fixes*: 
    * add an index to the `<li>` (not recommended because there can still be problems with rendering)
    
    * data transformation
        * create an array of objects
        * for each item in the `things` array, create an `object` because each can have an `id` property
            * whenever we return an `object` from an `arrow function`, we need to point that `arrow function` at `()` instead of just pointing it directly at `{}`
        * this is different from using an index because the data is stable * meaning the `id` property is set when it's mapped in the function before rendering instead of it being created while the list items are rendering
```jsx
// adding index to <li>
const things = ["thing 1", "thing 2", "thing 3"];

<section>
    <ul>
        { props.things.map((thing, i) => (<li key={i}>{ thing }</li>)) }
    </ul>
</section>

<Main things={ things }>
```


```jsx
// data transformation
const things = ["thing 1", "thing 2", "thing 3"];
const thingObjects = things.map((thing, i) => (
    {
        id: i,
        title: thing,
    }
));

<section>
    <ul>
        { props.things.map((thing) => (<li key={thing.id}>{ thing.title }</li>)) }
    </ul>
</section>

<Main things={ thingObjects }>
```


### DISPLAYING IMAGES WITH REACT
#### getting an image using the address
* right click, select `copy image address`
* this will go in the `src` of the `<img>` tag
* add `height` and `alt`

```jsx
<img 
    src="copied-image-address.com"
    height={200}
    alt="alternate image description"
/>
```

#### getting an image that has been saved
* replace the image address with the path to the location where the file has been saved within the project

```jsx
<img 
    src="./path/to/image.jpeg"
    height={200}
    alt="alternate image description"
/>
```

### USING FRAGMENTS
#### wrapping adjacent components in a `<div>`
```jsx
function App() {
    return (
        <div
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
}
```

```html
<!-* output in dev tools -->
<div id="root">
    <div>
        <header>...</header>
        <section>...</section>
        <footer>...</footer>
    </div>
</div>
```

#### minimize using wrapper `<div>`s with `<React.Fragment>`
```jsx
function App() {
    return (
        <React.Fragment>
            <Header/>
            <Main/>
            <Footer/>
        </React.Fragment>
    );
}
```

```html
<!-* output in dev tools -->
<div id="root">
    <header>...</header>
    <section>...</section>
    <footer>...</footer>
</div>
```


---
## 4. REACT STATE IN THE COMPONENT TREE
### GENERATING A PROJECT WITH `create-react-app`
#### using `create-react-app`
* `create-react-app` is a way to generate a new react project from scratch
* using `create-react-app`
    * navigate to the correct folder using `cd project-folder`
    * make sure node.js is installed using `node -v`
    * make sure npm is installed using `npm -v`
    * create the react app using `npx create-react-app [project name]`
        * this will install everything needed (react, react-dom, react-scripts) and create the standard folder structure
            * react-scripts: all of the babel, all of the compiling, everything set up from scratch
    * `cd` into the new app folder that was just created
    * run `npm start` to start the server
        * will run on `localhost:3000` by default
```bash
cd project-folder   # move into project folder where i want react-app created
node -v     # v16.19.0
npm -v      # 8.19.3
npx create-react-app react-app # generate everything needed for the react project
cd react-app # move into the new app
npm start   # start the dev server
```

### TOURING A `create-react-app` PROJECT
#### `project.json`
* see all dependencies
    * react-related dependencies:
        * react: everything needed to create components
        * react-dom: how components are added to the page
        * react-scripts: handles all of the bundling
* all scripts that npm can run

#### `src/`
* main files of the app:
* `index.js`: 
    * the entry point of the app. renders the app to the DOM, which references `<div id="root">`
    * `<App/>` is wrapped in `<React.StrictMode></React.StrictMode>`
        * `<React.StrictMode>`: 
            * is a tool for highlighting any potential problems in the app
            * it's a package that's going to activate some additional checks to see if code is written correctly
            * these checks will only run in development
    * `<App/>` component refers to `src/App.js`
* `public/index.html`: 
    * where the `<div id="root">` lives, which is where all react code will be injected
* `src/App.js`: 
    * components will be kept inside of their own files 
    * `App()` is a function
    * `App` is exported as the default export
* `src/App.css`: holds all of the styles


### DESTRUCTURING ARRAYS & OBJECTS
#### using destructuring
* [object destructuring cheat sheet](https://dmitripavlutin.com/javascript-object-destructuring/)
* object destructuring: 
    * allows us to get values by object keys directly from the object
    * `const { property } = object;`
```javascript
const person = {
    firstName: 'riot',
    lastName: 'bacon'
}

const { firstName, lastName } = person;
console.log(firstName, lastName); // riot bacon
```

* array destructuring:
    * variable name is assigned based on the position of the element in the array
    * `const [ itemPosition ] = array;`
```javascript
const cities = ["boulder", "tahoe", "seattle"];
console.log(cities[0]); // boulder

const [first, second, third] = ["boulder", "tahoe", "seattle"];
console.log(
    first,  // boulder
    second, // tahoe
    third   // seattle
);
```

```jsx
// original
function App(props) {
    return (
        <div className="App">
            <h1>hello from {props.library}</h1>
        </div>
    );
}

// using destructing
function App({ library }) {
    return (
        <div className="App">
            <h1>hello from {library}</h1>
        </div>
    );
}
```


### UNDERSTANDING THE `useState` HOOK
#### managing state
* a `state` can be a string, boolean, object, array
* when we pass in its inital value, this is the value when the app is rendered to the page for the first time. anytime the `set function` is called, it's called with a new state and that will change the state for the entire app
* must import `useState` from `react`
    * returns an array with 2 values
        * 1st value is the current `state` value
        * 2nd value is a function that will be used to update the `state`
* set the initial state by passing a value to `useState`
```javascript
const what = useState("happy");
console.log(what); // ['happy', f]
```

* assigning a name to the value
```javascript
import { useState } from "react";

function App() {
    const [ emotion, setEmotion ] = useState("happy");
    
    return (
        <div className="App">
            <h1>current emotion: {emotion}</h1>
        </div>
    );
}
```

* change the state with the `setEmotion` function
    * use an event of some sort (`button` with an `onClick` listener) to invoke the `setEmotion` function with the new `emotion` of `sad`
```javascript
import { useState } from "react";

function App() {
    const [ emotion, setEmotion ] = useState("happy");
    
    return (
        <div className="App">
            <h1>current emotion: {emotion}</h1>
            <button onClick={() => setEmotion('sad')}>sad</button>
        </div>
    );
}
```

### WORKING WITH `useEffect`
#### `useEffect` hook (build into `react`)
* typically used to manage side effects that aren't related to a components render (console messages, loading data, working with animations)
* takes in 2 arguments:
    * 1st - function called whenever we want the effect to happen
    * 2nd - when the effect is actually called (called the dependency array)
        * pass in `[]` if the effect should not be called again after the first render
        * pass in `state` value in an array to listen for any changes
```javascript
import { useState, useEffect } from "react";

function App() {
    const [ emotion, setEmotion ] = useState("happy");

    useEffect(() => { 
         console.log(`it's ${emotion} right now.`); 
    }, 
    // []); // only logs once on inital render
    [emotion]); // listens for any change to emotion
    
    return (
        <div className="App">
            <h1>current emotion: {emotion}</h1>
            <button onClick={() => setEmotion('sad')}>sad</button>
        </div>
    );
}
```


### UNDERSTANDING THE DEPENDENCY ARRAY
#### can use `useEffect` and `useState` to keep track of different variables
- can pass more than one `state` variable into the dependency array
```javascript
import { useState, useEffect } from "react";

function App() {
    const [ emotion, setEmotion ] = useState("happy");
    const [ secondary, setSecondary ] = useState("tired");

    useEffect(() => { 
         console.log(`it's ${emotion} right now.`); 
    }, 
    // [emotion]); // original
    [emotion, secondary]);

    // useEffect(() => { 
    //      console.log(`it's ${secondary} right now.`); 
    // }, [secondary]);

    return (
        <div className="App">
            <h1>current emotion: {emotion}</h1>
            <button onClick={() => setEmotion('sad')}>sad</button>
            <h2>current secondary emotion: {secondary}</h2>
            <button onClick={() => setSecondary('grateful')}>grateful</button>
        </div>
    );
}
```

### INCORPORATING `useReducer`
#### creating a checkbox that will manage `state` with `useState`
```javascript
// using useState
import { useState } from "react";

function App() {
    const [ checked, setChecked ] = useState(false);

    return (
        <div className="App">
            <input type="checkbox" 
                value={checked} 
                onChange={() => setChecked((checked) => !checked)}
            />
            <label>{checked ? "checked" ? "not checked"}</label>
        </div>
    );
}
```

#### creating a checkbox that will manage `state` with `useReducer`
* `useReducer` takes in 2 arguments: 
    * 1st - function that will be used to update the `state`
    * 2nd - inital `state`
```javascript
// using useReducer
import { useReducer } from "react";

function App() {
    const [ checked, setChecked ] = useReducer((checked) => !checked, false);

    return (
        <div className="App">
            <input type="checkbox" value={checked} onChange={setChecked} />
            <label>{checked ? "checked" ? "not checked"}</label>
        </div>
    );
}
```


---
## 5. HANDLING FORMS IN REACT
### WORKING WITH UNCONTROLLED COMPONENTS
#### `useRef`
* hook that allows us to reach out to an individual element and check what its value is.
* returns an object with a property `current`, which is whatever the value is of that field (like `input` for an `<input/>`)
* `current` will have a `value` assigned to it as well that can be referenced by `useRefVariable.current.value`
* `useRef` is a hook that will reach out to a UI element and get its value
* the following example is an `uncontrolled component`
    * we're saying create this little container, give us whatever that value is
    * manage the form elements outside of state
* unlike `useState` where the component will re-render if there's some sort of a change, `useRef` will not re-render. always have to reach out to the `current.value` to see what the value actually is by reaching out to the input itself.
```jsx
import {useRef} from "react";

function App() {
    const txtTitle = useRef();
    const hexColor = useRef();

    const submit = (e) => {
        e.preventDefault(); // preventing the refresh default behavior

        const title = txtTitle.current.value; // setting the useRef values to variables
        const color = hexColor.current.value;

        alert(`${title}, ${color}`); // alert showing the values

        txtTitle.current.value = ""; // clearing out the values
        hexColor.current.value = "";
    };

    return (
        <form onSubmit={submit}>
            <input ref={txtTitle} type='text' placeholder='color title' />
            <input ref={hexColor} type='color' />
            <button>ADD</button>
        </form>
    );
}
```

### CREATING CONTROLLED FORM ELEMENTS
#### a form containing a `state` is a `controlled component`
- controlling the form by creating `state` values for the form elements
- the `<input/>` has a `value` added to it set to each `state` value
    - title input has `value={title}`
    - color input has `value={color}`
- `onChange` listener is added to each `<input/>`
    - takes in the `event`, calls the `state` setter for that `<input/>`, and sets the state to the `event.target.value`
        - `event.target.value` allows us to capture whatever is put into that `<input/>` field
- when the form is submitted with `onSubmit`, the `submit` function is called
    - default refresh is prevented
    - alert shows the value of the `title` and `color` `state` variables
    - the `state`s are reset to their original values
        - `setTitle("");`
        - `setColor("000000");`
```jsx
import {useState} from "react";

function App() {
    const [title, setTitle] = useState(""); // state variables and setters and setting the inital value
    const [color, setColor] = useState("#000000");

    const submit = (e) => {
        e.preventDefault(); // prevent default refresh

        alert(`${title}, ${color}`); // alert showing the values

        setTitle("");        // resetting to the original states
        setColor("000000");
    };

    return (
        <form onSubmit={submit}>
            <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                type='text'
                placeholder='color title'
            />
            <input
                onChange={(event) => setColor(event.target.value)}
                value={color}
                type='color'
            />
            <button>ADD</button>
        </form>
    );
}
```

### BUILDING A CUSTOM HOOK
#### custom hooks
* function that is going to always start with the keyword `use`
* take in some sort of inital value
* use a `useState` hooks
    * `const [value, setValue] = useState(initalValue);`
* can `return` anything
    * this one will return an array of objects with `value`, and an `onChange` function that calls `setValue` and a function to reset the state to the original value
* a hook is a function that we can use for repeatable code. very reusable, can be shared across the project, write tests, etc.
```jsx
import {useState} from "react";

function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    return [
        {
            value,
            onChange: (e) => setValue(e.target.value),
        },
        () => setValue(initialValue),
    ];
}

function App() {
    const [titleProps, resetTitle] = useInput("");
    const [colorProps, resetColor] = useInput("#000000");

    const submit = (e) => {
        e.preventDefault();

        alert(`${titleProps.value}, ${colorProps.value}`); // alert showing the values

        resetTitle();
        resetColor();
    };

    return (
        <form onSubmit={submit}>
            <input {...titleProps} type='text' placeholder='color title' />
            <input {...colorProps} type='color' />
            <button>ADD</button>
        </form>
    );
}
```

### CHOOSING A FORM LIBRARY 
#### there are many form libraries
* [formik](https://formik.org/)
* [react-hook-form](https://react-hook-form.com/)
* not form related but also relevant -- [usehooks.com](https://usehooks.com/)



---
## 6. ASYNCHRONOUS REACT
### FETCHING DATA WITH HOOKS
#### getting data from an api
* example: [github api](https://api.github.com/users/bfranzen19)
* github REST API that we can make calls to
* use `useState` to handle the data and `useEffect` to make the api call
* `fetch()` built into the browser, supported, a way to make an `HTTP` request to get data from a source
* `.json()` turns the response into `JSON`
* make sure to pass in `[]` with `useEffect()` so that it only makes the call once when it's rendered
* `<pre>` is a preformatting tag to format some `JSON`
    * [pre tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre)
    * text has already been formatted so it will be written exactly that way, including whitespace.
* `JSON.stringify(data, null, 2)`- `data` is the data returned, `null` and `2` help formatting

```jsx
import {useState, useEffect} from "react";

function App() {
    const [data, setData] = useState(null); // container for the data and the function to update the data, inital state is null
    useEffect(() => {
        fetch(`https://api.github.com/users/bfranzen19`) // 
            .then((response) => response.json()) // 
            .then(setData); // call this shorthand way instead of `(data) => setData(data)`
    }, []); // [] ensures this happens once when the app renders the 1st time

    if (data) return <pre>{JSON.stringify(data, null, 2)}</pre>; // if there's data, display it

    return <h1>data</h1>;
}
```


### DISPLAYING DATA FROM AN API
#### displaying data in seperate component
* `GithubUser()` function will display the data that is fetched
* regardless of what data is being displayed, anytime you are making a `fetch` for some data from an api, the first step is always fetching the data (here, using `useState` and `useEffect` combo), then passing data to child components (like `GithubUser()`) and then we display by pulling from that 

```jsx
import {useState, useEffect} from "react";

function GithubUser({name, location, avatar}) { // display name, location, and avatar properties from data
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
    }, []);

    if (data)
        return (
            <GithubUser
                name={data.name}
                location={data.location}
                avatar={data.avatar_url}
            />
        );

    return <h1>data</h1>;
};
```

### HANDLING LOADING STATES
#### data in different states
* data coming from an api can be in a few different states
    * `loading state` - currently fetching the data, just hasn't resolved yet
    * `success state` - data has come back and can be displayed
    * `error state` - something went wrong
* can represent all of this with `useState` hooks
* should always handle for loading, success, and error states for async requests

```jsx
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
    if (!data) return null; // no data, return null

    return (
        <GithubUser
            name={data.name}
            location={data.location}
            avatar={data.avatar_url}
        />
    );
};
```

### FETCHING DATA WITH `GraphQL`
#### `GraphQL` 
* a way of creating an api wher eyou can specify what data you want by using its field
    * query example:
        ```
        query {
            allLifts {
                name
                elevationGain
                status
            }
        }
        ```
* request example [snowtooth.moonhighway.com](https://snowtooth.moonhighway.com)
#### iterating over data and displaying the component for each returned element
* in a `<div>`, use `map()` on the `data` collection and return the displaying component (`Lift`) for each element
* need to also pass the query and options to the `fetch()` 
    * `fetch()` takes in the url and the options
* be sure to log the data returned to make sure it's not nested in another object or something

```jsx
import {useState, useEffect} from "react";

const query = `
    query {
            allLifts {
                name
                elevationGain
                status
            }
        }
    `;

const opts = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({query}),
};

function Lift({name, elevationGain, status}) {
    return (
        <div>
            <h1>{name}</h1>
            <p>{elevationGain}</p>
            <p>{status}</p>
        </div>
    );
}

function App() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch(`https://snowtooth.moonhighway.com`, opts)
            .then((response) => response.json())
            .then(setData)
            .then(() => setLoading(false))
            .catch(setError);
    }, []);

    if (loading) return <h1>loading...</h1>;
    if (error) return <pre>{JSON.stringify(error)}</pre>;
    if (!data) return null;

    return (
        <div>
            {data.data.allLifts.map(
                (
                    lift // nested in another data property
                ) => (
                    <Lift
                        name={lift.name}
                        elevationGain={lift.elevationGain}
                        status={lift.status}
                    />
                )
            )}
        </div>
    );
};
```

### WORKING WITH RENDER PROPS
#### how to use functions to display the right data at the right time
* `renderItem` - render an individual list item (function)
* `renderEmpty` -  what is displayed if there's nothing in the list (can be an html element)
* `React.Fragment` shorthand === `<></>`
* `App()` must be slightly refactored to make sure it's pumping the data in correctly

```jsx

const tahoe_peaks = [
    {name: "freel", elevation: 10891},
    {name: "monument", elevation: 10067},
    {name: "pyramid", elevation: 9983},
    {name: "tallac", elevation: 90735},
];

function List({data, renderItem, renderEmpty}) {
    return !data.length ? (
        renderEmpty
    ) : (
        <ul>
            {data.map((item) => (
                <li key={item.name}>{renderItem(item)}</li>
            ))}
        </ul>
    );
}

function App() {
    return (
        <List
            data={tahoe_peaks}
            renderEmpty={<p>this list is empty</p>}
            renderItem={(item) => (
                <>
                    {item.name} - {item.elevation} feet
                </>
            )}
        />
    );
}
```


---
## 7. REACT ROUTER
### INSTALLING REACT ROUTER V6
#### moving from page to page
* with `react` & a single-page application, this is component to component
* `react router` allows us to seamlessly move from page to page by displaying different components
* installing `react router` v.6
    * move to the app root
    * `npm install react-router-dom@6`
```bash
cd react-app
npm i react-router-dom@6
```

* create some basic functions to return different parts of the website
* next, we'll configure the router to navigate to those pages

```jsx
function Home() {
    return (
        <div>
            <h1>my website</h1>
        </div>
    );
}

function About() {
    return (
        <div>
            <h1>about</h1>
        </div>
    );
}

function Contact() {
    return (
        <div>
            <h1>contact</h1>
        </div>
    );
}

function App() {
    return <Home />;
}
```


### CONFIGURING THE ROUTER
#### `index.js`, import and configure routes
```jsx
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App, About, Contact} from "./App";
import {BrowserRouter, Routes, Route} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
        </Routes>
    </BrowserRouter>
);
```

#### alter `App.js` to use and correctly export functions
```jsx
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
```

### INCORPORATING THE LINK COMPONENT
#### using `Link`
* allows navigation to other pages 
```jsx
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
```


### NESTING LINKS WITH REACT ROUTER V6
#### nesting routes in `index.js`
* create a closing tag for `</Route>`
* create a new `<Route/>` in that tag
    * `element={<History/>}` just like the others
    * `path="history"` with no `/`
* in `App.js`, import `Outlet` from `"react-router-dom"`
* `Outlet` is like a little container for a component
* use the `<Outlet/>` component on the parent page
* navigating to `/about/history` will display the `<History/>` component
* need ot have route configuration created, define all of the paths, then create the element property to display the correct component at the correct time.

```jsx
// index.js
import {App, About, History, Contact} from "./App";
import {BrowserRouter, Routes, Route} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/about' element={<About />}>
                <Route path='history' element={<History />} />
            </Route>
            <Route path='/contact' element={<Contact />} />
        </Routes>
    </BrowserRouter>
);
```

```jsx
// App.js
import {Link, Outlet} from "react-router-dom";

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
            <Outlet />
        </div>
    );
}

export function History() {
    return (
        <div>
            <h1>History</h1>
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
```



---
## 8. REACT TESTING & DEPLOYMENT
### USING `create-react-app` AS A TESTING PLATFORM
#### `npm run test` to run tests
* built in to `create-react-app`
* `npm run test` will run all tests in the app
    * there is 1 test in `App.test.js`
    * will run anything with the `.test.js` in the file name


### TESTING SMALL FUNCTIONS WITH JEST
#### testing example
* create `functions.js` and `functions.test.js` files in `src/`
* `functions.js` is the file with the actual code and `functions.test.js` is the tests that we would want to run with `npm run test`
* `create-react-app` already has `jest` configured
    * [jest docs](https://jestjs.io/docs/getting-started)

```javascript
// functions.test.js
import {timesTwo} from "./functions";

test("multiplies by 2", () => {
    expect(timesTwo(4)).toBe(8);
});
```

```javascript
// functions.js
export function timesTwo(num) {
    return num * 2;
}
```


### INTRODUCING REACT TESTING LIBRARY
#### react testing library
* built in to `create-react-app`
* example: create `star.js` and `star.test.js`
* can use test utilities to render this component for us even though it's not rendered anywhere else
* `react testing library` query - a way of selecting a particular element based on some sort of a property
* can rerun all tests by hitting `a` in the terminal

```javascript
// star.js
export function Star() {
    return <h1>cool star</h1>;
}
```

```javascript
// star.test.js
import {render} from "@testing-library/react";
import {Star} from "./star";    // import the component

test("renders an h1", () => {
    const {getByText} = render(<Star />); // selects the render of the star
    const h1 = getByText(/cool star/); // use getByText to look for the text

    expect(h1).toHaveTextContent("cool star"); // expect statement
});
```


### TESTING EVENTS WITH REACT TESTING LIBRARY
#### event testing
* create a new component `Checkbox.js` and associated test file `Checkbox.test.js`
* have to associate the `<label>` with the `<input>`
    * the `<label>` needs `htmlFor='checked'` 
    * `<input>` needs `id='checked'`

```javascript
// Checkbox.test.js
import {fireEvent, render} from "@testing-library/react";
import {Checkbox} from "./Checkbox";

test("selecting checkbox should change value to true", () => {
    const {getByLabelText} = render(<Checkbox />);
    const checkbox = getByLabelText(/not checked/i); // regex is not case sensitive
    fireEvent.click(checkbox); // automates the process of firing an event on the checkbox

    expect(checkbox.checked).toEqual(true);
});
```

```javascript
// Checkbox.js
import {useReducer} from "react";

export function Checkbox() {
    const [checked, setChecked] = useReducer((checked) => !checked, false);

    return (
        <>
            <label htmlFor='checked'>
                {checked ? "checked" : "not checked"}
            </label>
            <input
                id='checked'
                type='checkbox'
                value={checked}
                onChange={setChecked}
            ></input>
        </>
    );
}
```


### DEPLOYING TO NETLIFY
#### [`netlify`](https://www.netlify.com/)
* free tool to deploy a `react` app quickly
* can customize with a custom domain, `HTTPS` support, etc
* add a new site (can also inport an existing project from github)
* deploy manually
    * will need the `build` of the project
    * to `build`, run `npm run build`
        * optimizes for production and has everything ready to go
        * will generate the `build/` folder
    * drag and drop the `build` folder and it deploys