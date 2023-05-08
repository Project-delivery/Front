export interface regionModel {
    id: number;
    region: string;
}


// Этот массив должен получаться запросом с бэка
export let list_of_cities: regionModel[] =  [{
    id: 1,
    region: "Minsk"
}, {
    id: 2,
    region: "Minnesota"
}, {
    id: 3,
    region: "Toronto"
}, {
    id: 4,
    region: "Ottawa"
}, {
    id: 5,
    region: "Chicago"
}, {
    id: 6,
    region: "Washington"
}, {
    id: 7,
    region: "Illinois"
}, {
    id: 8,
    region: "Sydney"
}, {
    id: 9,
    region: "New-York"
}]