export interface Destination {
  floor: number;
  passenger: number;
}

export enum ElevatorState {
  Idle = 'IDLE',
  Moving = 'MOVING',
  Stopped = 'STOPPED',
}

export enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  None = 'NONE',
}

export interface Elevator {
  id: number;
  currentFloor: number;
  state: ElevatorState;
  passengers: number;
  destination: Destination[];
}

export interface CallRequest {
  floor: number;
  direction: Direction;
  passengers: number;
}
