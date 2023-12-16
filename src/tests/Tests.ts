type test = {
    description: string,
    answers: string[],
    correctAnswerId: number
}

const tests: test[] = [
    {
        description: "Lubisz Placki?",
        answers: [
            "Tak",
            "Nie",
            "Odpowiedź niepowiązana 1",
            "Odpowiedź niepowiązana 2",
        ],
        correctAnswerId: 0,
    },
    {
        description: "Jakie krzaki są fajne?",
        answers: [
            "Wysokie",
            "Niskie",
            "Odpowiedź niepowiązana",
            "Odpowiedź niepowiązana",
        ],
        correctAnswerId: 0,
    },
    {
        description: "Czy twoja siostra to ufo?",
        answers: [
            "Tak",
            "Raczej tak",
            "Chyba tak",
            "Nie wiem, ale tak",
        ],
        correctAnswerId: 0,
    },
    {
        description: "Lubisz Placki?",
        answers: [
            "Wysokie",
            "Niskie",
            "Nie wiem",
            "Takie o",
        ],
        correctAnswerId: 0,
    },
    {
        description: "Jakie krzaki są fajne?",
        answers: [
            "Wysokie",
            "Niskie",
            "Nie wiem",
            "Takie o",
        ],
        correctAnswerId: 0,
    },
    {
        description: "Czy twoja siostra to ufo?",
        answers: [
            "Tak",
            "Raczej tak",
            "Chyba tak",
            "Nie wiem, ale tak",
        ],
        correctAnswerId: 0,
    },
    {
        description: "Lubisz Placki?",
        answers: [
            "Tak",
            "Nie",
            "Odpowiedź niepowiązana 1",
            "Odpowiedź niepowiązana 2",
        ],
        correctAnswerId: 0,
    },
    {
        description: "Jakie Placki są fajne?",
        answers: [
            "Wysokie",
            "Niskie",
            "Nie wiem",
            "Takie o",
        ],
        correctAnswerId: 0,
    },
    {
        description: "Czy twoja siostra to ufo?",
        answers: [
            "Tak",
            "Raczej tak",
            "Chyba tak",
            "Nie wiem, ale tak",
        ],
        correctAnswerId: 0,
    }
    // {
    //     description: "Jakieś pytanie?",
    //     answers: [
    //         "Tak",
    //         "Nie"
    //     ],
    //     correctAnswerId: 0,
    // },
    // {
    //     description: "Kolejne pytanie?",
    //     answers: [
    //         "Tak",
    //         "Nie"
    //     ],
    //     correctAnswerId: 0,
    // },
    // {
    //     description: "Następne pytanie po kolejnym?",
    //     answers: [
    //         "Tak",
    //         "Raczej tak"
    //     ],
    //     correctAnswerId: 0,
    // }
]

export default tests;