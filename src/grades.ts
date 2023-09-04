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
