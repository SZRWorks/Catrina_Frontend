
export enum PartType {
  Stepper,
  Servo
}

export interface PartState {
  id: string,
  value: number, // 0-100
  realValue: number // 0-100 Valor solo utilizado en frontend
}
