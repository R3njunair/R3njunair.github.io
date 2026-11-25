export type Certification = {
  name: string;
  issuer?: string;
};

export const certifications: Certification[] = [
  { name: 'ISTQB® Certified Tester, Foundation Level (CTFL)', issuer: 'iSQI' },
  { name: 'Game Design Foundations 1: Ideas, Core Loops, and Goals' },
  { name: 'Game Design Foundations 2: Systems, Chance, and Strategy' },
  { name: '2D Game Design and Development Essential Training' },
  { name: 'Learning Unity 2D Scripting' },
];

export const education = {
  institution: 'Noorul Islam University, India',
  credential: 'B.Tech, Information Technology',
  year: '2015',
};
