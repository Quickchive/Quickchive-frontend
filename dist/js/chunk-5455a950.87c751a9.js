(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5455a950"],{1680:function(t,e,n){t.exports=n.p+"img/alert-circle.78e81ce6.svg"},"3bd4":function(t,e,n){"use strict";var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"alert-modal"},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"alert-modal-card"},[e("div",{staticClass:"modal-card__header"},[e("p",{domProps:{innerHTML:t._s(t.handleNewLine(this.alertModalContent))}})]),e("div",{staticClass:"modal-card__button-wrapper"},[e("button",{on:{click:function(e){return t.$emit("confirmBtn")}}},[e("p",{domProps:{innerHTML:t._s(t.handleNewLine(this.btnMessage))}})])])])])},i=[],s={name:"AlertModalComponent",props:{alertModalContent:String,btnMessage:String},methods:{handleNewLine(t){return String(t).replace(/(?:\r\n|\r|\n)/g,"</br>")}}},a=s,l=n("2877"),c=Object(l["a"])(a,o,i,!1,null,null,null);e["a"]=c.exports},4431:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"d",(function(){return s})),n.d(e,"c",(function(){return a})),n.d(e,"b",(function(){return l}));var o=n("365c");function i(t){return o["a"].post("collections/add",t)}function s(t){return o["a"].post("collections/update",t)}function a(t){return o["a"].delete("collections/delete/?collectionId="+t)}function l(t){return o["a"].patch("collections/favorite/"+t)}},"5fde":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"collection-view"},[t.collectionData?t._e():e("div",[e("h2",[t._v("콜렉션 정보가 존재하지 않습니다.")])]),t.collectionData?e("div",[e("header",{staticClass:"collection__header"},[e("div",{staticClass:"flex-container"},[e("span",{staticClass:"collection__header-name"},[t._v("Collection")]),e("button",{staticClass:"btn--transparent",on:{click:function(e){return t.createFavorites()}}},[t.collectionData.favorite?e("img",{attrs:{src:t.star}}):t._e(),t.collectionData.favorite?t._e():e("img",{attrs:{src:t.star_gray}})])]),t.collectionData?e("div",{staticClass:"collection__header-wrapper"},[e("div",{staticClass:"flex-container"},[t.collectionData.title?e("p",{staticClass:"collection__header-title"},[t._v(" "+t._s(t.filterTitle(t.collectionData.title))+" ")]):t._e(),t.collectionData.contents?e("span",{staticClass:"collection__header-num"},[t._v("총 "+t._s(t.collectionData.contents.length)+"개")]):t._e()]),e("button",{staticClass:"btn--transparent btn__editContents",on:{click:function(e){return t.openEditModal()}}},[e("img",{attrs:{src:t.edit}})])]):t._e(),e("p",{staticClass:"collection__header-description"},[t._v(" "+t._s(t.collectionData.comment)+" ")])]),t.collectionData.contents?e("div",t._l(t.collectionData.contents,(function(n,o){return e("div",{key:o,staticClass:"flex-container--col"},[e("div",{staticClass:"collection-contents__wrapper"},[e("div",{staticClass:"collection-contents__index"},[t._v(" "+t._s(o+1)+" ")]),t.collectionData?e("div",{staticClass:"collection-contents__text-wrapper"},[n.title?e("p",{staticClass:"collection-contents__title",on:{click:function(e){return t.toLink(n.link)}}},[t._v(" "+t._s(t.filterTitle(n.title))+" ")]):t._e(),n.descrpition?e("p",{staticClass:"collection-contents__description"},[t._v(" "+t._s(t.filterDescript(n.description))+" ")]):t._e(),n.link?e("span",{staticClass:"collection-contents__domain"},[t._v(" "+t._s(t.filterDomain(n.link))+" ")]):t._e()]):t._e(),t.collectionData.contents?e("div",{staticClass:"collection-contents__img"},[e("img",{attrs:{src:n.coverImg,onerror:"this.style.display='none'"}})]):t._e()]),e("hr",{attrs:{width:"90%",color:"#F4F6F8",size:"1"}})])})),0):t._e()]):t._e(),t.isCollectionModalActive?e("collection-edit-modal-component",{attrs:{collectionId:t.collectionId},on:{"close-modal":function(e){t.isCollectionModalActive=!1}}}):t._e(),1==t.isAlertModalActive?e("alert-modal-component",{attrs:{alertModalContent:t.alertModalContent,btnMessage:t.btnMessage},on:{confirmBtn:function(e){t.isAlertModalActive=!1}}}):t._e()],1)},i=[],s=n("c24f"),a=n("8599"),l=n.n(a),c=n("7ec9"),r=n.n(c),d=n("4431"),_=n("f232"),u=n.n(_),m=n("6eb7"),p=n("3bd4"),v={components:{CollectionEditModalComponent:m["a"],AlertModalComponent:p["a"]},data(){return{star:l.a,star_gray:r.a,edit:u.a,collectionData:{},isCollectionModalActive:!1,alertModalContent:"",btnMessage:"네",isAlertModalActive:!1,collectionId:0}},created(){this.fetchCollectionsList(),this.collectionId=parseInt(this.$route.params.id)},watch:{isCollectionModalActive(){this.fetchCollectionsList()}},methods:{async fetchCollectionsList(){try{const t=await Object(s["c"])();this.collectionData=t.data.collections,this.collectionData=this.collectionData.filter(t=>t.id==this.$route.params.id),this.collectionData=this.collectionData[0]}catch(t){console.log(t)}},filterTitle(t){return t.length>=30?t.substr(0,30)+"...":t},filterDomain(t){let e;if(1==t.includes("www")){let n=t.split(".");n=n[1],e=n}else{let n=t.indexOf("//"),o=t.substring(n+2);e=o.split("."),e=e[0]}return e},async createFavorites(){this.collectionData.favorite=!this.collectionData.favorite;try{await Object(d["b"])(this.$route.params.id)}catch(t){console.log(t)}},filterDescript(t){return t.length>=90?t.substr(0,90)+"...":t},toLink(t){window.open(t,"_blank")},openEditModal(){this.isCollectionModalActive=!0}}},f=v,g=n("2877"),h=Object(g["a"])(f,o,i,!1,null,null,null);e["default"]=h.exports},"6eb7":function(t,e,n){"use strict";var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"modal"},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"collection-modal-card"},[e("div",{staticClass:"modal-card__header"},[e("h1",[t._v("콜렉션 수정")]),e("button",{staticClass:"btn--transparent btn__close",attrs:{type:"button"},on:{click:function(e){return t.$emit("close-modal")}}},[e("img",{attrs:{src:t.closeBtn}})])]),e("div",{staticClass:"modal-card__wrapper"},[e("div",{staticClass:"flex-container modal-form__wrapper"},[e("div",{staticClass:"register-form__wrapper"},[t._m(0),e("input",{directives:[{name:"model",rawName:"v-model",value:t.collections.title,expression:"collections.title"}],attrs:{placeholder:"10자 이하 권장"},domProps:{value:t.collections.title},on:{input:function(e){e.target.composing||t.$set(t.collections,"title",e.target.value)}}})]),e("div",{staticClass:"register-form__wrapper category__wrapper"},[e("label",{staticClass:"register-form__label"},[t._v("카테고리")]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.categoryName,expression:"categoryName"}],staticClass:"contents-modal__select",on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.categoryName=e.target.multiple?n:n[0]}}},[null==this.collections.category?e("option",{attrs:{value:""}},[t._v(" 카테고리 선택 ")]):t._e(),t._l(t.myCategories,(function(n,o){return e("option",{key:o},[t._v(" "+t._s(n.name)+" ")])}))],2)]),e("div",{staticClass:"flex-container favorite__wrapper"},[e("button",{staticClass:"btn--transparent btn__favorites",on:{click:function(e){return t.addFavorites()}}},[e("img",{directives:[{name:"show",rawName:"v-show",value:!t.collections.favorite,expression:"!collections.favorite"}],attrs:{src:t.star_border}}),e("img",{directives:[{name:"show",rawName:"v-show",value:t.collections.favorite,expression:"collections.favorite"}],attrs:{src:t.star}})])])]),e("div",{staticClass:"register-form__wrapper"},[e("label",{staticClass:"register-form__label"},[t._v("콜렉션 설명")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.collections.comment,expression:"collections.comment"}],attrs:{placeholder:"100자 이하",maxlength:"100"},domProps:{value:t.collections.comment},on:{input:function(e){e.target.composing||t.$set(t.collections,"comment",e.target.value)}}})]),e("div",{staticClass:"register-form__wrapper"},[t._m(1),e("div",{staticClass:"link__wrapper"},t._l(this.collections.contents,(function(n,o){return e("div",{key:o,staticClass:"link__wrapper-inner"},[e("div",{staticClass:"link__index"},[t._v(t._s(o+1))]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.collections.contents[o].link,expression:"collections.contents[index].link"}],attrs:{placeholder:"URL 입력"},domProps:{value:t.collections.contents[o].link},on:{input:function(e){e.target.composing||t.$set(t.collections.contents[o],"link",e.target.value)}}}),1!=t.collections.contents.length?e("button",{staticClass:"btn--transparent btn__deleteLink",on:{click:function(e){return t.deleteInput(o)}}},[e("img",{attrs:{src:t.minus}})]):t._e()])})),0),t.collections.contents?e("div",{staticClass:"flex-container-col modal-card__btn__wrapper"},[e("button",{staticClass:"btn--transparent btn--plus",on:{click:function(e){return t.createInput(t.collections.contents.length)}}},[e("img",{attrs:{src:t.add_link}})])]):t._e()])]),e("div",{staticClass:"modal-card__btn__wrapper"},[e("div",{staticClass:"flex-container"},[e("button",{staticClass:"btn--transparent login-form__link-register",on:{click:function(e){t.isDeleteModalActive=!0}}},[t._v(" 콜렉션 삭제 ")])])]),e("div",{staticClass:"flex-container-col modal-card__btn__wrapper"},[e("button",{staticClass:"btn--sm btnPrimary",attrs:{disabled:""==t.collections.contents||!t.collections.title},on:{click:function(e){return t.editCollection()}}},[t._v(" 저장 ")])])]),1==t.isDeleteModalActive?e("ConfirmModalComponent",{attrs:{confirmModalContent:t.confirmModalContent,leftBtnMessage:t.leftBtnMessage,rightBtnMessage:t.rightBtnMessage},on:{leftBtn:function(e){return t.deleteCollection()},rightBtn:function(e){t.isDeleteModalActive=!1}}}):t._e(),1==t.isAlertModalActive?e("AlertModalComponent",{attrs:{alertModalContent:t.alertModalContent,btnMessage:t.btnMessage},on:{confirmBtn:function(e){t.isAlertModalActive=!1}}}):t._e()],1)},i=[function(){var t=this,e=t._self._c;return e("label",{staticClass:"register-form__label"},[t._v(" 콜렉션 이름 "),e("em",[t._v("*")])])},function(){var t=this,e=t._self._c;return e("label",{staticClass:"register-form__label"},[t._v(" 링크 "),e("em",[t._v("*")])])}],s=n("f7ed"),a=n.n(s),l=n("da44"),c=n.n(l),r=n("8599"),d=n.n(r),_=n("1680"),u=n.n(_),m=n("7f97"),p=n.n(m),v=n("7e44"),f=n.n(v),g=n("3bd4"),h=n("4431"),C=n("ad92"),b={components:{AlertModalComponent:g["a"],ConfirmModalComponent:C["a"]},data(){return{closeBtn:a.a,star_border:c.a,star:d.a,alert_circle:u.a,add_link:p.a,isDetailSettingActive:!1,minus:f.a,myCategories:{},isAlertModalActive:!1,alertModalContent:"",btnMessage:"네",isDeleteModalActive:!1,leftBtnMessage:"네",rightBtnMessage:"아니요",confirmModalContent:"해당 콜렉션을 \n삭제하시겠습니까?",categoryName:"",collections:{}}},props:{collectionId:Number},async created(){await this.$store.dispatch("GET_CATEGORIES"),this.myCategories=this.$store.getters.getCategories,await this.$store.dispatch("GET_COLLECTIONS"),this.collections=this.$store.getters.getCollections.filter(t=>t.id==this.collectionId),this.collections=this.collections[0],null==this.collections.category?this.categoryName="":null!==this.collections.category&&(this.categoryName=this.collections.category.name)},methods:{addFavorites(){this.collections.favorite=!this.collections.favorite},createInput(){const t={link:""};this.collections.contents.push(t)},deleteInput(t){this.collections.contents.splice(t,1)},async editCollection(){const t=this.collections.contents,e=t.map(t=>t.link),n={title:this.collections.title,comment:this.collections.comment,favorite:this.collections.favorite,categoryName:this.categoryName,contentLinkList:e,collectionId:this.collections.id};Object.keys(n).forEach(t=>{"favorite"!==t&&(""==n[t]||void 0==n[t])&&delete n[t]});try{await Object(h["d"])(n),this.$emit("close-modal")}catch(o){this.alertModalContent=o.response.data.message,this.isAlertModalActive=!0}},async deleteCollection(){this.isDeleteModalActive=!1;try{await Object(h["c"])(this.collections.id),this.$emit("close-modal")}catch(t){this.alertModalContent=t.response.data.message,this.isAlertModalActive=!0}}}},M=b,w=n("2877"),y=Object(w["a"])(M,o,i,!1,null,null,null);e["a"]=y.exports},"7e44":function(t,e,n){t.exports=n.p+"img/minus.8e7c1397.svg"},"7ec9":function(t,e,n){t.exports=n.p+"img/star_gray.5a8620c4.svg"},"7f97":function(t,e,n){t.exports=n.p+"img/addLink.edbf2541.svg"},8599:function(t,e,n){t.exports=n.p+"img/star.c60dba1e.svg"},ad92:function(t,e,n){"use strict";var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"confirm-modal"},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"confirm-modal-card"},[e("div",{staticClass:"modal-card__header"},[t.isCloseBtnShow?e("div",{staticClass:"button-wrapper"},[e("button",{staticClass:"btn--transparent btn__close",attrs:{type:"button"},on:{click:function(e){return t.$emit("close-modal")}}},[e("img",{attrs:{src:t.closeBtn}})])]):t._e(),e("p",{domProps:{innerHTML:t._s(t.handleNewLine(this.confirmModalContent))}})]),e("div",{staticClass:"modal-card__button-wrapper"},[e("button",{attrs:{id:"btn__confirm"},on:{click:function(e){return t.$emit("leftBtn")}}},[t._v(" "+t._s(t.leftBtnMessage)+" ")]),e("button",{on:{click:function(e){return t.$emit("rightBtn")}}},[t._v(t._s(t.rightBtnMessage))])])])])},i=[],s=n("f7ed"),a=n.n(s),l={name:"ConfirmModalComponent",props:{confirmModalContent:String,leftBtnMessage:String,rightBtnMessage:String,isCloseBtnShow:Boolean},data:function(){return{closeBtn:a.a}},methods:{handleNewLine(t){return String(t).replace(/(?:\r\n|\r|\n)/g,"</br>")}}},c=l,r=n("2877"),d=Object(r["a"])(c,o,i,!1,null,null,null);e["a"]=d.exports},da44:function(t,e,n){t.exports=n.p+"img/star_border.026e7381.svg"},f232:function(t,e,n){t.exports=n.p+"img/edit.c5b95152.svg"},f7ed:function(t,e,n){t.exports=n.p+"img/closeBtn.a9f6b6a0.svg"}}]);
//# sourceMappingURL=chunk-5455a950.87c751a9.js.map