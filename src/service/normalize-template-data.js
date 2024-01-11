export const normalizeTemplateData = (data) => {
  const normalizedData = {
    name: data.name,
    exercises: data.exercises.map((exercise) => {
      return {
        ...exercise,
        sets: exercise.sets.map((set) => ({
          ...set,
          reps: Number(set.reps),
          weight: Number(set.weight),
        })),
      };
    }),
  };
  return normalizedData;
};
