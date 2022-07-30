import { Card } from './Card';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Country } from '../interfaces';
interface Props {
  onCancel: () => void;
  onNext: (s: string) => void;
  countries: Country[];
}

export const Search = ({ onCancel, onNext, countries }: Props) => {
  const [flight, setFlight] = useState('');
  return (
    <Card
      title="Escoje tu destino"
      onCancel={onCancel}
      onNext={() => {
        if (flight) {
          onNext(flight);
        } else {
          toast('Seleccione una opción', {
            type: 'error',
          });
        }
      }}
      body={
        <>
          <select onChange={(e) => setFlight(e.target.value)} value={flight}>
            <option value="" disabled>
              Escoge un país
            </option>
            {countries.map((country) => (
              <option key={country.common} value={country.common}>
                {country.common}
              </option>
            ))}
          </select>
        </>
      }
    />
  );
};
