import type { CargoItem } from "./types";

interface CargoProps {
    cargo: Array<CargoItem>;
    cargoCapacity: number;
}

function Cargo({ cargo, cargoCapacity }: CargoProps) {

    return (
        <>
            <h4>Cargo</h4>
            <p>Max cargo capacity: {cargoCapacity}</p>
            <ul>
                {cargo.map((cargoItem) => <li key={cargoItem.id}>{cargoItem.quantity} {cargoItem.resource.name}</li>)}
            </ul>
        </>
    );
}

export default Cargo;