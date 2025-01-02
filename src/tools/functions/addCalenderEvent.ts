// import { addEventToCalendar } from '../../pages/Settings';
import { EventDetails } from '../../types/eventDetails';

const functionDescription =
  'Call this function when the user wants to add an event to his calender.';

export const addCalenderEvent = {
  type: 'function',
  name: 'addCalenderEvent',
  description: functionDescription,
  parameters: {
    type: 'object',
    strict: true,
    properties: {
        summary: {
          type: 'string',
          description: 'Title for the event.',
        },
        description: {
          type: 'string',
          description: 'Description about the event.',
        },
        dateTime: {
          type: 'string',
          description: 'The starting date time of the event.',
        },
        timeZone: {
          type: 'string',
          description: 'The timezone for the dateTime specified.',
        },
    },
    required: ['summary', 'description', 'dateTime', 'timeZone'], 
  },
};

//TODO : Use different logic for adding events to calender
export async function addCalenderEventFunction() {
    // const eventDetails: EventDetails = {
    //   summary: summary,
    //   description: description,
    //   start: {
    //     dateTime: dateTime,
    //     timeZone: timeZone,
    //   },
    // };

  // addEventToCalendar('');
  return;
}
