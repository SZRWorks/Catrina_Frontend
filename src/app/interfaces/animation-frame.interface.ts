
export interface Animation {
  id: number,
  title: string,
  public: boolean,
  frames: AnimationFrame[]
}

export interface AnimationFrame {
  id: number,
  minVelocity: number,
  maxVelocity: number,
  startDelay: number,
  endDelay: number,
}
