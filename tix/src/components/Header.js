function Header(props){

    var subject = ""; 
    if (props.selection === "Flights") {
        subject = "flights to";
    } else if (props.selection === "Hotels") {
        subject = "hotel prices in";
    } else if (props.selection === "Food") {
        subject = "food prices in"; 
    }

    return(
        <div className="header">
            <h1>You are in Edmonton, AB, Canada.</h1>
            <h2>Showing {subject} {props.destination}</h2> 
        </div>
    )
}
export default Header;