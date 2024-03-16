export const normalizeTemplateData = (data) => {
  const normalizedData = {
    name: data.name,
    description: data.description,
    exercises: data.exercises.map((exercise) => {
      return {
        ...exercise,
        sets: exercise.sets.map((set) => ({
          reps: Number(set.reps),
          weight: Number(set.weight),
        })),
      };
    }),
  };
  return normalizedData;
};
