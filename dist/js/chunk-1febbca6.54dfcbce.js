(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1febbca6"],{"09e9":function(t,e,n){t.exports=n.p+"img/topBtn.8e24ba9c.svg"},1680:function(t,e,n){t.exports=n.p+"img/alert-circle.78e81ce6.svg"},"2a7a":function(t,e,n){t.exports=n.p+"img/plusBtn.79284c99.svg"},"427d":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"main"},[e("main-component")],1)},a=[],i=function(){var t=this,e=t._self._c;return e("div",[e("favorite-contents"),e("div",{staticClass:"contents__wrapper"},[e("all-contents"),e("unclassified-contents")],1),e("div",{staticClass:"main-btn__wrapper"},[e("button",{staticClass:"btn__addCategory",on:{click:t.openCategoryModal}},[t._v(" + Add category ")])]),e("category-modal-component",{directives:[{name:"show",rawName:"v-show",value:t.isCategoryModalActive,expression:"isCategoryModalActive"}],on:{"close-modal":function(e){t.isCategoryModalActive=!1}}}),e("div",{staticClass:"main-btn__wrapper-col"},[e("button",{staticClass:"btn--transparent btn__top",on:{click:function(e){return t.backToTop()}}},[e("img",{attrs:{src:t.topBtn}})]),e("button",{staticClass:"btn__addContents",on:{click:function(e){t.isModalActive=!0}}},[e("img",{attrs:{src:t.plusBtn}})])]),t.isModalActive?e("contents-modal-component",{on:{"close-modal":function(e){t.isModalActive=!1},isLinkNotSingle:function(e){return t.isLinkNotSingle()}}}):t._e(),t.isConfirmModalActive?e("confirm-modal-component",{attrs:{confirmModalContent:t.confirmModalContent,leftBtnMessage:t.leftBtnMessage,rightBtnMessage:t.rightBtnMessage},on:{rightBtn:function(e){t.isConfirmModalActive=!1},leftBtn:function(e){t.isConfirmModalActive=!1}}}):t._e(),t.isAlertModalActive?e("alert-modal-component",{attrs:{alertModalContent:t.alertModalContent,btnMessage:t.btnMessage},on:{confirmBtn:function(e){t.isAlertModalActive=!1}}}):t._e()],1)},o=[],r=function(){var t=this,e=t._self._c;return e("div",{staticClass:"favorite-content"},[e("header",[e("div",{staticClass:"favorite-content__header-wrapper"},[e("h3",[t._v("즐겨찾기")]),e("img",{attrs:{src:t.star}})]),e("button",{on:{click:function(e){return t.showContent()}}},[t.contentState?t._e():e("img",{attrs:{src:t.plus}}),t.contentState?e("img",{attrs:{src:t.minus}}):t._e()])])])},c=[],l=n("871b"),d=n.n(l),u=n("7e44"),m=n.n(u),v=n("8599"),p=n.n(v),_={data(){return{plus:d.a,minus:m.a,star:p.a,contentState:!1}},methods:{showContent(){this.contentState=!this.contentState},createFavorites(t){console.log("인덱스",t),this.contents[t].isFavoriteContent=!this.contents[t].isFavoriteContent}}},g=_,C=n("2877"),f=Object(C["a"])(g,r,c,!1,null,null,null),h=f.exports,b=function(){var t=this,e=t._self._c;return e("div",{staticClass:"all-content"},[e("header",[e("h3",[t._v("전체")]),e("button",{on:{click:function(e){return t.showContent()}}},[t.contentState?t._e():e("img",{attrs:{src:t.plus}}),t.contentState?e("img",{attrs:{src:t.minus}}):t._e()])]),e("div",{directives:[{name:"show",rawName:"v-show",value:t.contentState,expression:"contentState"}],staticClass:"contents-lists"},t._l(t.contents,(function(n,s){return e("div",{key:s,staticClass:"contents-list"},[e("div",{staticClass:"contents-list__wrapper"},[e("span",{staticClass:"contents-list__icon"},[t._v(" "+t._s(n.icon)+" ")]),e("span",{staticClass:"contents-list__title"},[t._v(" "+t._s(n.title)+" ")])]),e("div",{staticClass:"contents-list__wrapper"},[e("img",{attrs:{src:t.line}}),e("span",{staticClass:"contents-list__expiry"},[t._v(t._s(n.expiryDate))]),e("button",{staticClass:"btn--transparent"},[e("img",{attrs:{src:t.memo}})]),e("button",{staticClass:"btn--transparent",on:{click:function(e){return t.createFavorites(s)}}},[n.isFavoriteContent?e("img",{attrs:{src:t.star}}):t._e(),n.isFavoriteContent?t._e():e("img",{attrs:{src:t.star_gray}})])])])})),0)])},w=[],y=n("79a5"),M=n.n(y),k=n("6d1b"),x=n.n(k),A=n("7ec9"),S=n.n(A),L={data(){return{plus:d.a,minus:m.a,line:M.a,memo:x.a,star:p.a,star_gray:S.a,contentState:!1,contents:[{icon:"링크",title:"콘텐츠 제목1",expiryDate:"D-2",isFavoriteContent:!1},{icon:"웹",title:"콘텐츠 제목2",expiryDate:"D-3",isFavoriteContent:!0}]}},methods:{showContent(){this.contentState=!this.contentState},createFavorites(t){console.log("인덱스",t),this.contents[t].isFavoriteContent=!this.contents[t].isFavoriteContent}}},N=L,B=Object(C["a"])(N,b,w,!1,null,null,null),F=B.exports,D=function(){var t=this,e=t._self._c;return e("div",{staticClass:"unclassified-content"},[e("header",[e("h3",[t._v("미분류")]),e("button",{on:{click:function(e){return t.showContent()}}},[t.contentState?t._e():e("img",{attrs:{src:t.plus}}),t.contentState?e("img",{attrs:{src:t.minus}}):t._e()])]),t.contentState?e("div",{staticClass:"contents-lists"},t._l(t.contents,(function(n,s){return e("div",{key:s,staticClass:"contents-list"},[e("div",{staticClass:"contents-list__wrapper"},[e("span",{staticClass:"contents-list__icon"},[t._v(" "+t._s(n.icon)+" ")]),e("span",{staticClass:"contents-list__title"},[t._v(" "+t._s(n.title)+" ")])]),e("div",{staticClass:"contents-list__wrapper"},[e("img",{attrs:{src:t.line}}),e("span",{staticClass:"contents-list__expiry"},[t._v(t._s(n.expiryDate))]),e("button",{staticClass:"btn--transparent"},[e("img",{attrs:{src:t.memo}})]),e("button",{staticClass:"btn--transparent",on:{click:function(e){return t.createFavorites(s)}}},[n.isFavoriteContent?e("img",{attrs:{src:t.star}}):t._e(),n.isFavoriteContent?t._e():e("img",{attrs:{src:t.star_gray}})])])])})),0):t._e()])},O=[],$={data(){return{plus:d.a,minus:m.a,line:M.a,memo:x.a,star:p.a,star_gray:S.a,contentState:!1,contents:[{icon:"링크",title:"콘텐츠 제목1",expiryDate:"D-2",isFavoriteContent:!1},{icon:"웹",title:"콘텐츠 제목2",expiryDate:"D-3",isFavoriteContent:!0}]}},methods:{showContent(){this.contentState=!this.contentState},createFavorites(t){console.log("인덱스",t),this.contents[t].isFavoriteContent=!this.contents[t].isFavoriteContent}}},j=$,T=Object(C["a"])(j,D,O,!1,null,null,null),P=T.exports,G=function(){var t=this,e=t._self._c;return e("div",{staticClass:"modal"},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"modal-card"},[e("div",{staticClass:"modal-card__header"},[e("h1",[t._v("카테고리 추가")]),e("button",{staticClass:"btn--transparent btn__close",attrs:{type:"button"},on:{click:function(e){return t.$emit("close-modal")}}},[e("img",{attrs:{src:t.closeBtn}})])]),e("p",[t._v("카테고리 추가")])])])},I=[],z=n("f7ed"),Z=n.n(z),K={name:"ModalComponent",data(){return{closeBtn:Z.a}},props:{modalTitle:String,modalContent:String}},U=K,H=Object(C["a"])(U,G,I,!1,null,null,null),q=H.exports,J=n("2a7a"),R=n.n(J),E=n("09e9"),Y=n.n(E),Q=function(){var t=this,e=t._self._c;return e("div",{staticClass:"modal"},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"contents-modal-card"},[e("div",{staticClass:"modal-card__header"},[e("h1",[t._v("콘텐츠 추가")]),e("button",{staticClass:"btn--transparent btn__close",attrs:{type:"button"},on:{click:function(e){return t.$emit("close-modal")}}},[e("img",{attrs:{src:t.closeBtn}})])]),e("div",{staticClass:"modal-card__wrapper"},[e("div",{staticClass:"register-form__wrapper"},[t._m(0),e("div",{staticClass:"flex-container modal-form__wrapper"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.link,expression:"link"}],attrs:{placeholder:"URL 입력"},domProps:{value:t.link},on:{input:function(e){e.target.composing||(t.link=e.target.value)}}}),e("button",{staticClass:"btn--transparent btn__favorites",on:{click:function(e){return t.addFavorites()}}},[e("img",{directives:[{name:"show",rawName:"v-show",value:!t.isActive,expression:"!isActive"}],attrs:{src:t.star_border}}),e("img",{directives:[{name:"show",rawName:"v-show",value:t.isActive,expression:"isActive"}],attrs:{src:t.star}})])])]),e("div",{staticClass:"flex-container-col"},[e("button",{directives:[{name:"show",rawName:"v-show",value:!t.isDetailSettingActive,expression:"!isDetailSettingActive"}],staticClass:"btn__deleteuser",on:{click:t.setDetail}},[t._v(" 세부 설정 ")])]),e("div",{directives:[{name:"show",rawName:"v-show",value:t.isDetailSettingActive,expression:"isDetailSettingActive"}]},[e("div",{staticClass:"register-form__wrapper"},[t._m(1),e("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],attrs:{placeholder:"30자 이하 권장"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}})]),e("div",{staticClass:"flex-container modal-form__wrapper"},[e("div",{staticClass:"register-form__wrapper"},[e("label",{staticClass:"register-form__label"},[t._v("카테고리")]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.categoryName,expression:"categoryName"}],staticClass:"contents-modal__select",on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.categoryName=e.target.multiple?n:n[0]}}},[e("option",[t._v("미분류")]),t._l(t.myCategories,(function(n,s){return e("div",{key:s},[e("option",[t._v(t._s(n.name))])])}))],2)]),e("div",{staticClass:"register-form__wrapper"},[e("label",{staticClass:"register-form__label"},[t._v("읽을 기한")]),e("div",{staticClass:"flex-container modal-form__wrapper"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.deadline,expression:"deadline"}],attrs:{type:"date"},domProps:{value:t.deadline},on:{input:function(e){e.target.composing||(t.deadline=e.target.value)}}}),e("span",{staticClass:"contents-modal__date-description"},[t._v("D-DAY에 알림을 보내드립니다")])])])]),e("div",{staticClass:"register-form__wrapper"},[e("label",{staticClass:"register-form__label"},[t._v("메모")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.comment,expression:"comment"}],attrs:{placeholder:"500자 이하",maxlength:"500"},domProps:{value:t.comment},on:{input:function(e){e.target.composing||(t.comment=e.target.value)}}})])])]),e("div",{staticClass:"modal-card__collection__wrapper"},[e("span",{staticClass:"modal-card__text"},[e("img",{attrs:{src:t.alert_circle}}),t._v("여러 링크들을 묶어서 저장하고 싶다면?")]),e("button",{staticClass:"btn--transparent btn__collection"},[t._v(" 콜렉션으로 저장하기 >> ")])]),e("div",{staticClass:"flex-container-col"},[e("button",{staticClass:"btn--sm btnPrimary",attrs:{disabled:!t.link||!t.title},on:{click:function(e){return t.createContent()}}},[t._v(" 저장 ")])])])])},V=[function(){var t=this,e=t._self._c;return e("label",{staticClass:"register-form__label"},[t._v("링크"),e("em",[t._v("*")])])},function(){var t=this,e=t._self._c;return e("label",{staticClass:"register-form__label"},[t._v("이름"),e("em",[t._v("*")])])}],W=n("da44"),X=n.n(W),tt=n("1680"),et=n.n(tt),nt=n("365c");function st(t){return nt["a"].post("contents/add",t)}function at(t){return nt["a"].post("contents/addMultiple",t)}var it=n("c24f"),ot=n("5464"),rt={name:"ModalComponent",data(){return{closeBtn:Z.a,star_border:X.a,star:p.a,alert_circle:et.a,isDetailSettingActive:!1,isActive:!1,myCategories:{},link:"",title:"",deadline:"",comment:"",categoryName:""}},mounted(){this.getMyCategory()},computed:{isTextLink(){return""!=this.link?Object(ot["b"])(this.link):null},countLink(){return""!=this.link?Object(ot["a"])(this.link):null}},methods:{setDetail(){this.isDetailSettingActive=!0},addFavorites(){this.isActive=!this.isActive},async getMyCategory(){try{const t=await Object(it["b"])();console.log(t),this.myCategories=t.categories}catch(t){console.log(t)}},async createContent(){if(1==this.countLink)try{this.$emit("close-modal");const t={link:this.link,title:this.title,deadline:this.deadline,comment:this.comment,categoryName:this.categoryName},e=await st(t);console.log(e)}catch(t){console.log(t)}else this.countLink>=2&&this.$emit("isLinkNotSingle")}}},ct=rt,lt=Object(C["a"])(ct,Q,V,!1,null,null,null),dt=lt.exports,ut=n("ad92"),mt=function(){var t=this,e=t._self._c;return e("div",{staticClass:"modal"},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"alert-modal-card"},[e("div",{staticClass:"modal-card__header"},[e("p",{domProps:{innerHTML:t._s(t.handleNewLine(this.alertModalContent))}})]),e("div",{staticClass:"modal-card__button-wrapper"},[e("button",{on:{click:function(e){return t.$emit("confirmBtn")}}},[e("p",{domProps:{innerHTML:t._s(t.handleNewLine(this.btnMessage))}})])])])])},vt=[],pt={name:"AlertModalComponent",props:{alertModalContent:String,btnMessage:String},methods:{handleNewLine(t){return String(t).replace(/(?:\r\n|\r|\n)/g,"</br>")}}},_t=pt,gt=Object(C["a"])(_t,mt,vt,!1,null,null,null),Ct=gt.exports,ft={components:{FavoriteContents:h,AllContents:F,ContentsModalComponent:dt,UnclassifiedContents:P,CategoryModalComponent:q,ConfirmModalComponent:ut["a"],AlertModalComponent:Ct},data(){return{isCategoryModalActive:!1,plusBtn:R.a,isModalActive:!1,isConfirmModalActive:!1,isAlertModalActive:!1,topBtn:Y.a,confirmModalContent:"URL이 2개 이상이네요! \n 저장방식을 선택해주세요",leftBtnMessage:"콜렉션으로 저장",rightBtnMessage:"각각 콘텐츠로 저장",alertModalContent:"같은 카테고리에 동일 링크가 \n 이미 저장되었습니다.",btnMessage:"네"}},created(){const t=this.$route.path,e=t.slice(6);"google/redirect"==e?(this.getGoogleLogin(),localStorage.setItem("oauthInfo","google")):"kakao/redirect"==e&&(this.getKakaoLogin(),localStorage.setItem("oauthInfo","kakao"))},computed:{isUserLogin(){return this.$store.getters.isLogin}},methods:{async getKakaoLogin(){try{const t=this.$route.query.code;await this.$store.dispatch("KAKAO_LOGIN",t)}catch(t){console.log(t)}},async getGoogleLogin(){try{const t=this.$route.query.code;await this.$store.dispatch("GOOGLE_LOGIN",t)}catch(t){console.log(t)}},openCategoryModal(){this.isCategoryModalActive=!0},addContents(){this.isModalActive=!0},backToTop(){window.scrollTo(0,0)},isLinkNotSingle(){this.isModalActive=!1,this.isConfirmModalActive=!0},async addMultipleContents(){const t={contentLinks:"https//www.naver.com/ https://google.com"};try{const{response:e}=await at(t);console.log(e)}catch(e){console.log(e)}}}},ht=ft,bt=Object(C["a"])(ht,i,o,!1,null,null,null),wt=bt.exports,yt={components:{MainComponent:wt}},Mt=yt,kt=Object(C["a"])(Mt,s,a,!1,null,null,null);e["default"]=kt.exports},5464:function(t,e,n){"use strict";function s(t){const e=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/;return e.test(String(t.toLowerCase()))}function a(t){const e=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;return e.test(String(t))}function i(t){let e="http",n=t.indexOf(e),s=0;while(-1!==n)s++,n=t.indexOf(e,n+1);return s}n.d(e,"c",(function(){return s})),n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return i}))},"6d1b":function(t,e,n){t.exports=n.p+"img/memo.f8f0067d.svg"},"79a5":function(t,e,n){t.exports=n.p+"img/line.293009b2.svg"},"7e44":function(t,e,n){t.exports=n.p+"img/minus.ebb85f0f.svg"},"7ec9":function(t,e,n){t.exports=n.p+"img/star_gray.5a8620c4.svg"},8599:function(t,e,n){t.exports=n.p+"img/star.c60dba1e.svg"},"871b":function(t,e,n){t.exports=n.p+"img/plus.56b0c6ab.svg"},ad92:function(t,e,n){"use strict";var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"modal"},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"confirm-modal-card"},[e("div",{staticClass:"modal-card__header"},[e("p",{domProps:{innerHTML:t._s(t.handleNewLine(this.confirmModalContent))}})]),e("div",{staticClass:"modal-card__button-wrapper"},[e("button",{attrs:{id:"btn__confirm"},on:{click:function(e){return t.$emit("leftBtn")}}},[t._v(" "+t._s(t.leftBtnMessage)+" ")]),e("button",{on:{click:function(e){return t.$emit("rightBtn")}}},[t._v(t._s(t.rightBtnMessage))])])])])},a=[],i={name:"ConfirmModalComponent",props:{confirmModalContent:String,leftBtnMessage:String,rightBtnMessage:String},methods:{handleNewLine(t){return String(t).replace(/(?:\r\n|\r|\n)/g,"</br>")}}},o=i,r=n("2877"),c=Object(r["a"])(o,s,a,!1,null,null,null);e["a"]=c.exports},da44:function(t,e,n){t.exports=n.p+"img/star_border.026e7381.svg"},f7ed:function(t,e,n){t.exports=n.p+"img/closeBtn.a9f6b6a0.svg"}}]);
//# sourceMappingURL=chunk-1febbca6.54dfcbce.js.map