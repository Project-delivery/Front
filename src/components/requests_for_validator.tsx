import React from "react";
import {mainObj_typeValidator} from "../imports_for_output/requests_for_validator";


interface requests{
    setRequestID: React.Dispatch<React.SetStateAction<number>>
    selectedItem: mainObj_typeValidator | null
    list: mainObj_typeValidator[]
    setSelectedItem: React.Dispatch<React.SetStateAction<mainObj_typeValidator | null>>
}

export function Requests_for_validator({setRequestID, selectedItem, list, setSelectedItem} : requests){

    const listItems = list.map((elem) => (
        <li style={{fontWeight: selectedItem == elem ? 600 : 350,
            transition: "font-weight 0.05s ease-in",
        }}
            key={elem.id}
            onClick={() => {
                setRequestID(elem.requestID)
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