Page({
    goCalculator() {
        wx.navigateTo({
            url: '/pages/calculator/index',
            success: (result) => {
                
            },
            fail: () => {},
            complete: () => {}
        });
          
    }
})