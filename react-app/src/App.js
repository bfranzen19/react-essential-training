import "./App.css";

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

export default App;
