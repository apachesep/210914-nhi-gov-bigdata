$(function () {
    let calendarEl = document.getElementById("calendar");
    let locale = $("#locale").val();
    let calendar = new FullCalendar.Calendar(calendarEl, {
        locale: locale == 'zh_TW' ? 'zh-tw' : 'en',
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek,timeGridDay"
        },
        defaultView: 'dayGridMonth',
        dayMaxEvents: true, // allow "more" link when too many events
        eventDisplay: 'block',
        firstDay: 1, // 設定一週中顯示的第一天是哪天，週日是0，週一是1，類推
        aspectRatio: 2, // 設定日曆單元格寬度與高度的比例。
        handleWindowResize: true,
        navLinks: true, // 可以點擊天/周的名稱來瀏覽視圖嗎
        dayMaxEventRows: true,
        initialDate: new Date(),//初始化時間
        hemeSystem: 'bootstrap',//主題
        events: function (fetchInfo, successCallback, failureCallback) {
            let start = new Date(fetchInfo.start);
            let end = new Date(fetchInfo.end);
            let startDate = start.getFullYear() + '-' + checkTime(start.getMonth() + 1) + '-' + checkTime(start.getDate());
            let endDate = end.getFullYear() + '-' + checkTime(end.getMonth() + 1) + '-' + checkTime(end.getDate());
            $.ajax({
                type: 'POST',
                url: commonUtil.getHandlerPath("/calendar/query"),
                // data: {sDate: startDate, eDate: endDate},
                data: {year: start.getFullYear()},
                success: function (response) {
                    successCallback(response.result.map(function (event) {
                            let color = event.room == '1' ? 'rgb(239, 68, 68)' : 'rgb(245, 158, 11)';
                            return {
                                id: event.id,
                                title: event.subject,
                                start: event.date1,
                                end: event.date2,
                                backgroundColor: color
                            }
                        })
                    );
                },
                error: function (response) {
                    console.log(response);
                    failureCallback(response);
                },
            });
        }
    })
    calendar.render();
})

function checkTime(i) {
    if (i < 10) {
        i = '0' + i
    }
    return i
}