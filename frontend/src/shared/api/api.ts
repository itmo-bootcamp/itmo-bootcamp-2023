export const API_PATH = {
  SEND_LINK:  'api/link',
  GET_COURSES: 'api/courses',
} as const;

export const sendLink = (link: string) => {
  return fetch(API_PATH.SEND_LINK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ link }),
  }).then(res => res.json());
};
