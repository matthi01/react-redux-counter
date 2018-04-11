export const updateData = (oldState, newElements) => {
    return {
        ...oldState,
        ...newElements
    };
};