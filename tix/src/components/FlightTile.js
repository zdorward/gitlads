import './FlightTile.css'

function FlightTile(props) {
    return (
        <div className="flight-tile">
            <div className='flight-tile__price'>${props.price}</div>
            <div className='flight-tile__description'>
                <h2>{props.destination} {props.selection} #{props.index + 1}</h2>
                
                <div className='flight-tile__reserve'>Reserve</div>
            </div>
        </div>
    )
}

export default FlightTile; 