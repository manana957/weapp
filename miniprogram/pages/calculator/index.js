let store = 0
let op = undefined;
let storeOp = undefined;
const supPattern = ["💰","🌲","🍒","💃🏻","🍊","💥","⭐️","🥔","🍕","🧋"]

Page({
    data: {
        value: 0,
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        sup: undefined
    },
    clickNumber(e) {
        const {number} = e.currentTarget.dataset;
        this.calculate(number,undefined)
        this.sup()
    },
    clickOperator(e) {
        const {type} = e.currentTarget.dataset;
        this.calculate(undefined, type)
        this.sup()
    },
    calculate(number, operator) {
        if (number) {
            if (this.data.value !== 0) {
              if( op === 'n'){
                const res = +(this.data.value.toString()+(number.toString()));
                this.setData({
                    value: res
                })
              }else if(op === 'o'){
                store = this.data.value;
                this.setData({
                  value: number
                })
              }
            } else {
                this.setData({
                    value: number
                })
            }
            op = 'n'
        } else if (operator) {
            storeOp = operator
            if (!store ) {
                op='o';
                return
            }

            let res = undefined
            switch (operator) {
                case "+":
                    res = store+this.data.value;
                    break;
                case "-":
                    res = store - this.data.value;
                    break;
                case "×":
                    res = store * this.data.value;
                    break;
                case "÷":
                    res = store / this.data.value;
                    break;
            }
            store = res;
            op = 'o'
            this.setData({
                value: res
            })
        } else {
            console.error('???')
        }
    },
    clear() {
        store = undefined;
        op = undefined;
        storeOp = undefined;
        this.setData({
            value: 0
        })
        this.sup()
    },
    sup() {
        const t = Math.floor(Math.random() * 10);
        const pat = supPattern[t];
        console.error('ppp',pat,'t',t)
        this.setData({
            sup:pat
        })
    }
})