(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e511d77"],{1680:function(t,e,a){t.exports=a.p+"img/alert-circle.78e81ce6.svg"},"3bd4":function(t,e,a){"use strict";var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"alert-modal"},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"alert-modal-card"},[e("div",{staticClass:"modal-card__header"},[e("p",{domProps:{innerHTML:t._s(t.handleNewLine(this.alertModalContent))}})]),e("div",{staticClass:"modal-card__button-wrapper"},[e("button",{on:{click:function(e){return t.$emit("confirmBtn")}}},[e("p",{domProps:{innerHTML:t._s(t.handleNewLine(this.btnMessage))}})])])])])},n=[],l={name:"AlertModalComponent",props:{alertModalContent:String,btnMessage:String},methods:{handleNewLine(t){return String(t).replace(/(?:\r\n|\r|\n)/g,"</br>")}}},i=l,c=a("2877"),s=Object(c["a"])(i,o,n,!1,null,null,null);e["a"]=s.exports},4431:function(t,e,a){"use strict";a.d(e,"a",(function(){return n})),a.d(e,"d",(function(){return l})),a.d(e,"c",(function(){return i})),a.d(e,"b",(function(){return c}));var o=a("365c");function n(t){return o["a"].post("collections/add",t)}function l(t){return o["a"].post("collections/update",t)}function i(t){return o["a"].delete("collections/delete/?collectionId="+t)}function c(t){return o["a"].patch("collections/favorite/"+t)}},"5fde":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"collection-view"},[t.collectionData?t._e():e("div",[e("h2",[t._v("(임시)콜렉션 정보가 존재하지 않습니다.")])]),t.collectionData?e("div",[e("header",{staticClass:"collection__header"},[e("div",{staticClass:"flex-container"},[e("span",{staticClass:"collection__header-name"},[t._v("Collection")]),e("button",{staticClass:"btn--transparent",on:{click:function(e){return t.createFavorites()}}},[t.collectionData.favorite?e("img",{attrs:{src:t.star}}):t._e(),t.collectionData.favorite?t._e():e("img",{attrs:{src:t.star_gray}})])]),t.collectionData?e("div",{staticClass:"collection__header-wrapper"},[e("div",{staticClass:"flex-container"},[t.collectionData.title?e("p",{staticClass:"collection__header-title"},[t._v(" "+t._s(t.filterTitle(t.collectionData.title))+" ")]):t._e(),t.collectionData.contents?e("span",{staticClass:"collection__header-num"},[t._v("총 "+t._s(t.collectionData.contents.length)+"개")]):t._e()]),e("button",{staticClass:"btn--transparent btn__editContents",on:{click:function(e){return t.openEditModal()}}},[e("img",{attrs:{src:t.edit}})])]):t._e(),e("p",{staticClass:"collection__header-description"},[t._v(" "+t._s(t.collectionData.comment)+" ")])]),t.collectionData.contents?e("div",t._l(t.collectionData.contents,(function(a,o){return e("div",{key:o,staticClass:"flex-container--col"},[e("div",{staticClass:"collection-contents__wrapper"},[e("div",{staticClass:"collection-contents__index"},[t._v(" "+t._s(o+1)+" ")]),t.collectionData?e("div",{staticClass:"collection-contents__text-wrapper"},[a.title?e("p",{staticClass:"collection-contents__title",on:{click:function(e){return t.toLink(a.link)}}},[t._v(" "+t._s(t.filterTitle(a.title))+" ")]):t._e(),a.descrpition?e("p",{staticClass:"collection-contents__description"},[t._v(" "+t._s(t.filterDescript(a.description))+" ")]):t._e(),a.link?e("span",{staticClass:"collection-contents__domain"},[t._v(" "+t._s(t.filterDomain(a.link))+" ")]):t._e()]):t._e(),t.collectionData.contents?e("div",{staticClass:"collection-contents__img"},[e("img",{attrs:{src:a.coverImg,onerror:"this.style.display='none'"}})]):t._e()]),e("hr",{attrs:{width:"90%",color:"#F4F6F8",size:"1"}})])})),0):t._e()]):t._e(),t.isCollectionModalActive?e("collection-edit-modal-component",{attrs:{collectionData:t.collectionData},on:{"close-modal":function(e){t.isCollectionModalActive=!1}}}):t._e(),1==t.isAlertModalActive?e("alert-modal-component",{attrs:{alertModalContent:t.alertModalContent,btnMessage:t.btnMessage},on:{confirmBtn:function(e){t.isAlertModalActive=!1}}}):t._e()],1)},n=[],l=a("c24f"),i=a("8599"),c=a.n(i),s=a("7ec9"),r=a.n(s),d=a("4431"),_=a("f232"),u=a.n(_),m=a("6eb7"),p=a("3bd4"),v={components:{CollectionEditModalComponent:m["a"],AlertModalComponent:p["a"]},data(){return{star:c.a,star_gray:r.a,edit:u.a,collectionData:{},isCollectionModalActive:!1,alertModalContent:"",btnMessage:"네",isAlertModalActive:!1}},created(){this.fetchCollectionsList()},watch:{collectionData(){this.fetchCollectionsList()}},methods:{async fetchCollectionsList(){try{const t=await Object(l["c"])();this.collectionData=t.data.collections,this.collectionData=this.collectionData.filter(t=>t.id==this.$route.params.id),this.collectionData=this.collectionData[0]}catch(t){console.log(t)}},filterTitle(t){return t.length>=30?t.substr(0,30)+"...":t},filterDomain(t){let e;if(1==t.includes("www")){let a=t.split(".");a=a[1],e=a}else{let a=t.indexOf("//"),o=t.substring(a+2);e=o.split("."),e=e[0]}return e},async createFavorites(){this.collectionData.favorite=!this.collectionData.favorite;try{const t=await Object(d["b"])(this.$route.params.id);console.log(t)}catch(t){console.log(t)}},filterDescript(t){return t.length>=90?t.substr(0,90)+"...":t},toLink(t){window.open(t,"_blank")},openEditModal(){this.isCollectionModalActive=!0}}},f=v,g=a("2877"),C=Object(g["a"])(f,o,n,!1,null,null,null);e["default"]=C.exports},"6eb7":function(t,e,a){"use strict";var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"modal"},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"collection-modal-card"},[e("div",{staticClass:"modal-card__header"},[e("h1",[t._v("콜렉션 수정")]),e("button",{staticClass:"btn--transparent btn__close",attrs:{type:"button"},on:{click:function(e){return t.$emit("close-modal")}}},[e("img",{attrs:{src:t.closeBtn}})])]),e("div",{staticClass:"modal-card__wrapper"},[e("div",{staticClass:"flex-container modal-form__wrapper"},[e("div",{staticClass:"register-form__wrapper"},[t._m(0),e("input",{directives:[{name:"model",rawName:"v-model",value:t.collectionData.title,expression:"collectionData.title"}],attrs:{placeholder:"10자 이하 권장"},domProps:{value:t.collectionData.title},on:{input:function(e){e.target.composing||t.$set(t.collectionData,"title",e.target.value)}}})]),e("div",{staticClass:"register-form__wrapper category__wrapper"},[e("label",{staticClass:"register-form__label"},[t._v("카테고리")]),null==t.collectionData.category?e("select",{directives:[{name:"model",rawName:"v-model",value:t.categoryName,expression:"categoryName"}],staticClass:"contents-modal__select",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.categoryName=e.target.multiple?a:a[0]}}},[e("option",{attrs:{value:""}},[t._v("미분류")]),t._l(t.myCategories,(function(a,o){return e("option",{key:o},[t._v(" "+t._s(a.name)+" ")])}))],2):t._e(),t.collectionData.category?e("select",{directives:[{name:"model",rawName:"v-model",value:t.collectionData.category.name,expression:"collectionData.category.name"}],staticClass:"contents-modal__select",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.collectionData.category,"name",e.target.multiple?a:a[0])}}},[e("option",{attrs:{value:""}},[t._v("미분류")]),t._l(t.myCategories,(function(a,o){return e("option",{key:o},[t._v(" "+t._s(a.name)+" ")])}))],2):t._e()]),e("div",{staticClass:"flex-container favorite__wrapper"},[e("button",{staticClass:"btn--transparent btn__favorites",on:{click:function(e){return t.addFavorites()}}},[e("img",{directives:[{name:"show",rawName:"v-show",value:!t.collectionData.favorite,expression:"!collectionData.favorite"}],attrs:{src:t.star_border}}),e("img",{directives:[{name:"show",rawName:"v-show",value:t.collectionData.favorite,expression:"collectionData.favorite"}],attrs:{src:t.star}})])])]),e("div",{staticClass:"register-form__wrapper"},[e("label",{staticClass:"register-form__label"},[t._v("콜렉션 설명")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.collectionData.comment,expression:"collectionData.comment"}],attrs:{placeholder:"100자 이하",maxlength:"100"},domProps:{value:t.collectionData.comment},on:{input:function(e){e.target.composing||t.$set(t.collectionData,"comment",e.target.value)}}})]),e("div",{staticClass:"register-form__wrapper"},[t._m(1),e("div",{staticClass:"link__wrapper"},t._l(this.collectionData.contents,(function(a,o){return e("div",{key:o,staticClass:"link__wrapper-inner"},[e("div",{staticClass:"link__index"},[t._v(t._s(o+1))]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.collectionData.contents[o].link,expression:"collectionData.contents[index].link"}],attrs:{placeholder:"URL 입력"},domProps:{value:t.collectionData.contents[o].link},on:{input:function(e){e.target.composing||t.$set(t.collectionData.contents[o],"link",e.target.value)}}}),o>0?e("button",{staticClass:"btn--transparent btn__deleteLink",on:{click:function(e){return t.deleteInput(o)}}},[e("img",{attrs:{src:t.minus}})]):t._e()])})),0),t.collectionData.contents[0].link?e("div",{staticClass:"flex-container-col modal-card__btn__wrapper"},[e("button",{staticClass:"btn--transparent btn--plus",on:{click:function(e){return t.createInput(t.collectionData.contents.length)}}},[e("img",{attrs:{src:t.add_link}})])]):t._e()])]),e("div",{staticClass:"modal-card__btn__wrapper"},[e("div",{staticClass:"flex-container"},[e("button",{staticClass:"btn--transparent login-form__link-register",on:{click:function(e){t.isDeleteModalActive=!0}}},[t._v(" 콘텐츠 삭제 ")])])]),e("div",{staticClass:"flex-container-col modal-card__btn__wrapper"},[e("button",{staticClass:"btn--sm btnPrimary",attrs:{disabled:""==t.collectionData.contents.link||!t.collectionData.title},on:{click:function(e){return t.editCollection()}}},[t._v(" 저장 ")])])]),1==t.isDeleteModalActive?e("AlertModalComponent",{attrs:{alertModalContent:t.deleteModalContent,btnMessage:t.btnMessage},on:{confirmBtn:function(e){return t.deleteCollection()}}}):t._e(),1==t.isAlertModalActive?e("AlertModalComponent",{attrs:{alertModalContent:t.alertModalContent,btnMessage:t.btnMessage},on:{confirmBtn:function(e){t.isAlertModalActive=!1}}}):t._e()],1)},n=[function(){var t=this,e=t._self._c;return e("label",{staticClass:"register-form__label"},[t._v("콜렉션 이름"),e("em",[t._v("*")])])},function(){var t=this,e=t._self._c;return e("label",{staticClass:"register-form__label"},[t._v("링크"),e("em",[t._v("*")])])}],l=a("f7ed"),i=a.n(l),c=a("da44"),s=a.n(c),r=a("8599"),d=a.n(r),_=a("1680"),u=a.n(_),m=a("7f97"),p=a.n(m),v=a("7e44"),f=a.n(v),g=a("c24f"),C=a("3bd4"),h=a("4431"),b={components:{AlertModalComponent:C["a"]},data(){return{closeBtn:i.a,star_border:s.a,star:d.a,alert_circle:u.a,add_link:p.a,isDetailSettingActive:!1,minus:f.a,myCategories:{},isAlertModalActive:!1,alertModalContent:"",btnMessage:"네",isDeleteModalActive:!1,deleteModalContent:"해당 콜렉션을 \n삭제하시겠습니까?",categoryName:""}},props:{collectionData:[]},created(){this.getMyCategory()},methods:{addFavorites(){this.collectionData.favorite=!this.collectionData.favorite},async getMyCategory(){try{const t=await Object(g["b"])();this.myCategories=t.data.categories}catch(t){console.log(t)}},createInput(t){const e={link:""};this.collectionData.contents.push(e),console.log(t)},deleteInput(t){this.collectionData.contents.splice(t,1)},async editCollection(){const t=this.collectionData.contents,e=t.map(t=>t.link);console.log(e),console.log("콜렉션 수정 - 링크 목록");const a={title:this.collectionData.title,comment:this.collectionData.comment,categoryName:this.categoryName||this.collectionData.category.name,contentLinkList:e,collectionId:this.collectionData.id,favorite:this.collectionData.favorite};Object.keys(a).forEach(t=>(""==a[t]||void 0==a[t])&&delete a[t]),console.log("콜렉션 모달",a),this.$emit("collectionEdit",a);try{const t=await Object(h["d"])(a);console.log(t),this.$emit("close-modal"),console.log(" 최종 보낼 값",a)}catch(o){console.log(o),this.alertModalContent=o.response.data.message,this.isAlertModalActive=!0}},async deleteCollection(){this.isDeleteModalActive=!1;try{const t=await Object(h["c"])(this.collectionData.id);console.log(t),this.$emit("close-modal")}catch(t){console.log(t),this.alertModalContent=t.response.data.message,this.isAlertModalActive=!0}}}},D=b,M=a("2877"),w=Object(M["a"])(D,o,n,!1,null,null,null);e["a"]=w.exports},"7e44":function(t,e,a){t.exports=a.p+"img/minus.8e7c1397.svg"},"7ec9":function(t,e,a){t.exports=a.p+"img/star_gray.5a8620c4.svg"},"7f97":function(t,e,a){t.exports=a.p+"img/addLink.edbf2541.svg"},8599:function(t,e,a){t.exports=a.p+"img/star.c60dba1e.svg"},da44:function(t,e,a){t.exports=a.p+"img/star_border.026e7381.svg"},f232:function(t,e,a){t.exports=a.p+"img/edit.c5b95152.svg"},f7ed:function(t,e,a){t.exports=a.p+"img/closeBtn.a9f6b6a0.svg"}}]);
//# sourceMappingURL=chunk-7e511d77.df0a6ad4.js.map