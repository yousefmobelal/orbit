export const queryKeys = {
  themes: ["themes"],
  currentUser: ["currentUser"],
  planets: ["planets"],
  planet: (id: string) => ["planet", id],
  tasks: (planetId: string) => ["tasks", planetId],
};
