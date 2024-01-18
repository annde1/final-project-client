export const calculateBMI = (heightInCm, weightInKg) => {
  const heightInMeters = heightInCm / 100;
  const bmi = weightInKg / (heightInMeters * heightInMeters);
  let valueRange;
  if (bmi < 18.5) {
    valueRange = "Underweight";
  } else if (bmi <= 24.9 && bmi >= 18.5) {
    valueRange = "Normal Weight";
  } else if (bmi <= 25 && bmi >= 29.9) {
    valueRange = "Overweight";
  } else if (bmi >= 30) {
    valueRange = "Obesity";
  }
  return {
    bmiValue: bmi.toFixed(2),
    range: valueRange,
  };
};
