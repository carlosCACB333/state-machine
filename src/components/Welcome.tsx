import { Card } from './Card';

interface Props {
  onNext: () => void;
}

export const Welcome = ({ onNext }: Props) => {
  return (
    <Card
      title="¡Hoy es el día!"
      body={
        <>
          <h6>
            Compra tu vuelo y conoce un nuevo rincón del mundo, con una nueva experiencia de viaje. Te va a sorprender
            las maravillas que hay en el mundo.
          </h6>
        </>
      }
      onNext={onNext}
    />
  );
};
