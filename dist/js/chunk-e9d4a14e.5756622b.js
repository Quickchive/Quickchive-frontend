(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e9d4a14e"],{a3d7:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex-container-col"},[t("div",{staticClass:"register-wrapper"},[t("form",{on:{submit:function(t){return t.preventDefault(),e.submitForm.apply(null,arguments)}}},[t("div",{staticClass:"register-form__email"},[t("div",{staticClass:"register-form__wrapper"},[t("label",{staticClass:"register-form__label",attrs:{for:"email"}},[e._v("이메일")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],attrs:{type:"text",id:"email"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}})]),t("span",[e._v("@")]),"etc"==e.emailDomain?t("div",{staticClass:"register-form__wrapper"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.emailSelfInput,expression:"emailSelfInput"}],attrs:{type:"text"},domProps:{value:e.emailSelfInput},on:{input:function(t){t.target.composing||(e.emailSelfInput=t.target.value)}}})]):e._e(),t("select",{directives:[{name:"model",rawName:"v-model",value:e.emailDomain,expression:"emailDomain"}],on:{change:function(t){var i=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.emailDomain=t.target.multiple?i:i[0]}}},[t("option",{attrs:{value:""}},[e._v("이메일 선택")]),t("option",{attrs:{value:"gmail.com"}},[e._v("gmail.com")]),t("option",{attrs:{value:"naver.com"}},[e._v("naver.com")]),t("option",{attrs:{value:"daum.com"}},[e._v("daum.net")]),t("option",{attrs:{value:"etc"}},[e._v("직접입력")])]),t("button",{class:["btn--sm",e.isEmailValid?"btnPrimary":"btnGray"],attrs:{type:"button",disabled:!e.isEmailValid},on:{click:function(t){return e.sendEmail()}}},[e._v(" "+e._s(e.btnMessage.email)+" ")])]),e.errorEvent?t("span",{staticClass:"error-msg"},[e._v(e._s(e.errorMessage))]):e._e(),e.isTimerActive?t("TimerComponent",{ref:"timer"}):e._e()],1)])])},a=[],r=i("3786"),n=i("e736"),m={component:{TimerComponent:n["a"]},data(){return{email:"",emailDomain:"",emailSelfInput:"",codeInputActive:!1,btnMessage:{email:"인증"},errorMessage:"",message:{btn:"인증"},errorEvent:!1,timerComponent:"",isTimerActive:!1,timerMessage:""}},computed:{isEmailValid(){return!(!this.email||""==this.emailDomain||"etc"==this.emailDomain)||!("etc"!=this.emailDomain||!this.emailSelfInput)}},methods:{async sendEmail(){this.isTimerActive=!0;try{if("etc"!=this.emailDomain){const e=`${this.email}@${this.emailDomain}`,t=await Object(r["f"])(e);console.log(t),200==t.data.statusCode&&(this.codeInputActive=!0,this.btnMessage.email="재전송",this.$refs.timer.resetTimer())}else if("etc"==this.emailDomain){const e=`${this.email}@${this.emailSelfInput}`,t=await Object(r["f"])(e);console.log(t),200==t.data.statusCode&&(this.isTimerActive=!0,this.codeInputActive=!0,this.btnMessage.email="재전송",this.$refs.timer.resetTimer())}}catch(e){this.isTimerActive=!1,console.log(e),this.errorMessage=e.response.data.message,this.errorEvent=!0}},initForm(){this.nickName="",this.email="",this.pw=""}},components:{TimerComponent:n["a"]}},l=m,o=i("2877"),c=Object(o["a"])(l,s,a,!1,null,null,null);t["default"]=c.exports},e736:function(e,t,i){"use strict";var s=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"error-msg__wrapper"},[t("div",{staticClass:"error-msg"},[e._v(e._s(e.message))]),t("div",{staticClass:"error-msg"},[e._v("("+e._s(e.minutes)+" : "+e._s(e.seconds)+")")])])])},a=[],r={data(){return{timer:null,totalTime:300,message:"인증메일을 확인해주세요."}},mounted(){this.startTimer()},methods:{startTimer(){this.totalTime=300,clearInterval(this.timer),this.timer=null,this.timer=setInterval(()=>this.countdown(),1e3),this.message="인증메일을 확인해주세요."},resetTimer(){this.totalTime=300,clearInterval(this.timer),this.timer=null,this.startTimer()},padTime(e){return(e<10?"0":"")+e},countdown(){this.totalTime>=1?this.totalTime--:(this.totalTime=0,this.message="인증시간이 만료되었습니다.")},stopTimer(e){this.totalTime=0,this.timerMessage=e}},computed:{minutes(){const e=Math.floor(this.totalTime/60);return this.padTime(e)},seconds(){const e=this.totalTime-60*this.minutes;return this.padTime(e)}}},n=r,m=i("2877"),l=Object(m["a"])(n,s,a,!1,null,null,null);t["a"]=l.exports}}]);
//# sourceMappingURL=chunk-e9d4a14e.5756622b.js.map