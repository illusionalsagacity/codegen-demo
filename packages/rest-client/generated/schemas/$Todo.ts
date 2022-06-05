/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Todo = {
  description: `A todo`,
  properties: {
    id: {
      type: 'string',
      isRequired: true,
      format: 'uuid',
    },
    title: {
      type: 'string',
      isRequired: true,
    },
    notes: {
      type: 'string',
      isRequired: true,
    },
  },
} as const;
