export interface ShipData {
    id: string;
    name: string;
    currentPlanet: { name: string } | null;
    destinationPlanet: { name: string } | null;
}