import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/bare-test')({
  component: BareTest,
});

function BareTest() {
  const [value, setValue] = useState('');
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bare React Test</h1>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ padding: '1rem', fontSize: '1.2rem', width: '300px' }}
      />
      <p>You typed: {value}</p>
    </div>
  );
}
