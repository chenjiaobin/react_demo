export const Increment = 'increment'
export const Decrement = 'Decrement'

export const increment = (counterCaption) => {
    return {
        type: Increment,
        counterCaption
    }
}

export const decrement = (counterCaption) => {
    return {
        type: Increment,
        counterCaption
    }
}