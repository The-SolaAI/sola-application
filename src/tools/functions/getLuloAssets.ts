const functionDescription =
  'Call this function when the user wants view his Lulo assets. Do not call this more than once in 5 secs, U HAVE TO REMEMBER THIS';

export const getLuloAssets = {
  type: 'function',
  name: 'getLuloAssets',
  description: functionDescription,
  parameters: {
    type: 'object',
    strict: true,
    properties: {},
  },
};

//TODO: Shift the trigger logic here from conversation.tsx
export function getLuloAssetsFunction() {
  
}
