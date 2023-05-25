import React, { useEffect } from "react";
import { useState } from "react";
import {Requests_for_validator} from "../components/requests_for_validator";
import {exampleValidationResponse, validationResponse} from "../imports_for_output/requests_for_validator";
import { AddAddress, GetAllTemporaryAdresses } from "../services/ValidatorRequests";
import { ValidateAddress } from "../services/ValidationAddressRequest";

const decision = {
    YorN: "",
    commentary: "",
    validatorID: 0,
    requestID: -1
}

export const infoJSON = {
    requestID: 0,
    id: 0,
    region: "",
    district: "",
    city: "",
    street: "",
    house: ""
}

export function ValidatorWindow() {

    const [selectedOption, setSelectedOption] = useState("");

    const [comment, setComment] = useState("")

    const [reqID, setReqID] = useState(-1)

    const [validationAdresses, setValidationAdresses] = useState<validationResponse[]>([]);

    
    useEffect(()=>{
    async function getValidationData(){
        const data = await GetAllTemporaryAdresses();
        setValidationAdresses(data);
        console.log(data);
    }
    getValidationData();
 
   },[]);


    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleClick = async (radio: string, comm: string) => {
        if(selectedOption === "option1"){
            decision.YorN = "Одобрено"
            console.log(selectedItem);
            ValidateAddress(selectedItem.street_id, selectedItem.house, selectedItem.id)
        }
        else {
            decision.YorN = "Отказано"
            let f:boolean = false;
            console.log("1")
            console.log(selectedItem)
            console.log("2")
            console.log(selectedItem.street_id)   
            
            console.log(comment)    
           if(await AddAddress(selectedItem.region, selectedItem.district, selectedItem.city, selectedItem.street, selectedItem.house, selectedItem.street_id, f ,comment,selectedItem.id))
           {
            alert("Успешно добавлено")
           }else{
            alert("Не добавлено")
            
           }
        }
        decision.commentary = comm
        decision.validatorID = 999
        decision.requestID = reqID
        setSelectedOption("")
        setSelectedItem(exampleValidationResponse)
        setReqID(-1)
        setComment("")
        alert(JSON.stringify(decision))
    }

    const [selectedItem, setSelectedItem] = useState<validationResponse>(exampleValidationResponse)

    return (
        <>
            <div className="background"/>
            <div className="window_validator">
                <div className="radioBtn">
                    <label className="radioLabel">
                        <input
                            className="btn_radio visually-hidden"
                            type="radio"
                            value="option1"
                            checked={selectedOption === "option1"}
                            onChange={handleOptionChange}
                            name="options"
                        />
                        <span className="customRadio"></span>
                        Да
                    </label>
                    <label className="radioLabel">
                        <input
                            className="btn_radio visually-hidden"
                            type="radio"
                            value="option2"
                            checked={selectedOption === "option2"}
                            onChange={handleOptionChange}
                            name="options"
                        />
                        <span className="customRadio"></span>
                        Нет
                    </label>
                </div>
                <button
                    disabled={selectedOption.length == 0 || reqID == -1}
                    className="button_save"
                    onClick={() => handleClick(selectedOption, comment)}
                >
                    Сохранить
                </button>
                <div className="get_infoJSON">
                    <Requests_for_validator
                        setRequestID={setReqID}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        list={validationAdresses}
                    />
                </div>
                <textarea
                    className="commentary"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                />
            </div>
        </>
    );
}