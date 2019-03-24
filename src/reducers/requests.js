const initialState = [
    {
        id: 1,
        category: "Колодки",
        text: "Необходимо подобрать тормозные колодки на автомобиль такой-то марки такого-то года выпуска.",
        answers: "10",
        status: "access_time",
        date: new Date(),
    },
    {
        id: 2,
        category: "TO-3",
        text: "Требуется комплект запчастей для прохождения ТО-3 на автомобиле таком-то такого-то года выпуска. Пробег 40 000 км.",
        answers: "8",
        status: "block",
        date: new Date(),
    },
];

export function requestsReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}