import React from 'react';
interface Props {
  body: React.ReactNode;
  onCancel?: () => void;
  onNext?: () => void;
  title: string;
}
export const Card = ({ onCancel, body, onNext, title }: Props) => {
  return (
    <article>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Book a Fly 🛩️</h3>
        {onCancel && (
          <button className="outline" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </header>
      <h1
        style={{
          textAlign: 'center',
        }}
      >
        {title}
      </h1>

      <blockquote>{body}</blockquote>
      <div style={{ marginTop: 48, display: 'flex', justifyContent: 'end' }}>
        {onNext && <button onClick={onNext}>Continuar</button>}
      </div>
    </article>
  );
};
