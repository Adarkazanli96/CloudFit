(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{198:function(e,t,a){e.exports=a(492)},203:function(e,t,a){},205:function(e,t,a){},206:function(e,t,a){},207:function(e,t,a){},435:function(e,t,a){},471:function(e,t,a){},472:function(e,t,a){},473:function(e,t,a){},474:function(e,t,a){},492:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(58),i=a.n(s),o=(a(203),a(12)),c=a.n(o),l=a(22),u=a(29),m=a(30),d=a(33),h=a(31),p=a(32),f=(a(205),a(186)),g=a(74),b=(a(206),function(){return r.a.createElement("div",{className:"NotFound"},r.a.createElement("h3",null,"Sorry, page not found!"))}),E=a(47),v=a(495),y=a(496),w=a(501),S=(a(207),a(17)),O=a.n(S),k=a(36),x=a(494),C=a(193),j=(a(435),function(e){var t=e.isLoading,a=e.text,n=e.loadingText,s=e.className,i=void 0===s?"":s,o=e.disabled,c=void 0!==o&&o,l=Object(k.a)(e,["isLoading","text","loadingText","className","disabled"]);return r.a.createElement(x.a,Object.assign({className:"LoaderButton ".concat(i),disabled:c||t},l),t&&r.a.createElement(C.a,{glyph:"refresh",className:"spinning"}),t?n:a)}),I=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).handleChange=function(e){a.setState(Object(E.a)({},e.target.id,e.target.value))},a.handleSubmit=function(){var e=Object(l.a)(c.a.mark(function e(t){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a.setState({isLoading:!0}),e.prev=2,e.next=5,S.Auth.signIn(a.state.email,a.state.password);case 5:a.props.userHasAuthenticated(!0),a.props.history.push("/"),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(2),alert(e.t0.message),a.setState({isLoading:!1});case 13:case"end":return e.stop()}},e,null,[[2,9]])}));return function(t){return e.apply(this,arguments)}}(),a.state={isLoading:!1,email:"",password:""},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"validateForm",value:function(){return this.state.email.length>0&&this.state.password.length>0}},{key:"render",value:function(){return r.a.createElement("div",{className:"Login"},r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("h2",null,"Login"),r.a.createElement(v.a,{controlId:"email",bsSize:"large"},r.a.createElement(y.a,null,"Email"),r.a.createElement(w.a,{autoFocus:!0,type:"email",value:this.state.email,onChange:this.handleChange})),r.a.createElement(v.a,{controlId:"password",bsSize:"large"},r.a.createElement(y.a,null,"Password"),r.a.createElement(w.a,{value:this.state.password,onChange:this.handleChange,type:"password"})),r.a.createElement(j,{block:!0,bsSize:"large",disabled:!this.validateForm(),type:"submit",isLoading:this.state.isLoading,text:"Login",loadingText:"Logging in\u2026"})))}}]),t}(n.Component),L=a(197),N=a(75),A={MAX_ATTACHMENT_SIZE:5e6,s3:{REGION:"us-east-1",BUCKET:"excel-sheets-storage"},apiGateway:{REGION:"us-east-1",URL:"https://e1vbu6oai2.execute-api.us-east-1.amazonaws.com/test"},cognito:{REGION:"us-east-1",USER_POOL_ID:"us-east-1_B2ywZlmTC",APP_CLIENT_ID:"2h8oid4vg85dmuqk8kai95brhe",IDENTITY_POOL_ID:"us-east-1:beeb9d71-05e8-4859-b4ed-0da545d78c0f"}};a(471);function T(e){return P.apply(this,arguments)}function P(){return(P=Object(l.a)(c.a.mark(function e(t){var a,n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a="".concat(Date.now(),"-").concat(t.name),e.next=3,S.Storage.vault.put(a,t,{contentType:t.type});case 3:return n=e.sent,e.abrupt("return",n.key);case 5:case"end":return e.stop()}},e)}))).apply(this,arguments)}a(472);var D=function(e){return r.a.createElement("div",{className:"popup-container "+e.color},r.a.createElement("div",{style:{textAlign:"center",opacity:1},className:"content"},e.content))},_=(a(473),function(e){return r.a.createElement("div",{className:"sheet"},r.a.createElement("span",{className:"left-block"},r.a.createElement("span",{className:"date"},"Date: ",e.data.body.workoutDate),r.a.createElement("span",{className:"time"},"Time: ",e.data.body.workoutTime),r.a.createElement("br",null),"Duration: ",e.data.body.duration,r.a.createElement("br",null),"Maximum Heart Rate: ",e.data.body.maximumHeartRate,r.a.createElement("br",null),"Mean Heart Rate: ",e.data.body.meanHeartRate,r.a.createElement("br",null),"Notes: ",e.data.body.notes),r.a.createElement("span",{className:"right-block"},r.a.createElement("div",{className:"graph"},"Data")))}),F=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).state={notes:null,isLoading:!0},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e="There are no sheets uploaded";return null!=this.props.sheets&&(e=this.props.sheets.map(function(e,t){return r.a.createElement(_,{data:e,key:t,id:t})})),r.a.createElement("div",null,e)}}]),t}(r.a.Component),R=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).handleChange=function(e){a.setState(Object(E.a)({},e.target.id,e.target.value))},a.handleFileChange=function(e){a.file=e.target.files[0],a.setState({file:e.target.files[0]})},a.getSheets=Object(l.a)(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.API.get("getSheets","/").then(function(e){t=e});case 3:a.setState({sheets:t}),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),alert(e.t0);case 9:a.setState({sheetsLoading:!1});case 10:case"end":return e.stop()}},e,null,[[0,6]])})),a.handleSubmit=function(){var e=Object(l.a)(c.a.mark(function e(t){var n,r,s;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!(a.file&&a.file.size>A.MAX_ATTACHMENT_SIZE)){e.next=4;break}return alert("Please pick a file smaller than ".concat(A.MAX_ATTACHMENT_SIZE/1e6," MB.")),e.abrupt("return");case 4:if(a.setState({isLoading:!0}),e.prev=5,!a.file){e.next=12;break}return e.next=9,T(a.state.file).then(function(e){n=e,console.log(e)});case 9:e.t0=e.sent,e.next=13;break;case 12:e.t0=null;case 13:return e.t0,e.next=16,S.Auth.currentUserCredentials().then(function(e){r=e.data.IdentityId,console.log(e.data.IdentityId)});case 16:return s={body:{name:n,bucket:"excel-sheets-storage",userId:r}},e.next=19,S.API.post("postSheet","/",s).then(function(e){console.log(e.body),a.setState({sheets:[].concat(Object(L.a)(a.state.sheets),[e.body])})});case 19:a.setState({isLoading:!1,error:!1}),e.next=27;break;case 22:e.prev=22,e.t1=e.catch(5),alert(e.t1),console.log("there was an error"),a.setState({isLoading:!1,error:!0});case 27:document.getElementById("drop-form").reset(),a.setState({showPopup:!0,file:null}),a.file=null,setTimeout(function(){this.setState({showPopup:!1})}.bind(Object(N.a)(a)),2500);case 31:case"end":return e.stop()}},e,null,[[5,22]])}));return function(t){return e.apply(this,arguments)}}(),a.file=null,a.state={isLoading:null,file:null,showPopup:!1,error:!1,sheets:null,sheetsLoading:!0},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"validateForm",value:function(){return null!==this.state.file&&"undefined"!==typeof this.state.file}},{key:"componentDidMount",value:function(){var e=Object(l.a)(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this.getSheets();case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e;return e=this.state.error?r.a.createElement(D,{content:"There was an error in uploading the file",color:"red"}):r.a.createElement(D,{content:"File upload successful",color:"green"}),r.a.createElement("div",{className:"upload-form"},r.a.createElement("form",{onSubmit:this.handleSubmit,id:"drop-form"},r.a.createElement("div",{className:"file-drop-area"},this.state.showPopup?e:null,r.a.createElement("span",{className:"fake-btn"},"Choose file"),r.a.createElement("span",{className:"file-msg"},null===this.state.file||"undefined"===typeof this.state.file?"or drag and drop files here":this.state.file.name),r.a.createElement("input",{className:"file-input",type:"file",onChange:this.handleFileChange})),r.a.createElement(j,{style:{marginTop:"7px"},bsStyle:"primary",bsSize:"large",disabled:!this.validateForm(),type:"submit",isLoading:this.state.isLoading,text:"Submit",loadingText:"Submitting\u2026"})),this.state.sheetsLoading?r.a.createElement("div",{className:"loader"}):r.a.createElement(F,{sheets:this.state.sheets}))}}]),t}(n.Component),H=a(497),z=(a(474),function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).handleChange=function(e){a.setState(Object(E.a)({},e.target.id,e.target.value))},a.handleSubmit=function(){var e=Object(l.a)(c.a.mark(function e(t){var n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a.setState({isLoading:!0}),e.prev=2,e.next=5,S.Auth.signUp({username:a.state.email,password:a.state.password});case 5:n=e.sent,a.setState({newUser:n}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),alert(e.t0.message);case 12:a.setState({isLoading:!1});case 13:case"end":return e.stop()}},e,null,[[2,9]])}));return function(t){return e.apply(this,arguments)}}(),a.handleConfirmationSubmit=function(){var e=Object(l.a)(c.a.mark(function e(t){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a.setState({isLoading:!0}),e.prev=2,e.next=5,S.Auth.confirmSignUp(a.state.email,a.state.confirmationCode);case 5:return e.next=7,S.Auth.signIn(a.state.email,a.state.password);case 7:a.props.userHasAuthenticated(!0),a.props.history.push("/"),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(2),alert(e.t0.message),a.setState({isLoading:!1});case 15:case"end":return e.stop()}},e,null,[[2,11]])}));return function(t){return e.apply(this,arguments)}}(),a.state={isLoading:!1,email:"",password:"",confirmPassword:"",confirmationCode:"",newUser:null},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"validateForm",value:function(){return this.state.email.length>0&&this.state.password.length>0&&this.state.password===this.state.confirmPassword}},{key:"validateConfirmationForm",value:function(){return this.state.confirmationCode.length>0}},{key:"renderConfirmationForm",value:function(){return r.a.createElement("form",{onSubmit:this.handleConfirmationSubmit},r.a.createElement(v.a,{controlId:"confirmationCode",bsSize:"large"},r.a.createElement(y.a,null,"Confirmation Code"),r.a.createElement(w.a,{autoFocus:!0,type:"tel",value:this.state.confirmationCode,onChange:this.handleChange}),r.a.createElement(H.a,null,"Please check your email for the code.")),r.a.createElement(j,{block:!0,bsSize:"large",disabled:!this.validateConfirmationForm(),type:"submit",isLoading:this.state.isLoading,text:"Verify",loadingText:"Verifying\u2026"}))}},{key:"renderForm",value:function(){return r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("h2",null,"Signup"),r.a.createElement(v.a,{controlId:"email",bsSize:"large"},r.a.createElement(y.a,null,"Email"),r.a.createElement(w.a,{autoFocus:!0,type:"email",value:this.state.email,onChange:this.handleChange})),r.a.createElement(v.a,{controlId:"password",bsSize:"large"},r.a.createElement(y.a,null,"Password"),r.a.createElement(w.a,{value:this.state.password,onChange:this.handleChange,type:"password"})),r.a.createElement(v.a,{controlId:"confirmPassword",bsSize:"large"},r.a.createElement(y.a,null,"Confirm Password"),r.a.createElement(w.a,{value:this.state.confirmPassword,onChange:this.handleChange,type:"password"})),r.a.createElement(j,{block:!0,bsSize:"large",disabled:!this.validateForm(),type:"submit",isLoading:this.state.isLoading,text:"Signup",loadingText:"Signing up\u2026"}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"Signup"},null===this.state.newUser?this.renderForm():this.renderConfirmationForm())}}]),t}(n.Component)),U=a(187),G=function(e){var t=e.component,a=e.props,n=Object(k.a)(e,["component","props"]);return r.a.createElement(g.a,Object.assign({},n,{render:function(e){return a.isAuthenticated?r.a.createElement(t,Object.assign({},e,a)):r.a.createElement(U.a,{to:"/login"})}}))},M=function(e){var t=e.component,a=e.props,n=Object(k.a)(e,["component","props"]);return r.a.createElement(g.a,Object.assign({},n,{render:function(e){return a.isAuthenticated?r.a.createElement(U.a,{to:"/login"}):r.a.createElement(t,Object.assign({},e,a))}}))},B=function(e){var t=e.childProps;return r.a.createElement(f.a,null,r.a.createElement(M,{path:"/login",exact:!0,component:I,props:t}),r.a.createElement(G,{path:"/",exact:!0,component:R,props:t}),r.a.createElement(M,{path:"/signup",exact:!0,component:z,props:t}),r.a.createElement(g.a,{component:b}))},Z=a(59),W=a(188),X=a(500),Y=a(498),J=a(499),K=a(105),V=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).userHasAuthenticated=function(e){a.setState({isAuthenticated:e})},a.handleLogout=function(){var e=Object(l.a)(c.a.mark(function e(t){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.Auth.signOut();case 2:a.userHasAuthenticated(!1);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.state={isAuthenticated:!1,isAuthenticating:!0},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=Object(l.a)(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.Auth.currentSession();case 3:this.userHasAuthenticated(!0),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),"No current user"!==e.t0&&alert(e.t0);case 9:this.setState({isAuthenticating:!1});case 10:case"end":return e.stop()}},e,this,[[0,6]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e={isAuthenticated:this.state.isAuthenticated,userHasAuthenticated:this.userHasAuthenticated};return!this.state.isAuthenticating&&r.a.createElement("div",{className:"App container"},r.a.createElement(X.a,{className:"nbar",fluid:!0,collapseOnSelect:!0},r.a.createElement(X.a.Header,null,r.a.createElement(X.a.Brand,null,r.a.createElement(Z.a,{style:{color:"white"},to:"/"},"simplelogs")),r.a.createElement(X.a.Toggle,null)),r.a.createElement(X.a.Collapse,null,r.a.createElement(Y.a,{pullRight:!0},this.state.isAuthenticated?r.a.createElement(J.a,{onClick:this.handleLogout},"Logout"):r.a.createElement(n.Fragment,null,r.a.createElement(K.LinkContainer,{to:"/signup"},r.a.createElement(J.a,null,"Signup")),r.a.createElement(K.LinkContainer,{to:"/login"},r.a.createElement(J.a,null,"Login")))))),r.a.createElement("div",{className:"everything-else"},r.a.createElement(B,{childProps:e})))}}]),t}(r.a.Component),q=Object(W.a)(V);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var $=a(181);O.a.configure({Auth:{mandatorySignIn:!0,region:A.cognito.REGION,userPoolId:A.cognito.USER_POOL_ID,identityPoolId:A.cognito.IDENTITY_POOL_ID,userPoolWebClientId:A.cognito.APP_CLIENT_ID},Storage:{region:A.s3.REGION,bucket:A.s3.BUCKET,identityPoolId:A.cognito.IDENTITY_POOL_ID},API:{endpoints:[{name:"getSheets",endpoint:A.apiGateway.URL,region:A.apiGateway.REGION},{name:"postSheet",endpoint:"https://ml7j1zkvo2.execute-api.us-east-1.amazonaws.com/test",region:A.apiGateway.REGION}]}}),i.a.render(r.a.createElement($.a,null,r.a.createElement(q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},84:function(e,t){},91:function(e,t){}},[[198,1,2]]]);
//# sourceMappingURL=main.1d19b2fb.chunk.js.map