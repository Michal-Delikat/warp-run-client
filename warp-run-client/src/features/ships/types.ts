export interface CargoItem {
    id: string;
    quantity: number;
    resource: {
        id: string;
        name: string;
    }
}

export interface ShipData {
    id: string;
    name: string;
    currentPlanet: { id: string; name: string; } | null;
    departurePlanet: { name: string } | null;
    destinationPlanet: { name: string } | null;
    arrivalAt: any;
    fuel: number;
    cargoCapacity: number;
    cargo: Array<CargoItem>;
}

export interface TradeOptionData {
    id: string;
    price: number;
    stock: number;
    resource: {
        id: string;
        name: string;
    };
}