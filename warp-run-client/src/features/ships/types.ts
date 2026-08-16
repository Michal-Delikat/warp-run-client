export interface ShipData {
    id: string;
    name: string;
    currentPlanet: { id: string; name: string; } | null;
    destinationPlanet: { name: string } | null;
    arrivalAt: any
}