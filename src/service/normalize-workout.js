const calculateDuration = (startedAt) => {
  const now = new Date();
  const started = new Date(startedAt);
  const timeInMs = now - started;
  return timeInMs;
};
export const normalizeWorkout = (data) => {
  const normalizedWorkout = {
    title: data.title,
    createdAt: new Date(),
    duration: calculateDuration(data.startedAt),
    template: {
      name: data.template.name,
      exercises: data.template.exercises
        .filter((exercise) => exercise.sets.some((set) => set.done))
        .map((exercise) => {
          return {
            ...exercise,
            sets: exercise.sets
              .filter((set) => set.done)
              .map((set) => ({
                reps: Number(set.reps),
                weight: Number(set.weight),
              })),
          };
        }),
    },
    volume: data.volume,
  };

  return normalizedWorkout;
};
