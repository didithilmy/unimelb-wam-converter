export enum Grade {
  H1 = "H1",
  H2A = "H2A",
  H2B = "H2B",
  H3 = "H3",
  P = "P",
  N = "N",
}

export default function getGradeFromMark(mark?: number) {
  if (mark === undefined) {
    return;
  }

  if (mark >= 80) {
    return Grade.H1;
  } else if (mark >= 75) {
    return Grade.H2A;
  } else if (mark >= 70) {
    return Grade.H2B;
  } else if (mark >= 65) {
    return Grade.H3;
  } else if (mark >= 50) {
    return Grade.P;
  } else {
    return Grade.N;
  }
}

export function getGradePointFromGrade(grade?: Grade) {
  switch (grade) {
    case Grade.H1:
      return 4;
    case Grade.H2A:
      return 3.7;
    case Grade.H2B:
      return 3.3;
    case Grade.H3:
      return 3;
    case Grade.P:
      return 2;
    default:
      return 0;
  }
}

export function getGradePointFromMark(mark?: number) {
  const grade = getGradeFromMark(mark);
  return getGradePointFromGrade(grade);
}
