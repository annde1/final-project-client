const timeToMinutes = (hours, minutes, seconds) => {
  return hours * 60 + minutes + seconds / 60;
};
export const normalizeWorkout = (data) => {
  const { hours, minutes, seconds } = data.duration;

  const normalizedWorkout = {
    title: data.title, // Corrected property name
    createdAt: new Date(),
    //TODO: replace this
    duration: timeToMinutes(hours, minutes, seconds),
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
