(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d226785"],{e994:function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"search-view"},[0==!t.resultArr.length?e("div",{staticClass:"search__wrapper"},[t._v(" '"+t._s(this.$store.getters.getSearchWord)+"' 에 대한 검색 결과가 "),e("span",{staticClass:"search__text--highlight"},[t._v(t._s(t.resultArr.length))]),t._v("건 있습니다. ")]):t._e(),e("div",[t.resultArr?e("div",[t._l(t.resultArr,(function(r,s){return e("div",{key:s},[t.resultArr[s].contents?t._e():e("contents-component",{attrs:{contents:r}}),t.resultArr[s].contents?e("collection-component",{attrs:{collection:r}}):t._e()],1)})),0==t.resultArr.length?e("div",{staticClass:"no-result"},[t._v(" '"+t._s(this.$store.getters.getSearchWord)+"'에 대한 검색 결과가 없습니다😯 ")]):t._e()],2):t._e()])])},n=[],o=r("f816"),a=r("6ae1"),c=r("56d7"),l={components:{ContentsComponent:o["a"],CollectionComponent:a["a"]},data(){return{newCategoryName:"",contentsData:[],collectionData:[],resultArr:[],word:""}},created(){this.resultArr=this.$store.getters.getSearchResult,c["eventBus"].$on("search",t=>{this.word=t})},watch:{word(){this.resultArr=this.$store.getters.getSearchResult}}},i=l,u=r("2877"),h=Object(u["a"])(i,s,n,!1,null,null,null);e["default"]=h.exports}}]);
//# sourceMappingURL=chunk-2d226785.1ec5f7b3.js.map