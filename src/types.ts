export interface Subject {
  name: string;
  credit: string;
  mark: string;
}

export interface Term {
  subjects: Subject[];
}
