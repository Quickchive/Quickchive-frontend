(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0de6e7"],{"862e":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"category-view"},[e("h1",{staticClass:"page-header"},[t._v("즐겨찾기")]),e("div",[e("div",{staticClass:"category__select-wrapper"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.categoryFilter,expression:"categoryFilter"}],on:{change:[function(e){var o=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.categoryFilter=e.target.multiple?o:o[0]},function(e){return t.sortData(t.categoryFilter)}]}},[e("option",{attrs:{value:"latest"}},[t._v("최신순")]),e("option",{attrs:{value:"expiry"}},[t._v("읽을기한순")])])]),0==t.newArr.length?e("div",{staticClass:"alert"},[e("h2",[t._v("아직 콘텐츠&콜렉션이 없습니다😯")])]):t._e(),t._l(t.newArr,(function(o,n){return e("div",{key:n},[o.contents?t._e():e("contents-component",{attrs:{contents:o}}),o.contents?e("collection-component",{attrs:{collection:o}}):t._e()],1)}))],2)])},s=[],a=o("f816"),r=o("6ae1"),i=o("dbd1"),c=o("56d7"),l={components:{ContentsComponent:a["a"],CollectionComponent:r["a"]},data(){return{isCollectionActive:!1,isCategoryModalActive:!1,categoryFilter:"latest",categoryId:"",contentsData:[],collectionData:[],newArr:[],memoEvent:0,contentsModalEvent:0,collectionModalEvent:0}},async created(){await this.$store.dispatch("GET_FAVORITES"),this.newArr=this.$store.getters.getLatestSortedFavorite,c["eventBus"].$on("memoEvent",t=>this.memoEvent+=t),c["eventBus"].$on("contentsModalActive",t=>this.contentsModalEvent+=t),c["eventBus"].$on("collectionModalActive",t=>this.collectionModalEvent+=t)},watch:{async memoEvent(){await this.$store.dispatch("GET_FAVORITES"),this.newArr=this.$store.getters.getLatestSortedFavorite,c["eventBus"].$on("memoEvent",t=>this.memoEvent+=t)},async contentsModalEvent(){await this.$store.dispatch("GET_FAVORITES"),this.newArr=this.$store.getters.getLatestSortedFavorite},async collectionModalEvent(){await this.$store.dispatch("GET_FAVORITES"),this.newArr=this.$store.getters.getLatestSortedFavorite}},methods:{async sortData(t){"latest"==t?(await this.$store.dispatch("GET_FAVORITES"),this.newArr=this.$store.getters.getLatestSortedFavorite):"expiry"==t&&(this.newArr=Object(i["a"])(this.$store.getters.getFavoriteContents,this.$store.getters.getFavoriteCollections),console.log(this.newArr))}}},v=l,d=o("2877"),h=Object(d["a"])(v,n,s,!1,null,null,null);e["default"]=h.exports}}]);
//# sourceMappingURL=chunk-2d0de6e7.7d7d860e.js.map