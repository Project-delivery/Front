import React from "react";
import {mainObj_typeAddress} from "../MainObject/mainObj_address";


interface requests{
    selectedItem: mainObj_typeAddress | null
    list: mainObj_typeAddress[]
    setSelectedItem: React.Dispatch<React.SetStateAction<mainObj_typeAddress | null>>
}

export function Requests_for_validator({selectedItem, list, setSelectedItem} : requests){

    const listItems = list.map((elem) => (
        <li style={{fontWeight: selectedItem == elem ? 600 : 350,
            transition: "background-color ease-in 0.1s",
            borderRadius: 6,
        }}
            key={elem.id}
            onClick={() => {
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