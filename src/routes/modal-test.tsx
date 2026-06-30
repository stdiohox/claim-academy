import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/modal-test')({
  component: ModalTest,
});

function ModalTest() {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!open) return;
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('keydown', () => {
        console.time('keypress-to-render');
      });
      input.addEventListener('input', () => {
        setTimeout(() => {
          console.timeEnd('keypress-to-render');
        }, 0);
      });
    });
  }, [open]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Modal Freeze Test</h1>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      {open && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 9999
        }}>
          <div style={{
            background: '#fff', padding: '2rem',
            borderRadius: '12px', width: '400px'
          }}>
            <h2>Test Form</h2>
            <div>
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ display: 'block', width: '100%',
                  padding: '0.5rem', marginBottom: '1rem',
                  border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ display: 'block', width: '100%',
                  padding: '0.5rem', marginBottom: '1rem',
                  border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            <p>First Name value: {firstName}</p>
            <p>Email value: {email}</p>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
