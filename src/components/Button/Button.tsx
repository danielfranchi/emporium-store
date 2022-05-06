import React from 'react';
import './Button.css';

interface TextButton {
  text: string;
  onClick?: any;
}

const Button = ({ text, onClick }: TextButton) => {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
