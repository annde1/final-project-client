const calculateDuration = (startedAt) => {
  const now = new Date();
  const started = new Date(startedAt);
  const timeInMs = now - started;
  console.log(timeInMs);
  return timeInMs;
};
export const normalizeWorkout = (data) => {
  console.log(data.startedAt);
  const normalizedWorkout = {
    title: data.title, // Corrected property name
    createdAt: new Date(),
    //TODO: replace this
    duration: calculateDuration(data.startedAt),
    template: {
      name: data.template.name,
      exercises: data.template.exercises.map((exercise) => {
        return {
          ...exercise,
          sets: exercise.sets.map((set) => ({
            ...set,
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
