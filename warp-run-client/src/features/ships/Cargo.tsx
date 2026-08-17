import type { CargoItem } from "./types";

interface CargoProps {
    cargo: Array<CargoItem>;
}

function Cargo({ cargo }: CargoProps) {

    return (
        <ul>
            {cargo.map((cargoItem) => <li key={cargoItem.id}>{cargoItem.quantity} {cargoItem.resource.name}</li>)}
        </ul>
    );
}

export default Cargo;