import {
  toRadians,
  toDegrees,
  dist,
  bearing,
  destPt
} from '../src/utils'

describe('toRadians()', () => {
  it('converts 0˚ to 0 rad', () => {
    expect(toRadians(0)).toBeCloseTo(0.0)
  })

  it('converts 30˚ to ~0.52 rad', () => {
    expect(toRadians(30)).toBeCloseTo(0.5235987756)
  })

  it('converts 150˚ to ~2.62 rad', () => {
    expect(toRadians(150)).toBeCloseTo(2.6179938780)
  })

  it('converts 360˚ to ~6.28 rad', () => {
    expect(toRadians(360)).toBeCloseTo(6.2831853072)
  })

  it('converts position degree array to rad array', () => {
    expect(toRadians([0,0]).length).toBe(2)
  })
})

describe('toDegrees()', () => {
  it('converts 0 rad to 0˚', () => {
    expect(toDegrees(0)).toBeCloseTo(0.0)
  })

  it('converts ~0.52 rad to 30˚', () => {
    expect(toDegrees(0.5235987756)).toBeCloseTo(30.0)
  })

  it('converts ~1.05 rad to 60˚', () => {
    expect(toDegrees(1.0471975512)).toBeCloseTo(60.0)
  })

  it('converts ~6.28 rad to 360˚', () => {
    expect(toDegrees(6.2831853072)).toBeCloseTo(360)
  })

  it('converts position degree array to rad array', () => {
    expect(toDegrees([0,0]).length).toBe(2)
  })
})

describe('dist()', () => {
  it('dist from [51.525363, -0.077471] to [51.465894, -0.169048] ', () => {
    expect(Math.round(dist([51.525363, -0.077471], [51.465894, -0.169048]))).toBeCloseTo(9.161e3)
  })
})

describe('bearing()', () => {
  it('bearing from [51.525363, -0.077471] to [51.465894, -0.169048] ', () => {
    expect(Math.round(bearing([51.525363, -0.077471], [51.465894, -0.169048]))).toBeCloseTo(224)
  })
})
