export interface CargoItem {
    id: string;
    quantity: number;
    resource: {
        name: string;
    }
}

export interface ShipData {
    id: string;
    name: string;
    currentPlanet: { id: string; name: string; } | null;
    destinationPlanet: { name: string } | null;
    arrivalAt: any;
    fuel: number;
    cargoCapacity: number;
    cargo: Array<CargoItem>;
}

export interface TradeOptionData {
    id: string;
    price: number;
    resource: {
        id: string;
        name: string;
    };
}