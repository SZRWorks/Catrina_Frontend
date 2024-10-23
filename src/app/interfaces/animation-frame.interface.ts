import { PartState } from "./socket-data.interface"


export interface Animation {
  id: number,
  title?: string,
  isPublic?: boolean,
  frames?: AnimationFrame[]
}

export interface AnimationFrame {
  id: number,
  minVelocity?: number,
  maxVelocity?: number,
  velocityCurve?: string,
  startDelay?: number,
  endDelay?: number,
  data?: PartState[]
}

