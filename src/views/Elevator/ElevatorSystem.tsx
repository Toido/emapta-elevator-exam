import { useState, useEffect } from 'react';
import Elevator from './components/Elevator';
import {
  CallRequest,
  Destination,
  Direction,
  ElevatorState,
} from 'src/types/ElevatorTypes';
import './styles.css';

// Constants
const NUM_FLOORS = 10;
const NUM_ELEVATORS = 4;
const FLOOR_TRAVEL_TIME = 5000; // 10 seconds in milliseconds
const STOP_TIME = 5000; // 10 seconds in milliseconds
const CLOSE_DISTANCE = 2;

const ElevatorSystem = () => {
  const [elevators, setElevators] = useState<
    Array<{
      id: number;
      currentFloor: number;
      state: ElevatorState;
      destination: Destination[];
      passengers: number;
    }>
  >(
    new Array(NUM_ELEVATORS).fill(null).map((_, index) => {
      return {
        id: index + 1,
        currentFloor: 1,
        state: ElevatorState.Idle,
        destination: [{ floor: 1, passenger: 0 }],
        passengers: 0,
      };
    }),
  );

  const [callRequests, setCallRequests] = useState<Array<CallRequest>>([]);

  useEffect(() => {
    const unloadPassengers = (
      elevator: Elevator,
      passengersToUnload: Destination,
    ) => {
      elevator.passengers = elevator.passengers - passengersToUnload.passenger;
      return elevator;
    };

    const handleElevator = () => {
      // Handle elevator movement
      const updatedElevators = elevators.map(elevator => {
        const isCurrentFloorInDestinationArr = elevator.destination.findIndex(
          item => item.floor === elevator.currentFloor,
        );
        if (elevator.state === ElevatorState.Moving) {
          //convert destination into destination queue
          if (elevator.currentFloor < elevator.destination[0].floor) {
            if (isCurrentFloorInDestinationArr !== -1) {
              const passengersToUnload =
                elevator.destination[isCurrentFloorInDestinationArr];
              elevator = unloadPassengers(elevator, passengersToUnload);
            }
            elevator.currentFloor++;
          } else if (elevator.currentFloor > elevator.destination[0].floor) {
            if (isCurrentFloorInDestinationArr !== -1) {
              const passengersToUnload =
                elevator.destination[isCurrentFloorInDestinationArr];
              elevator = unloadPassengers(elevator, passengersToUnload);
            }
            elevator.currentFloor--;
          } else {
            elevator.state = ElevatorState.Stopped;
          }
        } else if (elevator.state === ElevatorState.Stopped) {
          elevator.state = ElevatorState.Idle;
        }
        return elevator;
      });

      // Handle elevator call requests
      if (callRequests.length > 0) {
        const updatedCallRequests = [...callRequests];
        for (let i = 0; i < updatedElevators.length; i++) {
          const elevator = updatedElevators[i];
          if (elevator.state === ElevatorState.Moving) {
            const closestFloor = elevator.destination[0].floor;
            console.log({ closestFloor });

            const request = updatedCallRequests.find(req =>
              req.direction === Direction.Up
                ? req.floor > closestFloor
                : req.floor < closestFloor,
            );
            if (
              request &&
              Math.abs(closestFloor - request.floor) <= CLOSE_DISTANCE
            ) {
              updatedElevators[i].destination.push({
                floor: request.floor,
                passenger: request.passengers,
              });
              updatedElevators[i].state = ElevatorState.Moving;
              updatedElevators[i].passengers =
                updatedElevators[i].passengers + request.passengers;
              updatedCallRequests.splice(
                updatedCallRequests.indexOf(request),
                1,
              );
            }
          } else if (elevator.state === ElevatorState.Idle) {
            const request = updatedCallRequests.shift();
            if (request) {
              updatedElevators[i].destination = [
                { floor: request.floor, passenger: request.passengers },
              ];
              updatedElevators[i].state = ElevatorState.Moving;
              updatedElevators[i].passengers = request.passengers;
            }
          }
        }

        setElevators(updatedElevators);
        setCallRequests(updatedCallRequests);
      }
    };

    const interval = setInterval(() => {
      handleElevator();
    }, FLOOR_TRAVEL_TIME);

    return () => clearInterval(interval);
  }, [elevators, callRequests]);

  // Generate random elevator call requests
  useEffect(() => {
    const generateRandomCall = () => {
      const floor = Math.floor(Math.random() * NUM_FLOORS) + 1;
      const direction = Math.random() > 0.5 ? Direction.Up : Direction.Down;
      const passengers = Math.floor(Math.random() * NUM_FLOORS) + 1;
      setCallRequests(prevRequests => [
        ...prevRequests,
        { floor, direction, passengers },
      ]);
    };

    const interval = setInterval(() => {
      generateRandomCall();
    }, FLOOR_TRAVEL_TIME + STOP_TIME);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h2 className="header">Elevator System</h2>
      <div className="grid-container">
        {elevators.map((elevator, index) => (
          <Elevator
            key={index}
            id={index + 1}
            currentFloor={elevator.currentFloor}
            state={elevator.state}
            passengers={elevator.passengers}
            destination={elevator.destination}
          />
        ))}
      </div>
    </div>
  );
};

export default ElevatorSystem;
