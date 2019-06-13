(function(t){function e(e){for(var n,s,o=e[0],c=e[1],l=e[2],u=0,f=[];u<o.length;u++)s=o[u],r[s]&&f.push(r[s][0]),r[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);d&&d(e);while(f.length)f.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,o=1;o<a.length;o++){var c=a[o];0!==r[c]&&(n=!1)}n&&(i.splice(e--,1),t=s(s.s=a[0]))}return t}var n={},r={app:0},i=[];function s(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=n,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var d=c;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var n=a("2b0e"),r=a("bb71");a("da64");n["a"].use(r["a"],{iconfont:"md"});var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-toolbar",{attrs:{app:""}},[a("v-toolbar-title",{staticClass:"headline text-uppercase"},[a("span",[t._v("SMART")]),a("span",{staticClass:"font-weight-light"},[t._v("Vitals")])]),a("v-spacer"),a("v-btn",{attrs:{flat:"",href:"accounts/logout/"}},[a("span",{staticClass:"mr-2"},[t._v("Logout")])])],1),a("v-content",[a("Main")],1)],1)},s=[],o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{"grid-list-xs":""}},[a("v-toolbar",{attrs:{flat:"",color:"white"}},[a("v-toolbar-title",[t._v("Patients")]),a("v-spacer"),a("v-btn",{attrs:{flat:""},on:{click:function(e){t.addPatientDialog=!0}}},[t._v("Add Patient")])],1),a("v-data-table",{attrs:{headers:t.headers,items:t.patients,expand:t.expand,"item-key":"name"},scopedSlots:t._u([{key:"items",fn:function(e){return[a("tr",{on:{click:function(a){e.expanded=!e.expanded,t.joinRoom(t.patients.indexOf(e.item)),t.resetChart()}}},[a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.id))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.name))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.age))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.gender))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.heartrate))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.temp))])])]}},{key:"expand",fn:function(e){return[a("v-card",{attrs:{flat:""}},[a("v-container",{attrs:{"grid-list-xs":""}},[a("div",{attrs:{id:"chart"}},[a("apexchart",{ref:"realtimeChart",attrs:{type:"line",height:"350",options:t.chartOptions,series:t.series}})],1)])],1)]}}])}),a("v-layout",{attrs:{row:"","justify-center":""}},[a("v-dialog",{attrs:{persistent:"","max-width":"600px"},model:{value:t.addPatientDialog,callback:function(e){t.addPatientDialog=e},expression:"addPatientDialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v("Patient Data")])]),a("v-card-text",[a("v-container",{attrs:{"grid-list-md":""}},[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[a("v-text-field",{attrs:{label:"Patient Name*",required:""},model:{value:t.newPatient.name,callback:function(e){t.$set(t.newPatient,"name",e)},expression:"newPatient.name"}})],1),a("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[a("v-text-field",{attrs:{type:"number",label:"age"},model:{value:t.newPatient.age,callback:function(e){t.$set(t.newPatient,"age",e)},expression:"newPatient.age"}})],1),a("v-flex",{attrs:{xs12:"",sm12:""}},[a("v-select",{attrs:{items:["Male","Female"],label:"Gender*",required:""},model:{value:t.newPatient.gender,callback:function(e){t.$set(t.newPatient,"gender",e)},expression:"newPatient.gender"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:function(e){t.addPatientDialog=!1}}},[t._v("Close")]),a("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:t.addPatient}},[t._v("Save")])],1)],1)],1)],1)],1)},c=[],l=(a("7f7f"),a("bc3a")),d=a.n(l),u=a("a78e"),f=a.n(u),p=0,m=[];function v(t,e,a){var n=0;while(n<e){var r=t,i=Math.floor(Math.random()*(a.max-a.min+1))+a.min;m.push({x:r,y:i}),p=t,t+=3600,n++}}function h(t){var e=p+3600;p=e,m.push({x:e,y:t})}v((new Date).getTime(),1,{min:10,max:90});var g={data:function(){return{expand:!1,addPatientDialog:!1,newPatient:{},headers:[{text:"#",align:"center",sortable:!1,value:"id"},{text:"Name",align:"center",sortable:!1,value:"name"},{text:"Age",align:"center",sortable:!1,value:"age"},{text:"Gender",align:"center",sortable:!1,value:"gender"},{text:"Heart Rate",align:"center",sortable:!1,value:"heartrate"},{text:"Tempreture",align:"center",sortable:!1,value:"temp"}],message:"",logs:[],patients:[],status:"disconnected",currentPatient:{},chartOptions:{chart:{animations:{enabled:!0,easing:"linear",dynamicAnimation:{speed:20}},toolbar:{show:!1},zoom:{enabled:!1}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:2},title:{text:"EMG Signal",align:"left"},markers:{size:0},xaxis:{type:"datetime",range:777600,labels:{show:!1}},yaxis:{max:5,min:0,forceNiceScale:!0},legend:{show:!1}},series:[{data:m.slice()}]}},computed:{webSocketConnected:function(){return this.$socket.isConnected}},watch:{webSocketConnected:function(t,e){if(t)for(var a=0;a<this.patients.length;a++){var n=this.patients[a].id;this.subscribePatient(n)}}},methods:{getPatients:function(){var t=this;d.a.get("api/patients/").then(function(e){t.patients=e.data;for(var a=0;a<t.patients.length;a++){var n=t.patients[a].id;t.subscribePatient(n)}}).catch(function(t){console.log(t)})},messageReceived:function(t){var e=JSON.parse(t.data);if("message"==e.type){var a=e.room,n=this.patients.filter(function(t){return t.id===a});if(n=n[0],n.temp=e.message.temp,n.heartrate=e.message.heartrate,a==this.currentPatient.id)for(var r=JSON.parse(e.message.emg),i=0;i<r.length;i++){var s=r[i];h(s)}}},joinRoom:function(t){this.currentPatient.id===this.patients[t].id?this.currentPatient={}:(this.currentPatient.id=this.patients[t].id,this.currentPatient.name=this.patients[t].name,this.currentPatient.doctor=this.patients[t].doctor)},resetChart:function(){m=[];var t=[];this.currentPatient.id&&d.a.get("api/patients/".concat(this.currentPatient.id,"/")).then(function(e){t=JSON.parse(e.data.emg),v((new Date).getTime(),1,{min:10,max:90});for(var a=0;a<t.length;a++){var n=t[a];h(n)}}).catch(function(t){console.log(t.response)})},addPatient:function(){var t=this,e="api/patients/",a={};a.name=this.newPatient.name,a.age=this.newPatient.age,"Male"===this.newPatient.gender?a.gender=0:"Female"===this.newPatient.gender&&(a.gender=1);var n={headers:{"X-CSRFToken":f.a.get("csrftoken")}};d.a.post(e,a,n).then(function(e){0===e.data.gender?e.data.gender="Male":e.data.gender="Female",t.patients.push(e.data),t.newPatient={},t.addPatientDialog=!1,t.subscribePatient(e.data.id)}).catch(function(t){console.log(t.response)})},subscribePatient:function(t){return!!this.$store.state.socket.isConnected&&(this.$socket.sendObj(JSON.stringify({command:"join",patient:t})),!0)},intervals:function(){var t=this;window.setInterval(function(){t.$refs.realtimeChart&&t.$refs.realtimeChart.updateSeries([{data:m}])},20)},leaveAllRooms:function(){for(var t=0;t<this.patients.length;t++){var e=this.patients[t].id;this.$socket.sendObj(JSON.stringify({command:"leave",patient:e}))}}},mounted:function(){this.intervals()},beforeMount:function(){var t=this;this.$store.subscribe(function(e,a){"SOCKET_ONOPEN"===e.type&&t.getPatients()}),this.$socket.onmessage=function(e){return t.messageReceived(e)}},beforeDestroy:function(){}},b=g,x=a("2877"),P=a("6544"),w=a.n(P),C=a("8336"),O=a("b0af"),_=a("99d9"),y=a("12b2"),k=a("a523"),S=a("8fea"),T=a("169a"),E=a("0e8f"),V=a("a722"),N=a("b56d"),j=a("9910"),M=a("2677"),R=a("71d9"),$=a("2a7f"),D=Object(x["a"])(b,o,c,!1,null,null,null),A=D.exports;w()(D,{VBtn:C["a"],VCard:O["a"],VCardActions:_["a"],VCardText:_["b"],VCardTitle:y["a"],VContainer:k["a"],VDataTable:S["a"],VDialog:T["a"],VFlex:E["a"],VLayout:V["a"],VSelect:N["a"],VSpacer:j["a"],VTextField:M["a"],VToolbar:R["a"],VToolbarTitle:$["a"]});var J={name:"App",components:{Main:A},data:function(){return{}}},K=J,F=a("7496"),L=a("549c"),z=Object(x["a"])(K,i,s,!1,null,null,null),G=z.exports;w()(z,{VApp:F["a"],VBtn:C["a"],VContent:L["a"],VSpacer:j["a"],VToolbar:R["a"],VToolbarTitle:$["a"]});var q=a("8c4f"),B=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Main")},H=[],I={components:{Main:A}},U=I,X=Object(x["a"])(U,B,H,!1,null,null,null),Q=X.exports;n["a"].use(q["a"]);var W=new q["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:Q}]}),Y=a("2f62");n["a"].use(Y["a"]);var Z=new Y["a"].Store({state:{socket:{isConnected:!1,message:"",reconnectError:!1}},mutations:{SOCKET_ONOPEN:function(t,e){n["a"].prototype.$socket=e.currentTarget,t.socket.isConnected=!0},SOCKET_ONCLOSE:function(t,e){t.socket.isConnected=!1},SOCKET_ONERROR:function(t,e){console.error(t,e)},SOCKET_ONMESSAGE:function(t,e){t.socket.message=e},SOCKET_RECONNECT:function(t,e){console.info(t,e)},SOCKET_RECONNECT_ERROR:function(t){t.socket.reconnectError=!0}},getters:{connected:function(t){return t.socket.isConnected}}}),tt=a("b408"),et=a.n(tt),at=a("1321"),nt=a.n(at);n["a"].use(nt.a),n["a"].config.productionTip=!1,d.a.defaults.baseURL="http://zeyadobaia.com/",n["a"].use(et.a,"ws://zeyadobaia.com/ws/monitor/",{store:Z,format:"json",reconnection:!0,reconnectionDelay:1e3}),n["a"].component("apexchart",nt.a),new n["a"]({router:W,store:Z,render:function(t){return t(G)}}).$mount("#app")}});
//# sourceMappingURL=app.08b3e303.js.map