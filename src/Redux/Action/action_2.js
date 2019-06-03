export const Multiply = 'multiply'

export const multiply = (counterCaption) => {
  return {
      type: Multiply,
      counterCaption
  }
}