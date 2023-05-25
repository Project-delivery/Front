import React from "react";
import {validationResponse} from "../imports_for_output/requests_for_validator";


interface requests{
    setRequestID: React.Dispatch<React.SetStateAction<number>>
    selectedItem: validationResponse | null
    list: validationResponse[]
    setSelectedItem: React.Dispatch<React.SetStateAction<validationResponse >>
}

export function Requests_for_validator({setRequestID, selectedItem, list, setSelectedItem} : requests){

    const listItems = list.map((elem) => (
        <li style={{fontWeight: selectedItem == elem ? 600 : 350,
            transition: "font-weight 0.05s ease-in",
        }}
            key={elem.street_id}
            onClick={() => {
                setRequestID(elem.id)
                setSelectedItem(elem)
                
        }
        }>
            {JSON.stringify(elem)}
        </li>
    ));

    return (
        <ul className="list">
            {listItems}
        </ul>
    )
}