export const calculateYearAndMonth = (startDate: Date, endDate: Date) => {
    try {
        var yearDiff = new Date().getFullYear() - startDate.getFullYear();
        var monthDiff = new Date().getMonth() - startDate.getMonth();

        if (monthDiff < 0) {
            yearDiff--;
            monthDiff += 12;
        }

        return {
            years: yearDiff,
            months: monthDiff
        };
    } catch (error) {
        console.log("Error : ", error);
    }
};