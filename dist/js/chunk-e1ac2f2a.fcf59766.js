(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e1ac2f2a"],{"09e9":function(t,e,a){t.exports=a.p+"img/topBtn.8e24ba9c.svg"},1680:function(t,e,a){t.exports=a.p+"img/alert-circle.78e81ce6.svg"},1986:function(t,e,a){"use strict";var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"all-content"},[e("header",[e("div",{staticClass:"content__header",on:{click:function(e){return t.toCategoryPage()}}},[e("h3",[t._v(t._s(t.filterCategoryTitle(t.categoryTitle)))])]),e("button",{on:{click:function(e){return t.showContent()}}},[t.contentState?t._e():e("img",{attrs:{src:t.plus}}),t.contentState?e("img",{attrs:{src:t.minus}}):t._e()])]),t.contentState&&t.newArr.length>0?e("div",{staticClass:"contents-lists"},t._l(t.newArr,(function(a,n){return e("div",{key:n},[e("div",{staticClass:"contents-list"},[e("div",{staticClass:"contents-list__wrapper"},[e("button",{staticClass:"btn--transparent--img",on:{click:function(e){return t.toLink(a.link)}}},[e("span",{staticClass:"contents-list__icon"},[e("img",{attrs:{src:t.web}})]),e("span",{staticClass:"contents-list__title"},[t._v(" "+t._s(t.filterTitle(a.title))+" ")])])]),e("div",{staticClass:"contents-list__wrapper"},[e("img",{attrs:{src:t.line}}),a.deadline?e("span",{staticClass:"contents-list__expiry"},[t._v("D-"+t._s(t.countDday(a.deadline)))]):t._e(),e("button",{staticClass:"btn--transparent",on:{click:function(e){return t.openMemoModal(n)}}},[e("img",{attrs:{src:t.memo}})]),e("button",{staticClass:"btn--transparent",on:{click:function(e){return t.createFavorites(n)}}},[a.favorite?e("img",{attrs:{src:t.star}}):t._e(),a.favorite?t._e():e("img",{attrs:{src:t.star_gray}})])])]),e("div",[a.contents?e("div",{staticClass:"contents-list"},[e("div",{staticClass:"contents-list__wrapper"},[e("button",{staticClass:"btn--transparent--img",on:{click:function(e){return t.toDetail(a.id)}}},[e("span",{staticClass:"contents-list__icon"},[e("img",{attrs:{src:t.web}})]),e("span",{staticClass:"contents-list__title"},[t._v(" "+t._s(t.filterTitle(a.title))+" ")])])]),e("div",{staticClass:"contents-list__wrapper"},[e("img",{attrs:{src:t.line}}),e("button",{staticClass:"btn--transparent",on:{click:function(e){return t.createFavoriteCollection(n)}}},[a.favorite?e("img",{attrs:{src:t.star}}):t._e(),a.favorite?t._e():e("img",{attrs:{src:t.star_gray}})])])]):t._e()])])})),0):t._e(),t.isMemoModalActive?e("memo-modal-component",{attrs:{contentsId:t.contentsId,memoContents:t.memoContents},on:{"close-modal":function(e){t.isMemoModalActive=!1}}}):t._e()],1)},s=[],i=a("871b"),o=a.n(i),r=a("7e44"),c=a.n(r),l=a("79a5"),d=a.n(l),u=a("6d1b"),m=a.n(u),v=a("8599"),_=a.n(v),p=a("7ec9"),f=a.n(p),g=a("3711"),h=a.n(g),C=a("4431"),b=a("adee"),w=a("5464"),y=a("7561"),k={components:{MemoModalComponent:b["a"]},data(){return{plus:o.a,minus:c.a,line:d.a,memo:m.a,star:_.a,star_gray:f.a,web:h.a,contentState:!1,isMemoModalActive:!1,data:1,isFavoriteListUpdated:0,newArr:[],memoContents:"",contentsId:0}},props:{categoryTitle:String,categoryId:Number},async created(){},watch:{},methods:{async showContent(){await this.$store.dispatch("SORT_DATA",this.categoryId),this.newArr=this.$store.getters.getLatestSortedData,this.contentState=!this.contentState},async createFavorites(t){this.newArr[t].favorite=!this.newArr[t].favorite;try{const e=this.newArr[t].id,a=await Object(y["b"])(e);console.log(a)}catch(e){console.log(e)}},async createFavoriteCollection(t){this.newArr[t].favorite=!this.$store.getters.getCollections[t].favorite;try{const e=this.newArr[t].id,a=await Object(C["b"])(e);console.log(a)}catch(e){console.log(e)}},toCategoryPage(){this.$router.push("/category/"+this.categoryId)},async openMemoModal(t){await this.$store.dispatch("SORT_DATA",this.categoryId),this.newArr=this.$store.getters.getLatestSortedData,this.memoContents=this.newArr[t].comment,this.contentsId=this.newArr[t].id,this.isMemoModalActive=!0},filterTitle(t){return t.length>=30?t.substr(0,30)+"...":t},countDday(t){return Object(w["a"])(t)},toLink(t){window.open(t,"_blank")},toDetail(t){this.$router.push("/collection/"+t)},filterCategoryTitle(t){return t.length>=10?t.substr(0,10)+"...":t}}},A=k,M=a("2877"),D=Object(M["a"])(A,n,s,!1,null,null,null);e["a"]=D.exports},"2a7a":function(t,e,a){t.exports=a.p+"img/plusBtn.79284c99.svg"},3711:function(t,e,a){t.exports=a.p+"img/web.39c02fe0.svg"},"3bd4":function(t,e,a){"use strict";var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"alert-modal"},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"alert-modal-card"},[e("div",{staticClass:"modal-card__header"},[e("p",{domProps:{innerHTML:t._s(t.handleNewLine(this.alertModalContent))}})]),e("div",{staticClass:"modal-card__button-wrapper"},[e("button",{on:{click:function(e){return t.$emit("confirmBtn")}}},[e("p",{domProps:{innerHTML:t._s(t.handleNewLine(this.btnMessage))}})])])])])},s=[],i={name:"AlertModalComponent",props:{alertModalContent:String,btnMessage:String},methods:{handleNewLine(t){return String(t).replace(/(?:\r\n|\r|\n)/g,"</br>")}}},o=i,r=a("2877"),c=Object(r["a"])(o,n,s,!1,null,null,null);e["a"]=c.exports},4431:function(t,e,a){"use strict";a.d(e,"a",(function(){return s})),a.d(e,"d",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"b",(function(){return r}));var n=a("365c");function s(t){return n["a"].post("collections/add",t)}function i(t){return n["a"].post("collections/update",t)}function o(t){return n["a"].delete("collections/delete/?collectionId="+t)}function r(t){return n["a"].patch("collections/favorite/"+t)}},5464:function(t,e,a){"use strict";function n(t){const e=/^(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;return e.test(String(t.toLowerCase()))}function s(t){const e=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;return e.test(String(t))}function i(t){let e="http",a=t.indexOf(e),n=0;while(-1!==a)n++,a=t.indexOf(e,a+1);return n}function o(t){let e=t.split(" ");return e}function r(t){const e=new Date,a=new Date(t),n=e.getTime()-a.getTime();return parseInt(Math.abs(n/864e5)+1)}a.d(e,"e",(function(){return n})),a.d(e,"d",(function(){return s})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return r})),a.d(e,"b",(function(){return o}))},6583:function(t,e,a){t.exports=a.p+"img/favoriteDefault.587f2170.svg"},"6d1b":function(t,e,a){t.exports=a.p+"img/memo.f8f0067d.svg"},7561:function(t,e,a){"use strict";a.d(e,"a",(function(){return s})),a.d(e,"g",(function(){return o})),a.d(e,"d",(function(){return r})),a.d(e,"c",(function(){return i})),a.d(e,"b",(function(){return c})),a.d(e,"e",(function(){return l})),a.d(e,"f",(function(){return d}));var n=a("365c");function s(t){return n["a"].post("contents/add",t)}function i(t){return n["a"].post("contents/addMultiple",t)}function o(t){return n["a"].post("contents/update",t)}function r(t){return n["a"].delete("contents/delete/"+t)}function c(t){return n["a"].patch("contents/favorite/"+t)}function l(t){return n["a"].patch("contents/read/"+t)}function d(t){return n["a"].get("contents/summarize/"+t)}},7598:function(t,e,a){"use strict";var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"modal"},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"modal-card"},[e("div",{staticClass:"modal-card__header"},[e("h1",[t._v(t._s(t.categoryModalTitle))]),e("button",{staticClass:"btn--transparent btn__close",attrs:{type:"button"},on:{click:function(e){return t.$emit("close-modal")}}},[e("img",{attrs:{src:t.closeBtn}})])]),e("div",{staticClass:"modal-card__wrapper"},[e("div",{staticClass:"register-form__wrapper"},[t._m(0),e("div",{staticClass:"flex-container modal-form__wrapper"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.categoryName,expression:"categoryName"}],attrs:{placeholder:"10자 이하 권장"},domProps:{value:t.categoryName},on:{input:function(e){e.target.composing||(t.categoryName=e.target.value)}}})])])]),e("div",{staticClass:"modal-card__category__wrapper"},[e("div",{staticClass:"flex-container-col"},[e("button",{staticClass:"btn--sm btnPrimary",attrs:{disabled:!t.categoryName},on:{click:function(e){return t.categoryEvent()}}},[t._v(" 저장 ")])])]),e("div",{staticClass:"modal-card__category__wrapper"},[e("div",{staticClass:"flex-container"},[e("button",{staticClass:"btn--transparent login-form__link-register",on:{click:function(e){return t.$emit("deleteCategory")}}},[t._v(" "+t._s(t.deleteBtn)+" ")])])])])])},s=[function(){var t=this,e=t._self._c;return e("label",{staticClass:"register-form__label"},[t._v("이름"),e("em",[t._v("*")])])}],i=a("f7ed"),o=a.n(i),r={name:"ModalComponent",data(){return{closeBtn:o.a,categoryName:""}},props:{categoryModalTitle:String,deleteBtn:String},methods:{categoryEvent(){let t=this.categoryName;this.$emit("categoryEvent",t)}}},c=r,l=a("2877"),d=Object(l["a"])(c,n,s,!1,null,null,null);e["a"]=d.exports},"79a5":function(t,e,a){t.exports=a.p+"img/line.293009b2.svg"},"7b82":function(t,e,a){t.exports=a.p+"img/line_white.90c13f63.svg"},"7e44":function(t,e,a){t.exports=a.p+"img/minus.8e7c1397.svg"},"7ec9":function(t,e,a){t.exports=a.p+"img/star_gray.5a8620c4.svg"},"7f97":function(t,e,a){t.exports=a.p+"img/addLink.edbf2541.svg"},8599:function(t,e,a){t.exports=a.p+"img/star.c60dba1e.svg"},"871b":function(t,e,a){t.exports=a.p+"img/plus.56b0c6ab.svg"},"895e":function(t,e,a){"use strict";var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"all-content"},[e("header",[e("div",{staticClass:"content__header",on:{click:function(e){return t.toCategoryPage()}}},[e("h3",[t._v(t._s(t.categoryTitle))])]),e("button",{on:{click:function(e){return t.showContent()}}},[t.contentState?t._e():e("img",{attrs:{src:t.plus}}),t.contentState?e("img",{attrs:{src:t.minus}}):t._e()])]),t.contentState&&t.newArr.length>0?e("div",{staticClass:"contents-lists"},t._l(t.newArr,(function(a,n){return e("div",{key:n},[a.contents?t._e():e("div",{staticClass:"contents-list"},[e("div",{staticClass:"contents-list__wrapper"},[e("button",{staticClass:"btn--transparent--img",on:{click:function(e){return t.toLink(a.link)}}},[e("span",{staticClass:"contents-list__icon"},[e("img",{attrs:{src:t.web}})]),e("span",{staticClass:"contents-list__title"},[t._v(" "+t._s(t.filterTitle(a.title))+" ")])])]),e("div",{staticClass:"contents-list__wrapper"},[e("img",{attrs:{src:t.line}}),a.deadline?e("span",{staticClass:"contents-list__expiry"},[t._v("D-"+t._s(t.countDday(a.deadline)))]):t._e(),e("button",{staticClass:"btn--transparent",on:{click:function(e){return t.openMemoModal(n)}}},[e("img",{attrs:{src:t.memo}})]),e("button",{staticClass:"btn--transparent",on:{click:function(e){return t.createFavorites(n)}}},[a.favorite?e("img",{attrs:{src:t.star}}):t._e(),a.favorite?t._e():e("img",{attrs:{src:t.star_gray}})])])]),a.contents?e("div",[e("div",{staticClass:"contents-list"},[e("div",{staticClass:"contents-list__wrapper"},[e("button",{staticClass:"btn--transparent--img",on:{click:function(e){return t.toDetail(a.id)}}},[e("span",{staticClass:"contents-list__icon"},[e("img",{attrs:{src:t.web}})]),e("span",{staticClass:"contents-list__title"},[t._v(" "+t._s(t.filterTitle(a.title))+" ")])])]),e("div",{staticClass:"contents-list__wrapper"},[e("img",{attrs:{src:t.line}}),e("button",{staticClass:"btn--transparent",on:{click:function(e){return t.createFavoriteCollection(n)}}},[a.favorite?e("img",{attrs:{src:t.star}}):t._e(),a.favorite?t._e():e("img",{attrs:{src:t.star_gray}})])])])]):t._e()])})),0):t._e(),t.isMemoModalActive?e("memo-modal-component",{attrs:{memoContents:t.memoContents,contentsId:t.contentsId},on:{"close-modal":function(e){t.isMemoModalActive=!1}}}):t._e()],1)},s=[],i=a("871b"),o=a.n(i),r=a("7e44"),c=a.n(r),l=a("79a5"),d=a.n(l),u=a("6d1b"),m=a.n(u),v=a("8599"),_=a.n(v),p=a("7ec9"),f=a.n(p),g=a("3711"),h=a.n(g),C=a("4431"),b=a("adee"),w=a("5464"),y=a("7561"),k=a("56d7"),A={components:{MemoModalComponent:b["a"]},data(){return{plus:o.a,minus:c.a,line:d.a,memo:m.a,star:_.a,star_gray:f.a,web:h.a,contentState:!1,isMemoModalActive:!1,data:1,isFavoriteListUpdated:0,contentsData:[],collectionsData:[],newArr:[]}},props:{categoryTitle:String,categoryId:Number},async created(){k["eventBus"].$on("fetchFavoritesList",t=>{this.isFavoriteListUpdated+=t,console.log("CategoryList에 이벤트 버스 도착",this.isFavoriteListUpdated)})},watch:{isFavoriteListUpdated(){this.$store.dispatch("GET_CONTENTS"),this.$store.dispatch("GET_COLLECTIONS")}},methods:{async showContent(){await this.$store.dispatch("SORT_DATA"),this.newArr=this.$store.getters.getLatestSortedData,this.contentState=!this.contentState},async createFavorites(t){this.newArr[t].favorite=!this.newArr[t].favorite;try{const e=this.newArr[t].id,a=await Object(y["b"])(e);console.log(a)}catch(e){console.log(e)}},async createFavoriteCollection(t){this.newArr[t].favorite=!this.newArr[t].favorite;try{const e=this.newArr[t].id,a=await Object(C["b"])(e);console.log(a)}catch(e){console.log(e)}},toCategoryPage(){this.$router.push("/category/all")},async openMemoModal(t){await this.$store.dispatch("SORT_DATA"),this.newArr=this.$store.getters.getLatestSortedData,this.memoContents=this.newArr[t].comment,this.contentsId=this.newArr[t].id,this.isMemoModalActive=!0},filterTitle(t){return t.length>=30?t.substr(0,30)+"...":t},toDetail(t){this.$router.push("/collection/"+t)},countDday(t){return Object(w["a"])(t)},toLink(t){window.open(t,"_blank")}}},M=A,D=a("2877"),L=Object(D["a"])(M,n,s,!1,null,null,null);e["a"]=L.exports},ac9c:function(t,e,a){"use strict";var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"modal"},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"contents-modal-card"},[e("div",{staticClass:"modal-card__header"},[e("h1",[t._v("콘텐츠 추가")]),e("button",{staticClass:"btn--transparent btn__close",attrs:{type:"button"},on:{click:function(e){return t.$emit("close-modal")}}},[e("img",{attrs:{src:t.closeBtn}})])]),e("div",{staticClass:"modal-card__wrapper"},[e("div",{staticClass:"register-form__wrapper"},[t._m(0),e("div",{staticClass:"flex-container modal-form__wrapper"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.link,expression:"link"}],attrs:{placeholder:"URL 입력",oninput:"this.value = this.value.replace(/ +/g, ' ')"},domProps:{value:t.link},on:{input:function(e){e.target.composing||(t.link=e.target.value)}}}),e("button",{staticClass:"btn--transparent btn__favorites",on:{click:function(e){return t.addFavorites()}}},[e("img",{directives:[{name:"show",rawName:"v-show",value:!t.favorite,expression:"!favorite"}],attrs:{src:t.star_border}}),e("img",{directives:[{name:"show",rawName:"v-show",value:t.favorite,expression:"favorite"}],attrs:{src:t.star}})])])]),e("div",{staticClass:"flex-container-col"},[e("button",{directives:[{name:"show",rawName:"v-show",value:!t.isDetailSettingActive,expression:"!isDetailSettingActive"}],staticClass:"btn__deleteuser",on:{click:t.setDetail}},[t._v(" 세부 설정 ")])]),e("div",{directives:[{name:"show",rawName:"v-show",value:t.isDetailSettingActive,expression:"isDetailSettingActive"}]},[e("div",{staticClass:"register-form__wrapper"},[e("label",{staticClass:"register-form__label"},[t._v("이름")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],attrs:{placeholder:"30자 이하 권장"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}})]),e("div",{staticClass:"flex-container modal-form__wrapper"},[e("div",{staticClass:"register-form__wrapper"},[e("label",{staticClass:"register-form__label"},[t._v("카테고리")]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.categoryName,expression:"categoryName"}],staticClass:"contents-modal__select",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.categoryName=e.target.multiple?a:a[0]}}},[e("option",{attrs:{value:"",selected:""}},[t._v("카테고리 선택")]),t._l(t.myCategories,(function(a,n){return e("option",{key:n},[t._v(" "+t._s(a.name)+" ")])}))],2)]),e("div",{staticClass:"register-form__wrapper"},[e("label",{staticClass:"register-form__label"},[t._v("읽을 기한")]),e("div",{staticClass:"flex-container modal-form__wrapper"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.deadline,expression:"deadline"}],attrs:{type:"date"},domProps:{value:t.deadline},on:{input:function(e){e.target.composing||(t.deadline=e.target.value)}}}),e("span",{staticClass:"contents-modal__date-description"},[t._v("D-DAY에 알림을 보내드립니다")])])])]),e("div",{staticClass:"register-form__wrapper"},[e("label",{staticClass:"register-form__label"},[t._v("메모")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.comment,expression:"comment"}],attrs:{placeholder:"500자 이하",maxlength:"500"},domProps:{value:t.comment},on:{input:function(e){e.target.composing||(t.comment=e.target.value)}}})])])]),e("div",{staticClass:"modal-card__collection__wrapper"},[e("span",{staticClass:"modal-card__text"},[e("img",{attrs:{src:t.alert_circle}}),t._v("여러 링크들을 묶어서 저장하고 싶다면?")]),e("button",{staticClass:"btn--transparent btn__collection",on:{click:function(e){return t.openCollectionModal()}}},[t._v(" 콜렉션으로 저장하기 >> ")])]),e("div",{staticClass:"flex-container-col"},[e("button",{staticClass:"btn--sm btnPrimary",attrs:{disabled:!t.link},on:{click:function(e){return t.createContent()}}},[t._v(" 저장 ")])])]),1==t.isAlertModalActive?e("AlertModalComponent",{attrs:{alertModalContent:t.alertModalContent,btnMessage:t.btnMessage},on:{confirmBtn:function(e){t.isAlertModalActive=!1}}}):t._e()],1)},s=[function(){var t=this,e=t._self._c;return e("label",{staticClass:"register-form__label"},[t._v("링크"),e("em",[t._v("*")])])}],i=a("f7ed"),o=a.n(i),r=a("da44"),c=a.n(r),l=a("8599"),d=a.n(l),u=a("1680"),m=a.n(u),v=a("7561"),_=a("c24f"),p=a("5464"),f=a("3bd4"),g={components:{AlertModalComponent:f["a"]},data(){return{closeBtn:o.a,star_border:c.a,star:d.a,alert_circle:m.a,isDetailSettingActive:!1,myCategories:{},link:"",title:"",deadline:"",comment:"",categoryName:"",favorite:!1,data:{},linkList:[],isAlertModalActive:!1,AlertModalContent:"",btnMessage:"네"}},mounted(){this.getMyCategory()},props:{contentsData:Object},watch:{link:function(){this.linkList=Object(p["b"])(this.link)}},computed:{isTextLink(){return""!=this.link?Object(p["d"])(this.link):null},countLink(){return""!=this.link?Object(p["c"])(this.link):null}},methods:{setDetail(){this.isDetailSettingActive=!0},addFavorites(){this.favorite=!this.favorite},async getMyCategory(){try{const t=await Object(_["b"])();this.myCategories=t.data.categories}catch(t){console.log(t)}},async createContent(){if(1==this.countLink){const e={link:this.link,favorite:this.favorite,comment:this.comment,deadline:this.deadline,categoryName:this.categoryName,title:this.title};Object.keys(e).forEach(t=>(""==e[t]||void 0==e[t])&&delete e[t]),console.log(e);try{const t=await Object(v["a"])(e);console.log(t),this.$emit("close-modal")}catch(t){console.log(t),this.alertModalContent=t.response.data.message,this.isAlertModalActive=!0}}else if(this.countLink>=2){const t=this.linkList;this.$emit("isLinkNotSingle",t)}},openCollectionModal(){const t=this.linkList;this.$emit("openCollectionModal",t)}}},h=g,C=a("2877"),b=Object(C["a"])(h,n,s,!1,null,null,null);e["a"]=b.exports},ad92:function(t,e,a){"use strict";var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"confirm-modal"},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"confirm-modal-card"},[e("div",{staticClass:"modal-card__header"},[t.isCloseBtnShow?e("div",{staticClass:"button-wrapper"},[e("button",{staticClass:"btn--transparent btn__close",attrs:{type:"button"},on:{click:function(e){return t.$emit("close-modal")}}},[e("img",{attrs:{src:t.closeBtn}})])]):t._e(),e("p",{domProps:{innerHTML:t._s(t.handleNewLine(this.confirmModalContent))}})]),e("div",{staticClass:"modal-card__button-wrapper"},[e("button",{attrs:{id:"btn__confirm"},on:{click:function(e){return t.$emit("leftBtn")}}},[t._v(" "+t._s(t.leftBtnMessage)+" ")]),e("button",{on:{click:function(e){return t.$emit("rightBtn")}}},[t._v(t._s(t.rightBtnMessage))])])])])},s=[],i=a("f7ed"),o=a.n(i),r={name:"ConfirmModalComponent",props:{confirmModalContent:String,leftBtnMessage:String,rightBtnMessage:String,isCloseBtnShow:Boolean},data:function(){return{closeBtn:o.a}},methods:{handleNewLine(t){return String(t).replace(/(?:\r\n|\r|\n)/g,"</br>")}}},c=r,l=a("2877"),d=Object(l["a"])(c,n,s,!1,null,null,null);e["a"]=d.exports},adee:function(t,e,a){"use strict";var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"modal"},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"modal-card"},[e("div",{staticClass:"modal-card__header"},[e("h1",[t._v("메모")]),e("button",{staticClass:"btn--transparent btn__close",attrs:{type:"button"},on:{click:function(e){return t.editMemo()}}},[e("img",{attrs:{src:t.closeBtn}})])]),e("div",{staticClass:"modal-card__wrapper"},[e("div",{staticClass:"flex-container modal-form__wrapper"},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.comment,expression:"comment"}],staticClass:"modal-form__textarea",attrs:{placeholder:"",rows:"5",maxlength:"500"},domProps:{value:t.comment},on:{input:function(e){e.target.composing||(t.comment=e.target.value)}}})])])])])},s=[],i=a("f7ed"),o=a.n(i),r=a("7561"),c=a("56d7"),l={name:"MemoModalComponent",data(){return{closeBtn:o.a,comment:"",data:1}},props:{memoContents:String,contentsId:Number},created(){this.comment=this.memoContents,this.id=this.contentsId},methods:{async editMemo(){try{const t={id:this.id,comment:this.comment};Object.keys(t).forEach(e=>(""==t[e]||void 0==t[e])&&delete t[e]);const e=await Object(r["g"])(t);console.log(e),this.$emit("close-modal"),"/main"!=this.$route.fullpath&&c["eventBus"].$emit("memoEvent",this.data)}catch(t){console.log(t)}}}},d=l,u=a("2877"),m=Object(u["a"])(d,n,s,!1,null,null,null);e["a"]=m.exports},c405:function(t,e,a){"use strict";a.d(e,"a",(function(){return s})),a.d(e,"c",(function(){return i})),a.d(e,"b",(function(){return o}));var n=a("365c");function s(t){return n["a"].post("category/add",t)}function i(t){return n["a"].post("category/update",t)}function o(t){return n["a"].delete("category/delete/"+t)}},d559:function(t,e,a){"use strict";var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"modal"},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"collection-modal-card"},[e("div",{staticClass:"modal-card__header"},[e("h1",[t._v("콜렉션 추가")]),e("button",{staticClass:"btn--transparent btn__close",attrs:{type:"button"},on:{click:function(e){return t.$emit("close-modal")}}},[e("img",{attrs:{src:t.closeBtn}})])]),e("div",{staticClass:"modal-card__wrapper"},[e("div",{staticClass:"flex-container modal-form__wrapper"},[e("div",{staticClass:"register-form__wrapper"},[t._m(0),e("input",{directives:[{name:"model",rawName:"v-model",value:t.collectionData.title,expression:"collectionData.title"}],attrs:{placeholder:"10자 이하 권장"},domProps:{value:t.collectionData.title},on:{input:function(e){e.target.composing||t.$set(t.collectionData,"title",e.target.value)}}})]),e("div",{staticClass:"register-form__wrapper category__wrapper"},[e("label",{staticClass:"register-form__label"},[t._v("카테고리")]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.categoryName,expression:"categoryName"}],staticClass:"contents-modal__select",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.categoryName=e.target.multiple?a:a[0]}}},[e("option",{attrs:{value:""}},[t._v("카테고리 선택")]),t._l(t.myCategories,(function(a,n){return e("option",{key:n},[t._v(" "+t._s(a.name)+" ")])}))],2)]),e("div",{staticClass:"flex-container favorite__wrapper"},[e("button",{staticClass:"btn--transparent btn__favorites",on:{click:function(e){return t.addFavorites()}}},[e("img",{directives:[{name:"show",rawName:"v-show",value:!t.collectionData.favorite,expression:"!collectionData.favorite"}],attrs:{src:t.star_border}}),e("img",{directives:[{name:"show",rawName:"v-show",value:t.collectionData.favorite,expression:"collectionData.favorite"}],attrs:{src:t.star}})])])]),e("div",{staticClass:"register-form__wrapper"},[e("label",{staticClass:"register-form__label"},[t._v("콜렉션 설명")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.collectionData.comment,expression:"collectionData.comment"}],attrs:{placeholder:"100자 이하",maxlength:"100"},domProps:{value:t.collectionData.comment},on:{input:function(e){e.target.composing||t.$set(t.collectionData,"comment",e.target.value)}}})]),e("div",{staticClass:"register-form__wrapper"},[t._m(1),e("div",{staticClass:"link__wrapper"},t._l(this.collectionData.contentLinkList,(function(a,n){return e("div",{key:n,staticClass:"link__wrapper-inner"},[e("div",{staticClass:"link__index"},[t._v(t._s(n+1))]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.collectionData.contentLinkList[n],expression:"collectionData.contentLinkList[index]"}],attrs:{placeholder:"URL 입력"},domProps:{value:t.collectionData.contentLinkList[n]},on:{input:function(e){e.target.composing||t.$set(t.collectionData.contentLinkList,n,e.target.value)}}}),1!=t.collectionData.contentLinkList.length?e("button",{staticClass:"btn--transparent btn__deleteLink",on:{click:function(e){return t.deleteInput(n)}}},[e("img",{attrs:{src:t.minus}})]):t._e()])})),0),e("div",{staticClass:"flex-container-col modal-card__btn__wrapper"},[e("button",{staticClass:"btn--transparent btn--plus",on:{click:function(e){return t.createInput()}}},[e("img",{attrs:{src:t.add_link}})])])])]),e("div",{staticClass:"flex-container-col modal-card__btn__wrapper"},[e("button",{staticClass:"btn--sm btnPrimary",attrs:{disabled:""==t.collectionData.contentLinkList||!t.collectionData.title},on:{click:function(e){return t.createCollection()}}},[t._v(" 저장 ")])])]),1==t.isAlertModalActive?e("AlertModalComponent",{attrs:{alertModalContent:t.alertModalContent,btnMessage:t.btnMessage},on:{confirmBtn:function(e){t.isAlertModalActive=!1}}}):t._e()],1)},s=[function(){var t=this,e=t._self._c;return e("label",{staticClass:"register-form__label"},[t._v("콜렉션 이름"),e("em",[t._v("*")])])},function(){var t=this,e=t._self._c;return e("label",{staticClass:"register-form__label"},[t._v("링크"),e("em",[t._v("*")])])}],i=a("f7ed"),o=a.n(i),r=a("da44"),c=a.n(r),l=a("8599"),d=a.n(l),u=a("1680"),m=a.n(u),v=a("7f97"),_=a.n(v),p=a("7e44"),f=a.n(p),g=a("c24f"),h=a("3bd4"),C=a("4431"),b={components:{AlertModalComponent:h["a"]},data(){return{closeBtn:o.a,star_border:c.a,star:d.a,alert_circle:m.a,add_link:_.a,isDetailSettingActive:!1,minus:f.a,myCategories:{},isAlertModalActive:!1,alertModalContent:"",btnMessage:"네",isDeleteModalActive:!1,deleteModalContent:"해당 콜렉션을 \n삭제하시겠습니까?",categoryName:""}},props:{collectionData:{type:Object,default:()=>({contentLinkList:["1","2"]})}},created(){this.getMyCategory(),this.collectionData.contentLinkList[0]=""},methods:{addFavorites(){this.collectionData.favorite=!this.collectionData.favorite},async getMyCategory(){try{const t=await Object(g["b"])();this.myCategories=t.data.categories}catch(t){console.log(t)}},createInput(){this.collectionData.contentLinkList.push("")},deleteInput(t){this.collectionData.contentLinkList.splice(t,1)},async createCollection(){const t={title:this.collectionData.title,comment:this.collectionData.comment,categoryName:this.categoryName,contentLinkList:this.collectionData.contentLinkList.filter((function(t){return null!==t&&void 0!==t&&""!==t})),favorite:this.collectionData.favorite};Object.keys(t).forEach(e=>(""==t[e]||void 0==t[e])&&delete t[e]);try{const e=await Object(C["a"])(t);console.log(e),this.$emit("close-modal")}catch(e){console.log(e),this.alertModalContent=e.response.data.message,this.isAlertModalActive=!0}finally{this.collectionData.title="",this.collectionData.comment="",this.collectionData.contentsLinkList="",this.collectionData.categoryName="",this.collectionData.favorite=!1}}}},w=b,y=a("2877"),k=Object(y["a"])(w,n,s,!1,null,null,null);e["a"]=k.exports},da44:function(t,e,a){t.exports=a.p+"img/star_border.026e7381.svg"},e62f:function(t,e,a){"use strict";var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"favorite-content"},[e("header",[e("div",{staticClass:"favorite-content__header-wrapper",on:{click:function(e){return t.toCategoryPage()}}},[e("h3",[t._v("즐겨찾기")]),e("img",{attrs:{src:t.star}})]),e("button",{on:{click:function(e){return t.showContent()}}},[t.contentState?t._e():e("img",{attrs:{src:t.plus}}),t.contentState?e("img",{attrs:{src:t.minus}}):t._e()])]),t.newArr.length>0?e("div",{staticClass:"favorite-lists",class:[t.contentState?"favoriteExtend":"favoriteDefault"]},t._l(t.newArr,(function(a,n){return e("div",{key:n},[a.contents?t._e():e("div",{staticClass:"favorite-list"},[e("div",{staticClass:"favorite-list__wrapper"},[e("div",{staticClass:"favorite-list__img-wrapper"},[e("div",{staticClass:"favorite-list__img"},[a.coverImg.length>0?e("img",{attrs:{src:a.coverImg,onerror:"this.style.display='none'"}}):e("img",{staticClass:"defaultImg",attrs:{src:t.defaultImg}}),a.deadline?e("span",{staticClass:"favorite-list__expiry"},[t._v("D-"+t._s(t.countDday(a.deadline)))]):t._e()]),e("div",{staticClass:"favorite-list__btn-wrapper"},[e("button",{staticClass:"btn--transparent",on:{click:function(e){return t.openMemoModal(n)}}},[e("img",{attrs:{src:t.memo}})]),e("img",{attrs:{src:t.line_white}}),e("button",{staticClass:"btn--transparent",on:{click:function(e){return t.createFavorites(n)}}},[a.favorite?e("img",{attrs:{src:t.star}}):t._e(),a.favorite?t._e():e("img",{attrs:{src:t.star_gray}})])])])]),e("div",{staticClass:"favorite-list__wrapper-text"},[e("p",{staticClass:"favorite-list__title",on:{click:function(e){return t.toLink(a.link)}}},[t._v(" "+t._s(t.filterTitle(a.title))+" ")]),e("div",{staticClass:"favorite-list__inner"},[a.link?e("span",{staticClass:"favorite-list__domain"},[t._v(t._s(t.filterDomain(a.link)))]):t._e(),e("img",{attrs:{src:t.line}}),e("span",{staticClass:"favorite-list__date"},[t._v(t._s(a.createdAt.substr(0,10)))])])])]),a.contents?e("div",{staticClass:"favorite-list"},[a.contents?e("div",{staticClass:"favorite-list__wrapper"},[e("div",{staticClass:"favorite-list__img-wrapper"},[t.newArr[n].contents?e("div",{staticClass:"favorite-list__img"},[a.contents[0].coverImg.length>0?e("img",{attrs:{src:a.contents[0].coverImg,onerror:"this.style.display='none'"}}):e("img",{attrs:{src:t.defaultImg}})]):t._e(),e("div",{staticClass:"favorite-list__btn-wrapper"},[e("img",{attrs:{src:t.line_white}}),e("button",{staticClass:"btn--transparent",on:{click:function(e){return t.createFavorites(n)}}},[a.favorite?e("img",{attrs:{src:t.star}}):t._e(),a.favorite?t._e():e("img",{attrs:{src:t.star_gray}})])])])]):t._e(),e("div",{staticClass:"favorite-list__wrapper-text"},[e("p",{staticClass:"favorite-list__title",on:{click:function(e){return t.toDetail(a.id)}}},[t._v(" "+t._s(t.filterTitle(a.title))+" ")]),e("div",{staticClass:"favorite-list__inner"},[e("span",{staticClass:"favorite-list__domain"},[t._v("Collection")]),e("img",{attrs:{src:t.line}}),e("span",{staticClass:"favorite-list__date"},[t._v(t._s(a.createdAt.substr(0,10)))])])])]):t._e()])})),0):t._e(),t.isMemoModalActive?e("memo-modal-component",{attrs:{memoContents:t.memoContents,contentsId:t.contentsId},on:{"close-modal":function(e){t.isMemoModalActive=!1}}}):t._e()],1)},s=[],i=a("871b"),o=a.n(i),r=a("7e44"),c=a.n(r),l=a("79a5"),d=a.n(l),u=a("7b82"),m=a.n(u),v=a("6d1b"),_=a.n(v),p=a("8599"),f=a.n(p),g=a("7ec9"),h=a.n(g),C=a("adee"),b=a("7561"),w=a("5464"),y=a("6583"),k=a.n(y),A={components:{MemoModalComponent:C["a"]},data(){return{plus:o.a,minus:c.a,line:d.a,line_white:m.a,memo:_.a,defaultImg:k.a,star:f.a,star_gray:h.a,contentState:!1,isMemoModalActive:!1,isFavoriteListUpdated:0,data:1,newArr:[]}},async created(){await this.$store.dispatch("GET_FAVORITES"),this.newArr=this.$store.getters.getLatestSortedFavorite},watch:{isFavoriteListUpdated:function(){this.$store.dispatch("GET_FAVORITES"),this.newArr=this.$store.getters.getLatestSortedFavorite}},methods:{async showContent(){this.contentState=!this.contentState,await this.$store.dispatch("GET_FAVORITES"),this.newArr=this.$store.getters.getLatestSortedFavorite},async createFavorites(t){console.log("인덱스",t),this.newArr[t].favorite=!this.newArr[t].favorite;try{const e=this.newArr[t].id,a=await Object(b["b"])(e);console.log(a),this.$store.dispatch("GET_FAVORITES"),this.newArr=this.$store.getters.getLatestSortedFavorite}catch(e){console.log(e)}},async openMemoModal(t){await this.$store.dispatch("GET_FAVORITES"),this.newArr=this.$store.getters.getLatestSortedFavorite,this.memoContents=this.newArr[t].comment,this.contentsId=this.newArr[t].id,this.isMemoModalActive=!0},filterTitle(t){return t.length>=20?t.substr(0,20)+"...":t},toLink(t){window.open(t,"_blank")},toDetail(t){this.$router.push("/collection/"+t)},filterDomain(t){let e;if(1==t.includes("www")){let a=t.split(".");a=a[1],e=a}else{let a=t.indexOf("//"),n=t.substring(a+2);e=n.split("."),e=e[0]}return e},countDday(t){return Object(w["a"])(t)},toCategoryPage(){this.$emit("toCategoryPage")}}},M=A,D=a("2877"),L=Object(D["a"])(M,n,s,!1,null,null,null);e["a"]=L.exports},f7ed:function(t,e,a){t.exports=a.p+"img/closeBtn.a9f6b6a0.svg"}}]);
//# sourceMappingURL=chunk-e1ac2f2a.fcf59766.js.map