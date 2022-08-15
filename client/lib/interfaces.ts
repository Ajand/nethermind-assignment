export interface InputCalculation {
  value: string;
  lastProcessedNonce: string;
  resultNonce: string;
  status: string;
  jobId: string;
}

export interface Worker {
  id: string;
  status: string;
  jobId: string | null;
  input: InputCalculation;
}
