export type MatrixOptions = {
  cellFunction?: (td, x, y, value) => string
  xDecreasing?: boolean
  yDecreasing?: boolean
  // eslint-disable-next-line camelcase
  set_x: any[]
  // eslint-disable-next-line camelcase
  set_y: any[]
}
