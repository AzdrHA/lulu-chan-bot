interface FetchImageError {
  response: { statusCode: number; message: string };
  status: number;
  message: string;
  name: string;
}

export interface Image extends Partial<FetchImageError> {
  name: string;
  url: string;
}
