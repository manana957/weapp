
Page({
    data: {
        success: false
    },
    signUp(){
        wx.navigateToMiniProgram({
            appId:'wx869a0e459663d82a',
            path:'pages/source/appointment/confirm/index.html?doctorCode=164009&treatmentDate=2024-09-04&sourceCode=86111352&treatmentPeriodType=AM&deptCode=0754',
            extraData:{},
            envVersion:'release',
            success: (result) => {
                const page = wx.createSelectorQuery()
                console.log('pp',page)
            },
            fail: () => {},
            complete: () => {}
        });
    }
})