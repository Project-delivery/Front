import { regionModel, Regions } from "../imports_for_output/regions_array";
import { districtModel, districts } from "../imports_for_output/districts_array";
import { cities, cityModel } from "../imports_for_output/cities_array";
import { streetModel, streets } from "../imports_for_output/streets_array";
import { houseModel, houses } from "../imports_for_output/houses_array";
import GetRegionsRequest, { AddressRequest, GetCitiesByIdRequest, GetDistrictsByIdRequest, GetHousesByIdRequest, GetStreetsByIdRequest } from "./AddressesServiceRequest";


export async function GetRegions():Promise<regionModel[]>
{
        // const response = await GetRegionsRequest();
        // response
        // if(response.ok)
        // {
        // const data:regionModel[] = await response.json();
        // return data; 
        // }else{
        //     alert(response.status)
        //     //возможно здесь нужно сделать проверку на роль
        //     // пока не знаю как это оформить
        //     return [];
        // }
        return await Regions;
} 

export async function GetDistrictsById(idRegion:number):Promise<districtModel[]>
{
    //  const response = await GetDistrictsByIdRequest(idRegion);
    //  if(response.ok)
    //  {
    //  let data:districtModel[] = await response.json();
    //  return data; 
    //  }else{
        
    //     alert(response.status)
    //      return [];
    //  }
    return await districts;
} 
export async function GetCitiesById(idDistrict:number):Promise<cityModel[]>
{
    // const response = await GetCitiesByIdRequest(idDistrict);
    // if(response.ok)
    // {
    // let data:cityModel[] = await response.json();
    // return data; 
    // }else{
        
    //     alert(response.status)
    //     return [];
    // }
    return await cities;
} 
export async function GetStreetsById(idCity:number):Promise<streetModel[]>
{
    // const response = await GetStreetsByIdRequest(idCity);
    // if(response.ok)
    // {
    // let data:streetModel[] = await response.json();
    // return data; 
    // }else{
        
    //     alert(response.status)
    //     return [];
    // }
    return await streets;
} 
export async function GetHousesById(idStreet:number):Promise<houseModel[]>
{
    // const response = await GetHousesByIdRequest(idStreet);
    // if(response.ok)
    // {
    // let data:houseModel[] = await response.json();
    // return data; 
    // }else{
        
    //     alert(response.status)
    //     return [];
    // }
    return await houses;
} 