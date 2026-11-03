// Supplied starter data - never mutated anywhere in the app.
export const routes = [
  { id: 'R1', mode: 'Minibus Taxi', from: 'Soweto', to: 'Johannesburg CBD', fare: 24, status: 'Operating' },
  { id: 'R2', mode: 'Rea Vaya', from: 'Thokoza Park', to: 'Park Station', fare: 18, status: 'Delayed' },
  { id: 'R3', mode: 'Gautrain', from: 'Park Station', to: 'Sandton', fare: 38, status: 'Operating' },
  { id: 'R4', mode: 'Metrobus', from: 'Braamfontein', to: 'Rosebank', fare: 21, status: 'Operating' },
];

// Filter categories shown as chips. Each transport mode belongs to one category.
export const FILTERS = ['All', 'Taxi', 'Bus/BRT', 'Rail'];

const MODE_CATEGORY = {
  'Minibus Taxi': 'Taxi',
  'Rea Vaya': 'Bus/BRT',
  Metrobus: 'Bus/BRT',
  Gautrain: 'Rail',
};

export const categoryOf = (mode) => MODE_CATEGORY[mode] || 'Other';
