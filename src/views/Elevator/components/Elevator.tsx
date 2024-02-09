import { Elevator } from 'src/types/ElevatorTypes';
import '../styles.css';

const Elevator = ({
  id,
  currentFloor,
  state,
  passengers,
  destination,
}: Elevator) => {
  return (
    <div className="grid-items" data-testid="elevator">
      <h3>Elevator {id}</h3>
      <p>Current Floor: {currentFloor}</p>
      <p>Destination Floor: {destination[0].floor}</p>
      <p>State: {state}</p>
      <p>Passengers: {passengers}</p>
    </div>
  );
};

export default Elevator;
