(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c4c61"],{"3bea":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("login-form")},i=[],l=function(){var t=this,e=t._self._c;return e("div",{staticClass:"flex-container-col"},[e("h1",{staticClass:"page-header"},[t._v("로그인")]),e("div",{staticClass:"login-wrapper"},[e("form",{staticClass:"login-form",on:{submit:function(e){return e.preventDefault(),t.submitForm.apply(null,arguments)}}},[e("div",[e("label",{staticClass:"login-form__label",attrs:{id:"email"}},[t._v("이메일")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",id:"email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),e("div",[e("label",{staticClass:"login-form__label",attrs:{id:"pw"}},[t._v("비밀번호")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.pw,expression:"pw"}],attrs:{type:"password",id:"pw"},domProps:{value:t.pw},on:{input:function(e){e.target.composing||(t.pw=e.target.value)}}})])]),e("button",{staticClass:"btn__login",attrs:{disabled:!t.email||!t.pw,type:"submit"}},[t._v(" 로그인 ")])]),t._m(0),e("router-link",{staticClass:"login-form__link-register",attrs:{to:"/register/email"}},[t._v("회원가입 하기")]),e("span",{staticClass:"login-form__or"},[t._v("OR")])],1)},o=[function(){var t=this,e=t._self._c;return e("label",{staticClass:"login-form__checkbox-label",attrs:{for:"checkbox"}},[e("input",{staticClass:"login-form__checkbox",attrs:{type:"checkbox",id:"checkbox"}}),t._v("로그인 상태 유지")])}],n={data(){return{email:"",pw:""}},methods:{async submitForm(){try{const t={email:this.email,password:this.pw},e=await this.$store.dispatch("LOGIN",t);console.log(e),201==e.statusCode?this.$router.push("/"):409==e.statusCode&&alert("회원정보를 확인해주세요.")}catch(t){console.log(t)}}}},r=n,c=a("2877"),u=Object(c["a"])(r,l,o,!1,null,null,null),p=u.exports,m={components:{LoginForm:p}},d=m,_=Object(c["a"])(d,s,i,!1,null,null,null);e["default"]=_.exports}}]);
//# sourceMappingURL=chunk-2d0c4c61.1b74fdff.js.map