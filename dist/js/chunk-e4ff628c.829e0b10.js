(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e4ff628c"],{"1f0e":function(t,e,a){t.exports=a.p+"img/settings.5e84a935.svg"},7598:function(t,e,a){"use strict";var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"modal"},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"modal-card"},[e("div",{staticClass:"modal-card__header"},[e("h1",[t._v(t._s(t.categoryModalTitle))]),e("button",{staticClass:"btn--transparent btn__close",attrs:{type:"button"},on:{click:function(e){return t.$emit("close-modal")}}},[e("img",{attrs:{src:t.closeBtn}})])]),e("div",{staticClass:"modal-card__wrapper"},[e("div",{staticClass:"register-form__wrapper"},[t._m(0),e("div",{staticClass:"flex-container modal-form__wrapper"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.categoryName,expression:"categoryName"}],attrs:{placeholder:"10자 이하 권장"},domProps:{value:t.categoryName},on:{input:function(e){e.target.composing||(t.categoryName=e.target.value)}}})])])]),e("div",{staticClass:"modal-card__category__wrapper"},[e("div",{staticClass:"flex-container-col"},[e("button",{staticClass:"btn--sm btnPrimary",attrs:{disabled:!t.categoryName},on:{click:function(e){return t.categoryEvent()}}},[t._v(" 저장 ")])])]),e("div",{staticClass:"modal-card__category__wrapper"},[e("div",{staticClass:"flex-container"},[e("button",{staticClass:"btn--transparent login-form__link-register",on:{click:function(e){return t.$emit("deleteCategory")}}},[t._v(" "+t._s(t.deleteBtn)+" ")])])])])])},s=[function(){var t=this,e=t._self._c;return e("label",{staticClass:"register-form__label"},[t._v("이름"),e("em",[t._v("*")])])}],n=a("f7ed"),r=a.n(n),i={name:"ModalComponent",data(){return{closeBtn:r.a,categoryName:""}},props:{categoryModalTitle:String,deleteBtn:String},methods:{categoryEvent(){let t=this.categoryName;this.$emit("categoryEvent",t)}}},c=i,l=a("2877"),d=Object(l["a"])(c,o,s,!1,null,null,null);e["a"]=d.exports},"7bb7":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"category-view"},[e("h1",{staticClass:"page-header"},[t._v("전체")]),e("div",[e("div",{staticClass:"category__select-wrapper"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.categoryFilter,expression:"categoryFilter"}],on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.categoryFilter=e.target.multiple?a:a[0]},function(e){return t.sortData(t.categoryFilter)}]}},[e("option",{attrs:{value:"latest"}},[t._v("최신순")]),e("option",{attrs:{value:"favorites"}},[t._v("즐겨찾기순")]),e("option",{attrs:{value:"expiry"}},[t._v("읽을기한순")])])]),this.$store.getters.getContents||this.$store.getters.getCollections?e("div",t._l(t.newArr,(function(a,o){return e("div",{key:o},[t.newArr[o].contents?t._e():e("contents-component",{attrs:{contents:a}}),t.newArr[o].contents?e("collection-component",{attrs:{collection:a}}):t._e()],1)})),0):e("div",{staticClass:"alert"},[e("h2",[t._v("(임시) 아직 콘텐츠&콜렉션이 없습니다😯")])])]),e("category-modal-component",{directives:[{name:"show",rawName:"v-show",value:t.isCategoryModalActive,expression:"isCategoryModalActive"}],attrs:{categoryModalTitle:t.categoryModalTitle,categoryName:t.newCategoryName,deleteBtn:t.deleteBtn},on:{"close-modal":function(e){t.isCategoryModalActive=!1},categoryEvent:t.categoryEvent,deleteCategory:t.deleteCategory}}),1==t.isAlertModalActive?e("AlertModalComponent",{attrs:{alertModalContent:t.alertModalContent,btnMessage:t.btnMessage},on:{confirmBtn:function(e){t.isAlertModalActive=!1}}}):t._e()],1)},s=[],n=a("1f0e"),r=a.n(n),i=a("f816"),c=a("6ae1"),l=a("7598"),d=a("c405"),g=a("dbd1"),v=a("3bd4"),m=a("56d7"),u={components:{ContentsComponent:i["a"],CollectionComponent:c["a"],CategoryModalComponent:l["a"],AlertModalComponent:v["a"]},data(){return{isCategoryModalActive:!1,categoryModalTitle:"카테고리 수정",categoryFilter:"latest",setting:r.a,categoryId:0,categoryName:"",newCategoryName:"",deleteBtn:"카테고리 삭제",newArr:[],isAlertModalActive:!1,AlertModalContent:"",btnMessage:"네",memoEvent:0,contentsModalEvent:0,collectionModalEvent:0}},watch:{async memoEvent(){await this.$store.dispatch("GET_CONTENTS"),await this.$store.dispatch("GET_COLLECTIONS"),this.newArr=Object(g["c"])(this.$store.getters.getContents,this.$store.getters.getCollections)},async contentsModalEvent(){await this.$store.dispatch("GET_CONTENTS"),await this.$store.dispatch("GET_COLLECTIONS"),this.newArr=Object(g["c"])(this.$store.getters.getContents,this.$store.getters.getCollections)},async collectionModalEvent(){await this.$store.dispatch("GET_CONTENTS"),await this.$store.dispatch("GET_COLLECTIONS"),this.newArr=Object(g["c"])(this.$store.getters.getContents,this.$store.getters.getCollections)}},async created(){await this.$store.dispatch("GET_CONTENTS"),await this.$store.dispatch("GET_COLLECTIONS"),this.newArr=Object(g["c"])(this.$store.getters.getContents,this.$store.getters.getCollections),m["eventBus"].$on("memoEvent",t=>this.memoEvent+=t),m["eventBus"].$on("contentsModalActive",t=>this.contentsModalEvent+=t),m["eventBus"].$on("collectionModalActive",t=>this.collectionModalEvent+=t)},methods:{openCategoryModal(){this.isCategoryModalActive=!0},async categoryEvent(t){this.newCategoryName=t;try{const t={name:this.newCategoryName,originalName:this.categoryName},e=await Object(d["c"])(t);console.log(e)}catch(e){console.log(e),this.alertModalContent=e.response.data.message,this.isAlertModalActive=!0}},async deleteCategory(){try{const t=await Object(d["b"])(this.categoryId);console.log(t)}catch(t){console.log(t),this.alertModalContent=t.response.data.message,this.isAlertModalActive=!0}},sortData(t){"favorites"==t?this.newArr=Object(g["b"])(this.$store.getters.getContents,this.$store.getters.getCollections):"latest"==t?this.newArr=Object(g["c"])(this.$store.getters.getContents,this.$store.getters.getCollections):"expiry"==t&&(this.newArr=Object(g["a"])(this.$store.getters.getContents,this.$store.getters.getCollections),console.log(this.newArr))}}},C=u,h=a("2877"),p=Object(h["a"])(C,o,s,!1,null,null,null);e["default"]=p.exports},c405:function(t,e,a){"use strict";a.d(e,"a",(function(){return s})),a.d(e,"c",(function(){return n})),a.d(e,"b",(function(){return r}));var o=a("365c");function s(t){return o["a"].post("category/add",t)}function n(t){return o["a"].post("category/update",t)}function r(t){return o["a"].delete("category/delete/"+t)}}}]);
//# sourceMappingURL=chunk-e4ff628c.829e0b10.js.map