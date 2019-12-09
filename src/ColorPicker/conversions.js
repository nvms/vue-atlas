/**
 * the hue value H runs from 0 to 360 degrees. the saturation
 * S is the degree of strength or purity and is from 0 to 1.
 * purity is how much white is added to the color, so S=1 makes
 * the purest color (no white). brightness B ranges from 0 to 1,
 * where 0 is black.
 */
export const rgbToHsb = (rgb) => {
  const hsb = { h: 0, s: 0, b: 0 }
  const min = Math.min(rgb.r, rgb.g, rgb.b)
  const max = Math.max(rgb.r, rgb.g, rgb.b)
  const delta = max - min

  hsb.b = max
  hsb.s = max !== 0 ? 255 * delta / max : 0

  if (hsb.s !== 0) {
    if (rgb.r === max) {
      hsb.h = (rgb.g - rgb.b) / delta // between yellow and magenta
    } else if (rgb.g === max) {
      hsb.h = 2 + (rgb.b - rgb.r) / delta // between cyan and yellow
    } else {
      hsb.h = 4 + (rgb.r - rgb.g) / delta // between magenta and cyan
    }
  } else {
    hsb.h = -1
  }

  if (max === min) {
    hsb.h = 0
  }

  hsb.h *= 60 // degrees

  if (hsb.h < 0) {
    hsb.h += 360
  }

  hsb.s *= 100 / 255
  hsb.b *= 100 / 255

  // return {h:Math.round(hsb.h), s:Math.round(hsb.s), b:Math.round(hsb.b)}
  return hsb
}

export const hsbToRgb = (hsb) => {
  const rgb = {}
  let h = hsb.h
  const s = hsb.s * 255 / 100
  const b = hsb.b * 255 / 100

  if (s === 0) {
    rgb.r = rgb.g = rgb.b = b
  } else {
    const p = b
    const q = (255 - s) * b / 255
    const t = (p - q) * (h % 60) / 60
    if (h === 360) h = 0

    if (h < 60) {
      rgb.r = p
      rgb.b = q
      rgb.g = q + t
    } else if (h < 120) {
      rgb.g = p
      rgb.b = q
      rgb.r = p - t
    } else if (h < 180) {
      rgb.g = p
      rgb.r = q
      rgb.b = q + t
    } else if (h < 240) {
      rgb.b = p
      rgb.r = q
      rgb.g = p - t
    } else if (h < 300) {
      rgb.b = p
      rgb.g = q
      rgb.r = q + t
    } else if (h < 360) {
      rgb.r = p
      rgb.g = q
      rgb.b = p - t
    } else {
      rgb.r = 0
      rgb.g = 0
      rgb.b = 0
    }
  }
  return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) }
}

export const hexToHsb = (h) => {
  let hex = h.indexOf('#') > -1 ? h.substring(1) : h
  if (hex.length === 3) {
    const num = hex.split('')
    hex = num[0] + num[0] + num[1] + num[1] + num[2] + num[2]
  }
  hex = parseInt(hex, 16)
  const rgb = { r: hex >> 16, g: (hex & 0x00FF00) >> 8, b: (hex & 0x0000FF) }

  return rgbToHsb(rgb)
}

export const hsbToHex = (hsb) => {
  const rgb = hsbToRgb(hsb)
  const hex = [
    rgb.r.toString(16),
    rgb.g.toString(16),
    rgb.b.toString(16)
  ]

  for (let i = 0; i < hex.length; i++) {
    if (hex[i].length === 1) {
      hex[i] = '0' + hex[i]
    }
  }

  return '#' + hex.join('')
}

export const rgbStringToObject = (rgb) => {
  const r = /[0-9]{1,3}/g
  const re = rgb.match(r) || []

  return { r: re[0], g: re[1], b: re[2] }
}

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb/5623914#5623914
export const rgbToHex = (rgb) => {
  return '#' + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1)
}

// export const rgbToHex = (rgb) => {
//   let hsb = rgbToHsb(rgb)
//   return hsbToHex(hsb)
// }
