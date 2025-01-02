const functionDescription =
  'Call this function when the user wants to play games or use blinks.';

export const getBlinks = {
  type: 'function',
  name: 'getBlinks',
  description: functionDescription,
  parameters: {
    type: 'object',
    strict: true,
    properties: {
      actionName: {
        type: 'string',
        enum: ['coinflip', 'snake'],
        description: 'The game or blink action that the user wants to perform.',
      },
    },
    required: ['actionName'],
  },
};

//TODO: Shift the logic here from conversation.tsx
export function getBlinksFunction({ action }: { action: 'open' | 'close' }) {

}