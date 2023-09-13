function useGetTodayDate() {
    const date = new Date();
    const days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ];

    const month = [
        'янв',
        'фев',
        'барт',
        'апр',
        'май',
        'июнь',
        'июль',
        'авг',
        'сент',
        'окт',
        'нояб',
        'дек',
    ];

    const todayMonth = month[date.getMonth()];
    const todayWeekDay = days[date.getDay()];
    const todayDay = date.getDate();

    return {
        todayMonth,
        todayDay,
        todayWeekDay,
    };
}

export default useGetTodayDate;
