(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fcfd2828"],{"1f0e":function(t,e,a){t.exports=a.p+"img/settings.5e84a935.svg"},"56a3":function(t,e,a){"use strict";a("dbf6")},7598:function(t,e,a){"use strict";var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"modal"},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"modal-card"},[e("div",{staticClass:"modal-card__header"},[e("h1",[t._v(t._s(t.categoryModalTitle))]),e("button",{staticClass:"btn--transparent btn__close",attrs:{type:"button"},on:{click:function(e){return t.$emit("close-modal")}}},[e("img",{attrs:{src:t.closeBtn}})])]),e("div",{staticClass:"modal-card__wrapper"},[e("div",{staticClass:"register-form__wrapper"},[t._m(0),e("div",{staticClass:"flex-container modal-form__wrapper"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.categoryName,expression:"categoryName"}],attrs:{placeholder:"10자 이하 권장"},domProps:{value:t.categoryName},on:{input:function(e){e.target.composing||(t.categoryName=e.target.value)}}})])])]),e("div",{staticClass:"modal-card__category__wrapper"},[e("div",{staticClass:"flex-container-col"},[e("button",{staticClass:"btn--sm btnPrimary",attrs:{disabled:!t.categoryName},on:{click:function(e){return t.categoryEvent()}}},[t._v(" 저장 ")])])]),e("div",{staticClass:"modal-card__category__wrapper"},[e("div",{staticClass:"flex-container"},[e("button",{staticClass:"btn--transparent login-form__link-register",on:{click:function(e){return t.$emit("deleteCategory")}}},[t._v(" "+t._s(t.deleteBtn)+" ")])])])])])},r=[function(){var t=this,e=t._self._c;return e("label",{staticClass:"register-form__label"},[t._v("이름"),e("em",[t._v("*")])])}],s=a("f7ed"),n=a.n(s),i={name:"ModalComponent",data(){return{closeBtn:n.a,categoryName:""}},props:{categoryModalTitle:String,deleteBtn:String},methods:{categoryEvent(){let t=this.categoryName;this.$emit("categoryEvent",t)}}},c=i,l=a("2877"),d=Object(l["a"])(c,o,r,!1,null,null,null);e["a"]=d.exports},c236:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"category-view"},[e("h1",{staticClass:"page-header"},[t._v(" "+t._s(t.categoryName)),"미분류"!==this.categoryName?e("button",{staticClass:"btn--transparent--img",on:{click:function(e){return t.openCategoryModal()}}},[e("img",{attrs:{src:t.setting}})]):t._e()]),e("div",[e("div",{staticClass:"category__select-wrapper"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.categoryFilter,expression:"categoryFilter"}],on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.categoryFilter=e.target.multiple?a:a[0]},function(e){return t.sortData(t.categoryFilter)}]}},[e("option",{attrs:{value:"latest"}},[t._v("최신순")]),e("option",{attrs:{value:"favorites"}},[t._v("즐겨찾기순")]),e("option",{attrs:{value:"expiry"}},[t._v("읽을기한순")])])]),0==this.newArr.length?e("div",{staticClass:"alert"},[e("h2",[t._v(" 해당 카테고리에 속하는 콘텐츠&콜렉션이 없습니다😯 ")])]):e("div",t._l(t.newArr,(function(a,o){return e("div",{key:o},[t.newArr[o].contents?t._e():e("contents-component",{attrs:{contents:a}}),t.newArr[o].contents?e("collection-component",{attrs:{collection:a}}):t._e()],1)})),0)]),e("category-modal-component",{directives:[{name:"show",rawName:"v-show",value:t.isCategoryModalActive,expression:"isCategoryModalActive"}],attrs:{categoryModalTitle:t.categoryModalTitle,categoryName:t.newCategoryName,deleteBtn:t.deleteBtn},on:{"close-modal":function(e){t.isCategoryModalActive=!1},categoryEvent:t.categoryEvent,deleteCategory:t.deleteCategory}})],1)},r=[],s=a("1f0e"),n=a.n(s),i=a("f816"),c=a("6ae1"),l=a("7598"),d=a("c405"),g=a("c24f"),u=a("dbd1"),m=a("56d7"),v={components:{ContentsComponent:i["a"],CollectionComponent:c["a"],CategoryModalComponent:l["a"]},data(){return{isCollectionActive:!1,isCategoryModalActive:!1,categoryModalTitle:"카테고리 수정",categoryFilter:"latest",setting:n.a,categoryId:"",categoryName:"",newCategoryName:"",deleteBtn:"카테고리 삭제",newArr:[],memoEvent:0,contentsModalEvent:0,collectionModalEvent:0}},watch:{async $route(){await this.fetchCategoryName(),await this.$store.dispatch("SORT_DATA",this.$route.params.id),this.newArr=this.$store.getters.getLatestSortedData},async memoEvent(){await this.$store.dispatch("SORT_DATA",this.$route.params.id),this.newArr=this.$store.getters.getLatestSortedData},async contentsModalEvent(){await this.$store.dispatch("SORT_DATA",this.$route.params.id),this.newArr=this.$store.getters.getLatestSortedData},async collectionModalEvent(){await this.$store.dispatch("SORT_DATA",this.$route.params.id),this.newArr=this.$store.getters.getLatestSortedData}},async created(){this.categoryId=this.$route.params.id,await this.$store.dispatch("SORT_DATA",this.$route.params.id),this.newArr=this.$store.getters.getLatestSortedData,await this.fetchCategoryName(),m["eventBus"].$on("memoEvent",t=>this.memoEvent+=t),m["eventBus"].$on("contentsModalActive",t=>this.contentsModalEvent+=t),m["eventBus"].$on("collectionModalActive",t=>this.collectionModalEvent+=t)},methods:{openCategoryModal(){this.isCategoryModalActive=!0},async categoryEvent(t){this.newCategoryName=t;try{const t={name:this.newCategoryName,originalName:this.categoryName},e=await Object(d["c"])(t);console.log(e),this.categoryName=this.newCategoryName,this.isCategoryModalActive=!1}catch(e){console.log(e)}},async deleteCategory(){try{const t=await Object(d["b"])(this.categoryId);console.log(t),this.isCategoryModalActive=!1,this.$router.push("/category/all")}catch(t){console.log(t)}},async fetchCategoryName(){try{const t=await Object(g["b"])(),e=this.$route.params.id,a=t.data.categories;if(-1==e)this.categoryName="미분류";else{const t=a.filter((function(t){return t.id==e}));console.log(t),this.categoryName=t[0].name}}catch(t){console.log(t)}},async sortData(t){"favorites"==t?this.newArr=Object(u["b"])(this.$store.getters.getContents,this.$store.getters.getCollections):"latest"==t?this.newArr=Object(u["c"])(this.$store.getters.getContents,this.$store.getters.getCollections):"expiry"==t&&(this.newArr=Object(u["a"])(this.$store.getters.getContents,this.$store.getters.getCollections),console.log(this.newArr))}}},y=v,h=(a("56a3"),a("2877")),p=Object(h["a"])(y,o,r,!1,null,null,null);e["default"]=p.exports},c405:function(t,e,a){"use strict";a.d(e,"a",(function(){return r})),a.d(e,"c",(function(){return s})),a.d(e,"b",(function(){return n}));var o=a("365c");function r(t){return o["a"].post("category/add",t)}function s(t){return o["a"].post("category/update",t)}function n(t){return o["a"].delete("category/delete/"+t)}},dbf6:function(t,e,a){}}]);
//# sourceMappingURL=chunk-fcfd2828.71c6702f.js.map