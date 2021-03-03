import { render } from '@testing-library/react';
import App from './App';

// Check if iphone frame mounts correctly 

test('check counter', ()=> {
    const { getByTestId } = render(<App />);
    const iphone = getByTestId("iphone");
    expect(iphone).toBeInTheDocument();
});