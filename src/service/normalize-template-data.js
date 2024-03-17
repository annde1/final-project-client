export const normalizeTemplateData = (data) => {
  const normalizedData = {
    name: data.name?.trim(),
    description: data.description?.trim(),
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
