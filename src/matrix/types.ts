export type MatrixOptions = {
  cellFunction?: (td, x, y, value) => string
  xDecreasing?: boolean
  yDecreasing?: boolean

  set_x: any[]

  set_y: any[]
}
