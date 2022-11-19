import { useState } from "react";
import axios from "axios";
import Prices from "./Prices";
import Header from "./Header";
import styles from './SearchBar.module.css'
function SearchBar(props) {
    let data = {
        vancouver: {
          flights: [3038.19, 1031.15, 3085.61],
          hotels: [132.48, 168.02, 144.99],
          food: [271.37, 297.96, 48.46, 455.65, 141.23]
        }, 
        beijing: {
          flights: [4888.04, 4430.46, 2430.46],
          hotels: [179.91, 105.03, 102.92, 152.08, 138.38],
          food: [237.99, 103.96, 219.0, 441.02, 270.26]
        },
         fortM: {
          flights: [4191.88, 1790.61, 2659.89],
          hotels: [134.33, 196.59, 190.16, 192.03, 112.62],
          food: [202.01, 388.50, 498.94, 98.04, 436.92]
        }
      };
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(10000000000000);
    
    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        setLocation(e.target[0].value)
        setPriceMin(e.target[1].value)
        setPriceMax(e.target[2].value)
        setSelection(e.target[3].value)
        const res = async () =>{
            try{
                const lol = await axios.get('//localhost:3001/location',{
                params: {
                    selection: selection,
                    location: location
                }}) 
                data = lol.data[e.target[0].value + " - Flights"]

            }catch (e){
                console.log(e)
            }
        }
        res();
    }
    const [location, setLocation] = useState("Vancouver");
    const [selection, setSelection] = useState("Flights");
    return(
        <div className={styles.search}>
            <div className={styles.searchform}>
                <form className={styles.searchbar} onSubmit={searchSubmitHandler}>
                    <input id="dest" className={styles.searchinput} type="text" placeholder="Search Destinations"/>
                    <input className={styles.searchinput} type="text" placeholder="Minimum Price"/>
                    <input  className={styles.searchinput}type="text" placeholder="Maximum Price"/>
                    <select className={styles.searchselect} name="Selection">
                        <option value="Flights">Flights</option>
                        <option value="Hotels">Hotel</option>
                        <option value="Food">Food</option>
                    </select>
                    <input type="submit" />
                </form>   
            </div>
            <Header 
            destination={location}
            selection={selection}
            
            ></Header>
            <Prices
                destination={location}
                data={data}
                selection = {selection}
                max = {priceMax}
                min = {priceMin}
                ></Prices>
        </div>
    )
}

export default SearchBar