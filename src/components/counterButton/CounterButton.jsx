import { PropTypes } from "prop-types";
import "./Buttons.css"

export function CounterButton({by, incrementMethod, decrementMethod}) {
    return(
        <div className="Counter">
            <div>
                <button className="counterButton" onClick={() => incrementMethod(by)}>+{by}</button>
                <button className="counterButton" onClick={() => decrementMethod(by)}>-{by}</button>
            </div>
        </div>
    )
    /*
    function incrementCounter(){
        incrementMethod(by);
    }

    function decrementCounter(){
        decrementMethod(by);
    }
        */
}

CounterButton.propTypes = {
    by: PropTypes.number
}

CounterButton.defaultProps = {
    by: 1
}