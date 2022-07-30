import { useMachine } from '@xstate/react';
import { ToastContainer } from 'react-toastify';
import { Layout, Passenger, Search, Ticket, Welcome } from './components';
import { bookingMachine } from './machines';

function App() {
  const [state, send] = useMachine(bookingMachine);
  const onCancel = () => send('CANCEl');

  const renderElement = () => {
    if (state.matches('initial')) {
      return <Welcome onNext={() => send('START')} />;
    }

    if (state.matches('search')) {
      return (
        <Search
          countries={state.context.countries}
          onCancel={onCancel}
          onNext={(selected: string) => send('CONTINUE', { selectedCountry: selected })}
        />
      );
    }

    if (state.matches('passenger')) {
      return (
        <Passenger
          passengers={state.context.passengers}
          onCancel={onCancel}
          onNext={(type: string, passenger) => send(type, { passenger })}
        />
      );
    }

    if (state.matches('ticket')) {
      return (
        <Ticket
          country={state.context.selectedCountry}
          passengers={state.context.passengers}
          onNext={() => send('FINISH')}
        />
      );
    }

    return <p>No match</p>;
  };

  console.log(state.context);

  return (
    <div className="App">
      <ToastContainer theme="dark" />
      <Layout>{renderElement()}</Layout>
    </div>
  );
}

export default App;
