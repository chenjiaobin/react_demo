export const Increment = 'increment'
export const Decrement = 'decrement'

export const increment = (counterCaption) => {
    return {
        type: Increment,
        counterCaption
    }
}

export const decrement = (counterCaption) => {
    return {
        type: Decrement,
        counterCaption
    }
}