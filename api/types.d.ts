export interface message {
  id: string;
  text: string;
  author: string;
  datetime: string;
}

export type messageWithoutId = Omit<message, "id">