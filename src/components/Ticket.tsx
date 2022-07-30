import React, { useEffect } from 'react';
import { Card } from './Card';
import { useState } from 'react';
interface Props {
  onNext: () => void;
  passengers: string[];
  country: string;
}
export const Ticket = ({ onNext, passengers, country }: Props) => {
  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((state) => state - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card
      title="Gracias por Volar con nosotros 💜"
      onNext={onNext}
      body={
        <>
          <p aria-busy="true">Se cerrará en {countDown} segundos</p>
          <h6>Viajeros a {country}</h6>
          <ul>
            {passengers.map((passenger) => (
              <li key={passenger}>
                <cite>{passenger}</cite>
              </li>
            ))}
          </ul>
        </>
      }
    />
  );
};
