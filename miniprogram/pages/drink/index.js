
Page({
    data: {
        hour: 0,
        min: 0,
        valid: true
    },
    checkHour(event) {
        const { value } = event.detail
        console.error('hour', value)
        const valid = (value < 24)
        this.setData({
            valid,
            hour: value || 0
        })
        if (!valid) {
            wx.showToast({
                title: '请输入小于24的数字',
                icon: 'none',
                image: '',
                duration: 3000,
                mask: true,
            });
        }
    },
    checkMin(event) {
        const { value } = event.detail;
        console.error('min',value)
        const valid = (value < 60)
        this.setData({
            valid,
            min: value || 0
        })
        if (!valid) {
            wx.showToast({
                title: '请输入小于60的数字',
                icon: 'none',
                image: '',
                duration: 3000,
                mask: true,
            });
        }
    },
    async subscribe() {
        if (!this.data.valid) {
            wx.showToast({
                title: '时间设置无效，请重新设置',
                icon: 'none',
                image: '',
                duration: 3000,
                mask: true,
            });
            return
        }
        const tmplIds = ['5VaamUmJxK449DLrTzY4N8RNHB-X-1W7GC51GO1aSs4'];
        await wx.requestSubscribeMessage({
            tmplIds, success: (res) => {
                if (res.errMsg === 'requestSubscribeMessage:ok') {
                    wx.getSetting({
                        withSubscriptions: true,
                        success: (result) => {
                            items = result.subscriptionsSetting.itemSettings;
                            console.error('items',items)
                            if (items && items['5VaamUmJxK449DLrTzY4N8RNHB-X-1W7GC51GO1aSs4'] === 'reject') {
                                wx.showToast({
                                    title: '请授权订阅消息哦~',
                                    icon: 'none',
                                    image: '',
                                    duration: 2000,
                                    mask: true,
                                });
                            } else {
                                wx.showToast({
                                    title: '订阅成功~',
                                    icon: 'none',
                                    image: '',
                                    duration: 2000,
                                    mask: true,
                                });
                                wx.cloud.callFunction({
                                    // 云函数名称
                                    name: 'drinkRemind',
                                    // 传给云函数的参数
                                    data: {
                                        hour: this.data.hour,
                                        min: this.data.min
                                    },
                                    success: function (res) {
                                        console.error('suc', res) // 3
                                    },
                                    fail: console.error
                                })
                            }
                        },
                    });
                      
                   
                }
                
            },fail: (res) => {
                wx.showToast({
                    title: '订阅失败，亲亲请重试哦',
                    icon: 'none',
                    image: '',
                    duration: 2000,
                    mask: false,
                });
            } });
          
    }
})