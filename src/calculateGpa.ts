import { getGradePointFromMark } from "./grades";
import { Term } from "./types";

export default function calculateGpa(terms: Term[]) {
  let sum = 0,
    creditSum = 0;
  terms.forEach((term) => {
    term.subjects.forEach((subject) => {
      if (
        !isNaN(parseFloat(subject.mark)) &&
        !isNaN(parseFloat(subject.credit))
      ) {
        const gradePoint = getGradePointFromMark(parseFloat(subject.mark));
        sum += parseFloat(subject.credit) * gradePoint;
        creditSum += parseFloat(subject.credit);
      }
    });
  });

  if (creditSum === 0) {
    return undefined;
  }

  return sum / creditSum;
}
