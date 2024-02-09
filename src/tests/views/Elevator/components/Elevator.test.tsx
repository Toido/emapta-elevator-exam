import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import Elevator from 'src/views/Elevator/components/Elevator';
import { ElevatorState } from 'src/types/ElevatorTypes';

describe('Home view', () => {
  it('renders initial content', async () => {
    const mockProps = {
      id: 1,
      currentFloor: 1,
      state: ElevatorState.Moving,
      passengers: 1,
      destination: [
        {
          floor: 4,
          passenger: 1,
        },
      ],
    };

    const { getByTestId } = render(
      <Elevator
        id={mockProps.id}
        currentFloor={mockProps.currentFloor}
        state={mockProps.state}
        passengers={mockProps.passengers}
        destination={mockProps.destination}
      />,
    );

    const homeLabel = getByTestId('elevator');
    expect(homeLabel).toBeInTheDocument();
  });
});
