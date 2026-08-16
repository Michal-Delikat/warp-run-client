import type { ShipData } from "./types";
import Countdown from './Countdown';
import TravelControls from './TravelControls';
import TradeControls from './TradeControls';

interface ShipProps {
    shipData: ShipData
}

function Ship({ shipData } : ShipProps) {    
    const isInTransit = shipData.destinationPlanet !== null;

    return (
        <div className="ship-wrapper">
            <h3>{shipData.name}</h3>
            {isInTransit  && <p>{shipData.currentPlanet?.name ?? "Null"} {'=>'} {shipData.destinationPlanet?.name ?? "Null"}</p>}
            {isInTransit  && <p>Arrival in: <Countdown arrivalAt={shipData.arrivalAt} /></p>}
            {!isInTransit && <p>Currently at: {shipData.currentPlanet?.name}</p>}
            <p>Fuel: {shipData.fuel}</p>
            <p>Cargo 0/{shipData.cargoCapacity}</p>
            {!isInTransit && <TradeControls currentPlanetId={shipData.currentPlanet?.id}/>}
            {!isInTransit && <TravelControls shipId={shipData.id} currentPlanetId={shipData.currentPlanet?.id}/>}
        </div>
    );
}

export default Ship;