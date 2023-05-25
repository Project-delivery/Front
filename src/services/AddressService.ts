import { regionModel } from "../imports_for_output/regions_array";
import { districtModel } from "../imports_for_output/districts_array";
import { cityModel } from "../imports_for_output/cities_array";
import { streetModel } from "../imports_for_output/streets_array";
import { houseModel } from "../imports_for_output/houses_array";
import GetRegionsRequest, {  GetCitiesByIdRequest, GetDistrictsByIdRequest, GetHousesByIdRequest, GetStreetsByIdRequest } from "./AddressesServiceRequest";
import {useNavigate} from "react-router-dom";

export async function GetRegions():Promise<regionModel[]>
{

    const navigate = useNavigate()
        const response = await GetRegionsRequest();
        const data:regionModel[] = await response.json();
    if(response.status == 401)
    {
        navigate("/")
        sessionStorage.removeItem("role")
    }
    return data

} 

export async function GetDistrictsById(idRegion:number):Promise<districtModel[]>
{
    console.log("checking")
     const response = await GetDistrictsByIdRequest(idRegion);
     if(response.ok)
     {
     let data:districtModel[] = await response.json();
     return data; 
     }else{
        
        alert(response.status)
         return [];
     }

} 
export async function GetCitiesById(idDistrict:number):Promise<cityModel[]>
{
    const response = await GetCitiesByIdRequest(idDistrict);
    if(response.ok)
    {
    let data:cityModel[] = await response.json();
    return data; 
    }else{
        
        alert(response.status)
        return [];
    }
 
} 
export async function GetStreetsById(idCity:number):Promise<streetModel[]>
{
    const response = await GetStreetsByIdRequest(idCity);
    if(response.ok)
    {
    let data:streetModel[] = await response.json();
    return data; 
    }else{
        
        alert(response.status)
        return [];
    }

} 
export async function GetHousesById(idStreet:number):Promise<houseModel[]>
{
    const response = await GetHousesByIdRequest(idStreet);
    if(response.ok)
    {
    let data:houseModel[] = await response.json();
    return data; 
    }else{
        
        alert(response.status)
        return [];
    }

} 