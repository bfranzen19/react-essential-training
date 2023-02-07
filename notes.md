# [`LinkedIn Learning - React.js Essential Training`](https://www.linkedin.com/learning/react-js-essential-training-14836121/building-modern-user-interfaces-with-react?autoplay=true&u=83102426)

## 2. INTRO TO REACT ELEMENTS
### ADDING REACT 
#### using CDN
- in `index.html`, in the `<head>` tag, add the `<script>` tags for the [cdn](https://reactjs.org/docs/cdn-links.html) to add the `react` and `react-dom` libraries.

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
- can also store in a variable and create it that way

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
- changing heading to `<ul>` and adding `<li>` with `React.createElement` as the final argument

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

- this gets cumbersome >>>  _`jsx has entered the chat`_
- `jsx` stands for `javascript as xml` and is an `html`-like syntax

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
- this error happens because tag-based syntax is not supported in the browser so we have to compile it
- `babel` takes code that isn't supported by the browser and compiles it into code that is supported by the browser to give us readability and shorter syntax.
- `babel` can also be imported via cdn and the script type needs to change from `text/javascript` to `text/babel`.

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
- can use it to inject dynamic content into tags by referencing them by variable name

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
- a small building block of the user interface
- when creating a component, use a capital first letter, and create it as a function
- react wants to only render a single component so it must either be wrapped in an element (like a `<div>`) or a different function that's responsible for rendering all of the components.
- a component is just a function that returns some `jsx`

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
- pass `props` into any component (function)
    - `props` is an object
- to add values to `props`, need to add them wherever the component is being rendered as `property="value"`
- access the `props` using a `jsx` expression (`{}`) with `{ props.propertyName }`

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
- to display array elements in a component, use `map()`
- without a `key` prop, there will be an error

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
- `key`s help keep data in sync as the `state` of the app changes over time
- error: `each child in a list should have a unique "key" prop`
    - this error occurs because it's possible that things might get out of sync when rendering occurs, particularly when something is added to the front or middle of the list
    - the `key` acts as an `id` that keeps everything in sync
- *fixes*: 
    - add an index to the `<li>` (not recommended because there can still be problems with rendering)
    
    - data transformation
        - create an array of objects
        - for each item in the `things` array, create an `object` because each can have an `id` property
            - whenever we return an `object` from an `arrow function`, we need to point that `arrow function` at `()` instead of just pointing it directly at `{}`
        - this is different from using an index because the data is stable - meaning the `id` property is set when it's mapped in the function before rendering instead of it being created while the list items are rendering
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
- right click, select `copy image address`
- this will go in the `src` of the `<img>` tag
- add `height` and `alt`

```jsx
<img 
    src="copied-image-address.com"
    height={200}
    alt="alternate image description"
/>
```

#### getting an image that has been saved
- replace the image address with the path to the location where the file has been saved within the project

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
<!-- output in dev tools -->
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
<!-- output in dev tools -->
<div id="root">
    <header>...</header>
    <section>...</section>
    <footer>...</footer>
</div>
```


---
## 4. REACT STATE IN THE COMPONENT TREE
### GENERATING A PROJECT WITH `create-react-app`
#### 


### TOURING A `create-react-app` PROJECT
#### 


### DESTRUCTURING ARRAYS & OBJECTS
#### 


### UNDERSTANDING THE `useState` HOOK
#### 


### WORKING WITH `useEffect`
#### 


### UNDERSTANDING THE DEPENDENCY ARRAY
#### 


### INCORPORATING `useReducer`
#### 



---
## 5. HANDLING FORMS IN REACT
### WORKING WITH UNCONTROLLED COMPONENTS
#### 


### CREATING CONTROLLED FORM ELEMENTS
#### 


### BUILDING A CUSTOM HOOK
#### 


### CHOOSING A FORM LIBRARY
#### 



---
## 6. ASYNCHRONOUS REACT
### FETCHING DATA WITH HOOKS
#### 


### DISPLAYING DATA FROM AN API
#### 


### HANDLING LOADING STATES
#### 


### FETCHING DATA WITH `GraphQL`
#### 


### WORKING WITH RENDER PROPS
#### 



---
## 7. REACT ROUTER
### INSTALLING REACT ROUTER V6
#### 


### CONFIGURING THE ROUTER
#### 


### INCORPORATING THE LINK COMPONENT
#### 


### NESTING LINKS WITH REACT ROUTER V6
#### 



---
## 8. REACT TESTING & DEPLOYMENT
### USING `create-react-app` AS A TESTING PLATFORM
#### 


### TESTING SMALL FUNCTIONS WITH JEST
#### 


### INTRODUCING REACT TESTING LIBRARY
#### 


### TESTING EVENTS WITH REACT TESTING LIBRARY
#### 


### DEPLOYING TO NETLIFY
#### 