export const Increment = 'increment'
export const Decrement = 'Decrement'

export const increment = (counterCaption) => ({
    type: Increment,
    counterCaption
})

export const decrement = (counterCaption) => ({
    type: Decrement,
    counterCaption
})