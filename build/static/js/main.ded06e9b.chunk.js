(this["webpackJsonpmovie-recommendation-app"]=this["webpackJsonpmovie-recommendation-app"]||[]).push([[0],{37:function(e,t,n){e.exports=n.p+"static/media/no_photo_available.2246dc72.png"},43:function(e,t,n){e.exports=n(57)},48:function(e,t,n){},49:function(e,t,n){},57:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(20),i=n.n(o),c=(n(48),n(13)),l=n(14),s=n(17),u=n(16),m=(n(49),n(21)),v=n(37),h=n.n(v);var p=function(e){return void 0!==e.overview?e.overview.substring(0,65)+"...":e.overview},d=function(e){return"https://image.tmdb.org/t/p/w500null"===e.image||"https://image.tmdb.org/t/p/w500undefined"===e.image?h.a:e.image},g=function(e){return a.createElement(m.a,{style:{width:"15rem"}},a.createElement(m.a.Img,{variant:"top",src:d(e)}),a.createElement(m.a.Body,null,a.createElement(m.a.Title,null,e.movieName),a.createElement(m.a.Text,null,p(e))))},f=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={movieList:[{id:"none",title:"none",image:"none",overview:"none",poster_path:"none"}],update:!1},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){this.setState({update:!0})}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){return console.log(this.props.movieList),!0===this.state.update?a.createElement("div",{id:"movieList",className:"container"},a.createElement("div",{id:"movies",className:"row pb-5"},this.props.movieList.map((function(e){return a.createElement("div",{key:"movie-"+e.id.toString(),className:"d-flex justify-content-around col-md-4 col-sm-6 col-xs-12 pt-5"},a.createElement(g,{key:e.id,movieName:e.title,image:"https://image.tmdb.org/t/p/w500"+e.poster_path,overview:e.overview}))})))):(console.log(this.state.movieList),a.createElement("div",null))}}]),n}(a.Component),y=n(22),E=n(29),b=n(42),w=n(26),k=n(39),j=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"handleKeyPress",value:function(e){13===e.charCode&&document.getElementById("searchMoviesButton").click()}},{key:"render",value:function(){return a.createElement(a.Fragment,null,a.createElement(y.a,{bg:"light",expand:"lg"},a.createElement(y.a.Brand,{href:"home"},"Movie Picker"),a.createElement(y.a.Toggle,{"aria-controls":"basic-navbar-nav"}),a.createElement(y.a.Collapse,{id:"basic-navbar-nav"},a.createElement(E.a,{className:"mr-auto"},a.createElement(E.a.Link,{href:"trending"},"Trending Movies"),a.createElement(E.a.Link,{href:"your-movies"},"Your Movies")),a.createElement(b.a,{inline:!0},a.createElement(w.a,{onChange:this.props.handleChange,onKeyPress:this.handleKeyPress,id:"movieSearchBar",type:"text",placeholder:"Search",className:"mr-sm-2"}),a.createElement(k.a,{id:"searchMoviesButton",variant:"outline-success"},"Search Movies")))))}}]),n}(a.Component),L=n(40),O=n(5),M=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={},e}return Object(l.a)(n,[{key:"render",value:function(){return a.createElement(a.Fragment,null,a.createElement("h1",null,"Your Movies:"))}}]),n}(a.Component),S=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={movieList:[],searchQuery:"",searchList:[]},e.getPopularMovies=function(){var t=Math.round(10*Math.random()).toString();""===e.state.searchQuery&&fetch("https://api.themoviedb.org/3/trending/all/day?api_key=04c67358ca6817bcec69c61716577d76&language=en-US&page="+t).then((function(e){return e.json()})).then((function(t){e.setState({movieList:t.results,searchList:t.results})})).catch((function(e){console.error(e)}))},e.readInput=function(t){if(""!==t.target.value){var n=t.target.value.replace(/ /g,"+");fetch("https://api.themoviedb.org/3/search/multi?api_key=04c67358ca6817bcec69c61716577d76&language=en-US&include_adult=false&page=1&query="+n).then((function(e){return e.json()})).then((function(t){console.log(t.results),e.setState({movieList:t.results})})).catch((function(e){console.error(e)})),e.setState({searchQuery:t.target.value}),console.log(e.state.searchQuery)}else e.setState({movieList:e.state.searchList})},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){this.getPopularMovies()}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){var e=this,t=function(){return r.a.createElement(f,{movieList:e.state.movieList})};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{id:"navbar"},r.a.createElement(j,{handleChange:this.readInput})),r.a.createElement(L.a,null,r.a.createElement(O.c,null,r.a.createElement(O.a,{path:"/",exact:!0,component:t}),r.a.createElement(O.a,{path:"/home",exact:!0,component:t}),r.a.createElement(O.a,{path:"/trending",exact:!0,component:t}),r.a.createElement(O.a,{path:"/your-movies",exact:!0,component:function(){return""===e.state.searchQuery?r.a.createElement(M,null):r.a.createElement(f,{movieList:e.state.movieList})}}))))}}]),n}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(56);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[43,1,2]]]);
//# sourceMappingURL=main.ded06e9b.chunk.js.map