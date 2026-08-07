import { useRef } from 'react';
import './OTPinput.css';

const OTPinput = ({ length = 6, value, onChange }) => {
  const refs = useRef([]);

  const handleChange = (index, event) => {
    const nextValue = event.target.value.replace(/\D/g, '').slice(-1);
    const updated = value.split('');
    updated[index] = nextValue;
    onChange(updated.join(''));

    if (nextValue && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !value[index] && index > 0) {
      const updated = value.split('');
      updated[index - 1] = '';
      onChange(updated.join(''));
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="otp-group">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(element) => {
            refs.current[index] = element;
          }}
          value={value[index] || ''}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          maxLength="1"
          className="otp-box"
          inputMode="numeric"
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
};

export default OTPinput;
