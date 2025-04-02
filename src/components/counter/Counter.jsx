import { useState } from "react";
import { CounterButton } from "../counterButton/CounterButton";
import "./Counter.css"

export default function Counter() {
    // Definieer Hook
    const [count,setCount] = useState(0);

    function incrementCounterParentFunction(by) {
        setCount(count + by);
    }

    function decrementCounterParentFunction(by) {
        setCount(count - by);
    }

    function resetCounter() {
        setCount(0);
    }

    return(
        <>
            <span className="totalCount">{count}</span>
            <CounterButton by={1} incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction}/>
            <CounterButton by={2} incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction}/>
            <CounterButton by={5} incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction}/>
            <button className="counterButton" onClick={resetCounter}>Reset</button>
        </>
    )
}

