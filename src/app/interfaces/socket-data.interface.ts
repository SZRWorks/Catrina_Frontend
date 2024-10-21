
export enum PartType {
  Stepper,
  Servo
}

export interface PartState {
  partID: string,
  partType: PartType,
  value: number // 0-100
}
