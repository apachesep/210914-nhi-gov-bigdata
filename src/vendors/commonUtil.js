let commonUtil = (function () {
    jQuery.fn.validate = function () {
        let arrElement = $(this[0]).find(".required");
        let arrTitle = $(this[0]).find(".mark-required");
        if (arrElement.length != arrTitle.length) {
            commonUtil.messageAlert('表單驗證錯誤欄位數異常', 'error');
            return false;
        }
        for (let i = 0; i < arrTitle.length; i++) {
            let title = $(arrTitle[i]).next().text().replace("：", "");
            let val = $(arrElement[i]).val();
            if (commonUtil.isEmpty(val)) {
                layer.msg(title + '不可空白！', {time: 1000, icon: 0, shift: 3, area: ['300px', '66px']}, function () {
                    $((arrElement[i])).focus();
                });
                return false;
            }
        }
        return true;
    };

    jQuery.fn.serializeObject = function () {
        let formData = {};
        let formArray = this.serializeArray();
        for (let i = 0, n = formArray.length; i < n; ++i) {
            formData[formArray[i].name] = formArray[i].value;
        }
        return formData;
    };

    return {
        dataTableOption: () => {
            let option = {};
            $.extend(option, {
                destroy: true,
                autoWidth: false,
                serverSide: true,
                lengthMenu: [10, 25, 50, 75, 100],
                pageLength: 10,
                searching: false,
                language: {
                    emptyTable: "查無資料",
                    processing: "處理中...",
                    loadingRecords: "載入中...",
                    lengthMenu: "顯示 _MENU_ 項結果",
                    zeroRecords: "沒有符合的結果",
                    // info: "顯示第 _START_ 至 _END_ 項結果，共 _TOTAL_ 項",
                    // infoEmpty: "顯示第 0 至 0 項結果，共 0 項",
                    // infoFiltered: "(從 _MAX_ 項結果中過濾)",
                    info: "共 _TOTAL_ 項",
                    infoEmpty: "共 0 項",
                    infoFiltered: "",
                    infoPostFix: "",
                    search: "搜尋:",
                    paginate: {"first": "首頁", "previous": "上一頁", "next": "下一頁", "last": "尾頁"},
                    aria: {"sortAscending": ": 升冪排列", "sortDescending": ": 降冪排列"}
                }
            });
            return option;
        },
        msg: {
            addSuccess: '新增成功',
            editSuccess: '修改成功',
            deleteSuccess: '删除成功',
            uploadSuccess: '上传成功',
            addFail: '新增失败',
            editFail: '修改失败',
            deleteFail: '删除失败',
            logOutFail: '登出失敗',
            loginFail: '登入失敗',
            authFail: '無權進行此項操作',
            reviewSuccess: '審核成功',
            reviewFail: '審核失敗',
            systemFail: '系統發生錯誤，請洽相關人員協助。',
            reloadFail: '系統發生錯誤，請重新登入！',
            fieldEmptyFail: '尚未添加欄位！'
        },
        confirm: (content, btnNames, func) => {
            layer.confirm(content, {
                btn: btnNames
                , cancel: function (index, layero) {
                    layer.close(layer.index);
                }
            }, function () {
                layer.close(layer.index);
                func();
            }, function () {
                layer.close(layer.index);
            });
        },
        messageAlert: (content, msgType, func) => {
            let icon = 6;
            switch (msgType) {
                case "warning":
                    icon = 0;
                    break;
                case "success":
                    icon = 1;
                    break;
                case "error":
                    icon = 2;
                    break;
                case "question":
                    icon = 4;
                    break;
            }

            if (func == null) {
                layer.alert(content, {icon: icon});
            } else {
                layer.alert(content, {
                    icon: icon,
                    cancel: function () {
                        func();
                    }
                }, function () {
                    func();
                });
            }
        },
        getHandlerPath: (functionPath) => {
            return '/' + window.location.pathname.split("/")[1] + functionPath;
        },
        htmlFormat: (str) => {
            if (str == null) {
                return "";
            }
            str = str.replace(/&amp;/gi, '&');
            str = str.replace(/&nbsp;/gi, ' ');
            str = str.replace(/&quot;/gi, '"');
            str = str.replace(/&#39;/g, "'");
            str = str.replace(/&lt;/gi, '<');
            str = str.replace(/&gt;/gi, '>');
            str = str.replace(/<br[^>]*>(?:(rn)|r|n)?/gi, 'n');
            return str;
        },
        isEmpty: (val) => {
            return (typeof val == "undefined" || val == null || val == "") ? true : false;
        }
    };
})();


