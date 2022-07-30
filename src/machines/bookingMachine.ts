import { assign, createMachine } from 'xstate';
import { Country } from '../interfaces';
import { fetchCountries } from '../utils/api';

export const bookingMachine = createMachine(
  {
    id: 'booking',
    initial: 'initial',
    context: {
      passengers: [] as string[],
      selectedCountry: '',
      countries: [] as Country[],
      error: '',
    },
    states: {
      initial: {
        on: {
          START: {
            target: 'search',
            actions: 'printWelcome',
          },
        },
      },

      search: {
        on: {
          CONTINUE: {
            target: 'passenger',
            actions: 'addCountrySelect',
          },
          CANCEl: 'initial',
        },
        //
        initial: 'loading',
        states: {
          loading: {
            invoke: {
              id: 'fetchCountries',
              src: () => fetchCountries(),
              onDone: {
                target: 'success',
                actions: 'setCountries',
              },

              onError: {
                target: 'error',
                actions: 'setError',
              },
            },
          },

          success: {},

          error: {
            on: {
              RETRY: {
                target: 'loading',
              },
            },
          },
        },
      },

      passenger: {
        on: {
          DONE: {
            target: 'ticket',
            cond: 'moreThanOnePassenger',
          },
          CANCEl: {
            target: 'initial',
            actions: 'cleanContext',
          },
          ADD: {
            target: 'passenger',
            actions: 'addPassenger',
          },
        },
      },
      ticket: {
        after: {
          5000: {
            target: 'initial',
            actions: 'cleanContext',
          },
        },
        on: {
          FINISH: {
            target: 'initial',
            actions: 'cleanContext',
          },
        },
      },
    },
  },
  {
    actions: {
      printWelcome: () => console.log('Welcome to the booking system'),
      addCountrySelect: assign({
        selectedCountry: (context, event: any) => event.selectedCountry,
      }),
      addPassenger: assign((context, event: any) => {
        context.passengers.push(event.passenger);
        return context;
      }),

      cleanContext: assign((context) => {
        context.passengers = [];
        context.selectedCountry = '';
        return context;
      }),

      setCountries: assign((context, event: any) => {
        context.countries = event.data;
        return context;
      }),

      setError: assign((context, event: any) => {
        context.error = event.data;
        return context;
      }),
    },

    guards: {
      moreThanOnePassenger: (context) => context.passengers.length > 0,
    },
  }
);
