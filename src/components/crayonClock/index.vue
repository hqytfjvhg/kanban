<template>
    <div id="app">
        <div class="crayon-clock">
            <div class="crayon-clock-time">
                <div class="meridiem" v-if="timeFormat === 12">{{ amOrAp ? 'PM' : 'AM' }}</div>
                <!-- <div class="meridiem" v-else>24H</div> -->
                <div class="time flexCenter">
                    {{ time }}
                </div>
            </div>
            <div class="crayon-clock-date">
                <div :style="country.length >= 7 ? country.length >= 9 ? 'font-size: 1.4rem;' : 'font-size: 1.6rem;' : 'font-size: 2rem;'"
                    class="country">{{ country }}</div>
                <div class="date">
                    {{ week + ' ' + date }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CrayonClock",
    components: {},
    props: {
        timeZone: {
            type: Number,
            required: false,
            default: 8
        },
        country: {
            type: String,
            required: false,
            default: 'China'
        },
        dateStyle: {
            type: String,
            required: false,
            default: "letter-spacing: 0.1em;font-size: 14px;"
        },
        weekStyle: {
            type: String,
            required: false,
            default: "font-size: 16px;"
        },
        timeFormat: {
            type: Number,
            required: false,
            default: 12 //默认24小时制
        }
    },
    data() {
        return {
            time: "",
            date: "",
            week: "",
            amOrAp: 0,
            timerHelper: false
        };
    },
    mounted() {
        this.timerHelper = setInterval(this.updateTime, 1000);
    },
    beforeDestroy() {
        if (this.timerHelper) {
            clearInterval(this.timerHelper);
            this.timerHelper = false;
        }
    },
    methods: {
        zeroPadding(num, digit) {
            let zero = "";
            for (let i = 0; i < digit; i++) {
                zero += "0";
            }
            return (zero + num).slice(-digit);
        },
        updateTime() {
            const week = ["Sun.", "Mon.", "Tues.", "Wed.", "Thur.", "Fri.", "Sat."];
            const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']
            const cd = this.getZoneTime(this.timeZone);
            let hour = cd.getHours()
            if (this.timeFormat == 12) {
                this.amOrAp = hour >= 12 ? 1 : 0
                if (hour === 0) {
                    hour = 12
                } else{
                    hour = hour >= 13 ? (hour - 12) : hour
                }

                this.time = this.zeroPadding(hour, 2) + ":" + this.zeroPadding(cd.getMinutes(), 2)
            }

            if (this.timeFormat == 24) {
                this.time = this.zeroPadding(hour, 2) + ":" + this.zeroPadding(cd.getMinutes(), 2)
            }

            this.date = this.zeroPadding(cd.getDate(), 2) + " " + months[cd.getMonth()];
            this.week = week[cd.getDay()];

        },
        getZoneTime(offset) {
            // 取本地时间
            var localtime = new Date();
            // 时间戳
            var localmesc = localtime.getTime();
            // 取本地时区与格林尼治所在时区的偏差毫秒数
            var localOffset = localtime.getTimezoneOffset() * 60000;
            // 反推得到格林尼治时间
            var utc = localOffset + localmesc;
            // 得到指定时区时间
            var calctime = utc + (3600000 * offset);
            var nd = new Date(calctime);
            return nd;
        }
    }
};
</script>

<style  lang='scss' scoped>
#app {
    text-align: center;
    color: #2c3e50;
}

.flexCenter {
    display: flex;
    justify-content: center;
    align-items: center;
}

.crayon-clock {
    display: flex;
    align-items: center;
    font-family: Arial;
    color: #FFF;
    justify-content: center;
    height: 7rem;

    .crayon-clock-time {
        height: 70%;
        display: flex;
        color: #daf6ff;
        text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);

        .meridiem {
            font-size: 1.0rem;
            padding: 0.7rem 0.2rem 0 0;
            font-family: Arial;
        }
        .time {
            font-size: 4.5rem;
        }
    }

    .crayon-clock-date {
        display: flex;
        flex-direction: column;
        padding-left: 1rem;
        height: 60%;
        justify-content: space-around;
        align-items: center;

        .country {
            white-space: nowrap;
            margin-right: 0.1rem;
        }

        .date {
            font-size: 1.1rem;
            white-space: nowrap;
        }
    }
}
</style>
