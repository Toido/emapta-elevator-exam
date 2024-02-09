import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import ElevatorSystem from 'src/views/Elevator/ElevatorSystem';

describe('Home view', () => {
  it('renders initial content', async () => {
    const { getByText } = render(<ElevatorSystem />);

    const homeLabel = getByText('Elevator System');
    expect(homeLabel).toBeInTheDocument();
  });
});
