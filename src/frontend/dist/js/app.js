(function(t){function e(e){for(var n,s,o=e[0],c=e[1],l=e[2],d=0,p=[];d<o.length;d++)s=o[d],r[s]&&p.push(r[s][0]),r[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(p.length)p.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,o=1;o<a.length;o++){var c=a[o];0!==r[c]&&(n=!1)}n&&(i.splice(e--,1),t=s(s.s=a[0]))}return t}var n={},r={app:0},i=[];function s(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=n,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var n=a("2b0e"),r=a("bb71");a("da64");n["a"].use(r["a"],{iconfont:"md"});var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-toolbar",{attrs:{app:""}},[a("v-toolbar-title",{staticClass:"headline text-uppercase"},[a("span",[t._v("SMART")]),a("span",{staticClass:"font-weight-light"},[t._v("Vitals")])]),a("v-spacer"),a("v-btn",{attrs:{flat:"",href:"accounts/logout/"}},[a("span",{staticClass:"mr-2"},[t._v("Logout")])])],1),a("v-content",[a("router-view")],1)],1)},s=[],o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{"grid-list-xs":""}},[a("v-toolbar",{attrs:{flat:"",color:"white"}},[a("v-toolbar-title",[t._v("Patients")]),a("v-spacer"),a("v-btn",{attrs:{flat:""},on:{click:function(e){t.addPatientDialog=!0}}},[t._v("Add Patient")])],1),a("v-data-table",{attrs:{headers:t.headers,items:t.patients,expand:t.expand,"item-key":"name"},scopedSlots:t._u([{key:"items",fn:function(e){return[a("tr",{on:{click:function(a){t.resetChart(),e.expanded=!e.expanded,t.joinRoom(t.patients.indexOf(e.item))}}},[a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.id))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.name))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.age))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.gender))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.heartrate))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.temp))]),a("td",{staticClass:"text-xs-center"},[a("v-btn",{attrs:{color:"teal"},on:{click:function(a){return t.$router.push({path:"/records/"+e.item.id})}}},[a("v-icon",[t._v("history")]),t._v("History\n            ")],1)],1)])]}},{key:"expand",fn:function(e){return[a("v-card",{attrs:{flat:""}},[a("v-container",{attrs:{"grid-list-xs":""}},[a("div",{attrs:{id:"chart"}},[a("apexchart",{ref:"realtimeChart",attrs:{type:"line",height:"350",options:t.chartOptions,series:t.series}})],1)])],1)]}}])}),a("v-layout",{attrs:{row:"","justify-center":""}},[a("v-dialog",{attrs:{persistent:"","max-width":"600px"},model:{value:t.addPatientDialog,callback:function(e){t.addPatientDialog=e},expression:"addPatientDialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v("Patient Data")])]),a("v-card-text",[a("v-container",{attrs:{"grid-list-md":""}},[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[a("v-text-field",{attrs:{label:"Patient Name*",required:""},model:{value:t.newPatient.name,callback:function(e){t.$set(t.newPatient,"name",e)},expression:"newPatient.name"}})],1),a("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[a("v-text-field",{attrs:{type:"number",label:"age"},model:{value:t.newPatient.age,callback:function(e){t.$set(t.newPatient,"age",e)},expression:"newPatient.age"}})],1),a("v-flex",{attrs:{xs12:"",sm12:""}},[a("v-select",{attrs:{items:["Male","Female"],label:"Gender*",required:""},model:{value:t.newPatient.gender,callback:function(e){t.$set(t.newPatient,"gender",e)},expression:"newPatient.gender"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:function(e){t.addPatientDialog=!1}}},[t._v("Close")]),a("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:t.addPatient}},[t._v("Save")])],1)],1)],1)],1)],1)},c=[],l=(a("7f7f"),a("bc3a")),u=a.n(l),d=a("a78e"),p=a.n(d),f=0,h=[];function m(t,e,a){var n=0;while(n<e){var r=t,i=Math.floor(Math.random()*(a.max-a.min+1))+a.min;h.push({x:r,y:i}),f=t,t+=3600,n++}}function v(t){var e=f+3600;f=e,h.push({x:e,y:t})}function g(){h.length>500&&(h=h.slice(h.length-400,h.length))}m((new Date).getTime(),1,{min:10,max:90});var b={data:function(){return{expand:!1,addPatientDialog:!1,newPatient:{},headers:[{text:"#",align:"center",sortable:!1,value:"id"},{text:"Name",align:"center",sortable:!1,value:"name"},{text:"Age",align:"center",sortable:!1,value:"age"},{text:"Gender",align:"center",sortable:!1,value:"gender"},{text:"Heart Rate",align:"center",sortable:!1,value:"heartrate"},{text:"Tempreture",align:"center",sortable:!1,value:"temp"},{text:"",align:"center",sortable:!1,value:"history"}],message:"",logs:[],patients:[],status:"disconnected",currentPatient:{},chartOptions:{chart:{animations:{enabled:!0,easing:"linear",dynamicAnimation:{speed:20}},toolbar:{show:!1},zoom:{enabled:!1}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:2},title:{text:"EMG Signal",align:"left"},markers:{size:0},xaxis:{type:"datetime",range:777600,labels:{show:!1}},yaxis:{max:5,min:0,forceNiceScale:!0},legend:{show:!1}},series:[{data:h.slice()}]}},computed:{webSocketConnected:function(){return this.$socket.isConnected}},watch:{webSocketConnected:function(t,e){if(t)for(var a=0;a<this.patients.length;a++){var n=this.patients[a].id;this.subscribePatient(n)}}},methods:{getPatients:function(){var t=this;u.a.get("api/patients/").then(function(e){t.patients=e.data;for(var a=0;a<t.patients.length;a++){var n=t.patients[a].id;t.subscribePatient(n)}}).catch(function(t){console.log(t)})},messageReceived:function(t){var e=JSON.parse(t.data);if("message"==e.type){var a=e.room,n=this.patients.filter(function(t){return t.id===a});n=n[0];try{n.temp=e.message.temp}catch(o){this.getPatients()}if(n.temp=e.message.temp,n.heartrate=e.message.heartrate,a==this.currentPatient.id)for(var r=JSON.parse(e.message.emg),i=0;i<r.length;i++){var s=r[i];v(s)}}},joinRoom:function(t){this.currentPatient.id===this.patients[t].id?this.currentPatient={}:(this.currentPatient.id=this.patients[t].id,this.currentPatient.name=this.patients[t].name,this.currentPatient.doctor=this.patients[t].doctor)},resetChart:function(){h=[];var t=[];this.currentPatient.id?u.a.get("api/patients/".concat(this.currentPatient.id,"/")).then(function(e){t=JSON.parse(e.data.emg),m((new Date).getTime(),1,{min:10,max:90});for(var a=0;a<t.length;a++){var n=t[a];console.log(t[a]),v(n)}}).catch(function(t){console.log(t)}):this.$refs.realtimeChart&&this.$refs.realtimeChart.updateSeries([{data:h}],!1,!0)},addPatient:function(){var t=this,e="api/patients/",a={};a.name=this.newPatient.name,a.age=this.newPatient.age,"Male"===this.newPatient.gender?a.gender=0:"Female"===this.newPatient.gender&&(a.gender=1);var n={headers:{"X-CSRFToken":p.a.get("csrftoken")}};u.a.post(e,a,n).then(function(e){0===e.data.gender?e.data.gender="Male":e.data.gender="Female",t.patients.push(e.data),t.newPatient={},t.addPatientDialog=!1,t.subscribePatient(e.data.id)}).catch(function(t){console.log(t.response)})},subscribePatient:function(t){return!!this.$store.state.socket.isConnected&&(this.$socket.sendObj(JSON.stringify({command:"join",patient:t})),!0)},intervals:function(){var t=this;window.setInterval(function(){t.$refs.realtimeChart&&t.$refs.realtimeChart.updateSeries([{data:h}])},20),window.setInterval(function(){g(),t.$refs.realtimeChart&&t.$refs.realtimeChart.updateSeries([{data:h}],!1,!0)},6e4)},leaveAllRooms:function(){for(var t=0;t<this.patients.length;t++){var e=this.patients[t].id;this.$socket.sendObj(JSON.stringify({command:"leave",patient:e}))}}},mounted:function(){this.intervals()},created:function(){var t=this;this.getPatients(),this.$socket.onmessage=function(e){return t.messageReceived(e)}},beforeDestroy:function(){}},x=b,_=a("2877"),C=a("6544"),P=a.n(C),w=a("8336"),y=a("b0af"),O=a("99d9"),k=a("12b2"),S=a("a523"),T=a("8fea"),V=a("169a"),$=a("0e8f"),E=a("132d"),j=a("a722"),N=a("b56d"),R=a("9910"),D=a("2677"),M=a("71d9"),A=a("2a7f"),F=Object(_["a"])(x,o,c,!1,null,null,null),J=F.exports;P()(F,{VBtn:w["a"],VCard:y["a"],VCardActions:O["a"],VCardText:O["b"],VCardTitle:k["a"],VContainer:S["a"],VDataTable:T["a"],VDialog:V["a"],VFlex:$["a"],VIcon:E["a"],VLayout:j["a"],VSelect:N["a"],VSpacer:R["a"],VTextField:D["a"],VToolbar:M["a"],VToolbarTitle:A["a"]});var I={name:"App",components:{Main:J},data:function(){return{}}},K=I,L=a("7496"),B=a("549c"),G=Object(_["a"])(K,i,s,!1,null,null,null),H=G.exports;P()(G,{VApp:L["a"],VBtn:w["a"],VContent:B["a"],VSpacer:R["a"],VToolbar:M["a"],VToolbarTitle:A["a"]});var q=a("8c4f"),z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Main")},U=[],X={components:{Main:J}},Q=X,W=Object(_["a"])(Q,z,U,!1,null,null,null),Y=W.exports,Z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[t._v(t._s(t.patient.name))]),a("v-spacer"),a("v-btn",{attrs:{color:"teal"},on:{click:function(e){return t.$router.push({path:"/"})}}},[a("v-icon",[t._v("keyboard_arrow_left")]),t._v("Back\n    ")],1)],1),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.data},scopedSlots:t._u([{key:"items",fn:function(e){return[a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.name))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.temp))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.heartrate))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.timestamp))])]}}])})],1)},tt=[],et={data:function(){return{headers:[{text:"Name",align:"center",sortable:!1,value:"name"},{text:"Tempreture",align:"center",sortable:!1,value:"temp"},{text:"Heartrate",align:"center",sortable:!1,value:"heartrate"},{text:"Timestamp",align:"center",sortable:!1,value:"timestamp"}],data:[],patient:{}}},methods:{get_patient:function(){var t=this,e=this.$route.params.id;if(this.patient={},parseInt(e)){var a="api/patients/".concat(e,"/");u.a.get(a).then(function(e){t.patient=e.data}).catch(function(t){console.log(t)})}},get_history:function(){var t=this,e=this.$route.params.id;if(this.data=[],parseInt(e)){var a="api/patients/".concat(e,"/history/");u.a.get(a).then(function(e){t.data=e.data}).catch(function(t){console.log(t)})}}},mounted:function(){this.get_patient(),this.get_history()}},at=et,nt=Object(_["a"])(at,Z,tt,!1,null,null,null),rt=nt.exports;P()(nt,{VBtn:w["a"],VDataTable:T["a"],VIcon:E["a"],VSpacer:R["a"],VToolbar:M["a"],VToolbarTitle:A["a"]});var it=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h1",[t._v("Not Found - 404")])},st=[],ot={data:function(){return{}}},ct=ot,lt=Object(_["a"])(ct,it,st,!1,null,null,null),ut=lt.exports;n["a"].use(q["a"]);var dt=new q["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:Y},{path:"/records/:id",name:"records",component:rt},{path:"*",name:"NotFound",component:ut}]}),pt=a("2f62");n["a"].use(pt["a"]);var ft=new pt["a"].Store({state:{socket:{isConnected:!1,message:"",reconnectError:!1}},mutations:{SOCKET_ONOPEN:function(t,e){n["a"].prototype.$socket=e.currentTarget,t.socket.isConnected=!0},SOCKET_ONCLOSE:function(t,e){t.socket.isConnected=!1},SOCKET_ONERROR:function(t,e){console.error(t,e)},SOCKET_ONMESSAGE:function(t,e){t.socket.message=e},SOCKET_RECONNECT:function(t,e){console.info(t,e)},SOCKET_RECONNECT_ERROR:function(t){t.socket.reconnectError=!0}},getters:{connected:function(t){return t.socket.isConnected}}}),ht=a("b408"),mt=a.n(ht),vt=a("1321"),gt=a.n(vt);n["a"].use(gt.a),n["a"].config.productionTip=!1,u.a.defaults.baseURL="http://54.154.198.148/",n["a"].use(mt.a,"ws://54.154.198.148/ws/monitor/",{store:ft,format:"json",reconnection:!0,reconnectionDelay:1e3}),n["a"].component("apexchart",gt.a),new n["a"]({router:dt,store:ft,render:function(t){return t(H)}}).$mount("#app")}});
//# sourceMappingURL=app.8fde59d6.js.map