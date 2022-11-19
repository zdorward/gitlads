import FlightTile from "./FlightTile";

import './Prices.css';

function Prices(props) {

    var data = props.data.vancouver;


    if (props.destination === "Vancouver") {
        data = props.data.vancouver;
    } else if (props.destination === "Beijing") {
        data = props.data.beijing;
    } else if (props.destination === "Fort McMurray") {
        data = props.data.fortM;
    }

    if (props.selection === "Flights") {
        data = data.flights.sort(function (a, b) { return a - b });
    } else if (props.selection === "Hotels") {
        data = data.hotels.sort(function (a, b) { return a - b });
    } else if (props.selection === "Food") {
        data = data.food.sort(function (a, b) { return a - b });
    }

    return <div className="prices">

        {data
        .filter(val => { return val < props.max && val > props.min })
        .map((val, index) => <FlightTile
            destination={props.destination}
            price={val}
            selection = {props.selection}
            index = {index}
        />)}
    </div>
}

export default Prices; 