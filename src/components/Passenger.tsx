import confetti from 'canvas-confetti';
import { FormEvent, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Card } from './Card';

interface Props {
  onNext: (type: string, passenger?: string) => void;
  onCancel: () => void;
  passengers: string[];
}
export const Passenger = ({ onCancel, onNext, passengers }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current!.focus();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passenger = inputRef.current!.value;
    if (passenger) {
      onNext('ADD', passenger);
      inputRef.current!.select();
      toast.success('Pasajero agregado');
    } else {
      toast.error('Ingrese un nombre');
    }
  };

  const handleNext = () => {
    if (passengers.length > 0) {
      onNext('DONE');
      confetti({
        particleCount: 200,
      });
    } else {
      inputRef.current!.focus();
      toast.error('Ingrese al menos un pasajero');
    }
  };

  return (
    <Card
      onCancel={onCancel}
      onNext={handleNext}
      title="Registro de pasajeros"
      body={
        <form onSubmit={handleSubmit}>
          <label htmlFor="passenger">
            Presione enter para agregar un nuevo pasajero
            <input type="text" ref={inputRef} id="passenger" />
          </label>
        </form>
      }
    />
  );
};
