import type { ShipData } from "./types/ship";

interface ShipProps {
    shipData: ShipData
}

function Ship({ shipData } : ShipProps) {

    return (
        <div className="ship-wrapper">
            <h3>{shipData.name}</h3>
            <p>{shipData.currentPlanet?.name ?? "Null"} - {shipData.destinationPlanet?.name ?? "Null"}</p>
        </div>
    );
}

export default Ship;