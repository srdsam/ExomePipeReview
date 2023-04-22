(this["webpackJsonpggcrd-client"]=this["webpackJsonpggcrd-client"]||[]).push([[0],{48:function(e,t){},58:function(e,t,a){e.exports=a(87)},63:function(e,t,a){},84:function(e,t){},85:function(e,t){},87:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(15),l=a.n(o),c=(a(63),a(18)),s=a(6),i=a(57),u=function(e){var t=e.component,a=Object(i.a)(e,["component"]);return r.a.createElement(s.b,Object.assign({},a,{render:function(e){return localStorage.getItem("user")?r.a.createElement(t,e):r.a.createElement(s.a,{to:{pathname:"/login",state:{from:e.location}}})}}))},m=a(40),d=a(10),h=a(11),p=a(13),g=a(12),E=a(39),v=a(26),f=function(e){Object(p.a)(a,e);var t=Object(g.a)(a);function a(){return Object(d.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){return r.a.createElement(E.a,{bg:"dark",variant:"dark"},r.a.createElement(E.a.Brand,{href:"/home"},"GGC"),r.a.createElement(v.a,{className:"ml-auto"},r.a.createElement(v.a.Link,{as:c.b,to:"/login"},"Logout")))}}]),a}(r.a.Component),A=a(23),b=a(17),y=a.n(b),S=a(24);function w(){var e=JSON.parse(localStorage.getItem("user"));return e&&e.authdata?{Authorization:"Basic "+e.authdata}:{}}var I="http://localhost:8002",C={login:function(e,t){var a={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:t})};return console.log(a),fetch("".concat(I,"/users/authenticate"),a).then(M).then((function(a){return a&&(a.authdata=window.btoa(e+":"+t),localStorage.setItem("user",JSON.stringify(a))),a}))},logout:_,getAll:function(){var e={method:"GET",headers:w()};return fetch("".concat(I,"/users"),e).then(M)}};function _(){localStorage.removeItem("user")}function M(e){return e.text().then((function(t){var a=t&&JSON.parse(t);if(!e.ok){401===e.status&&(_(),window.location.reload(!0));var n=a&&a.message||e.statusText;return Promise.reject(n)}return a}))}function O(e){return e.text().then((function(t){var a=t&&JSON.parse(t);if(200!==e.status){401===e.status&&(C.logout(),window.location.reload(!0));var n=a&&a.message||e.statusText;return Promise.reject(n)}return a}))}function N(){return(N=Object(S.a)(y.a.mark((function e(t){var a,n;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={method:"GET",headers:w()},n=t.toString(),e.next=4,fetch("".concat("http://127.0.0.1:8002","/proband/id?id=").concat(n),a).then((function(e){return e.json()})).then((function(e){return console.log(e),e}));case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var j={getProbands:function(){var e={method:"GET",headers:w()};return fetch("".concat("http://127.0.0.1:8002","/proband"),e).then((function(e){return e.json()})).then((function(e){return console.log(e),e}))},getProbandById:function(e){return N.apply(this,arguments)},getPheno:function(e){var t={method:"GET",headers:w()};return console.log("Get Pheno called: "+e),fetch("".concat("http://127.0.0.1:8002","/proband/pheno?id=").concat(e.substring(1,e.length-1)),t).then((function(e){return e.json()})).then((function(e){var t=e.map((function(e){return e.text}));return console.log(t.join(" - ")),t.join(" - ")}))},getGenes:function(e){var t={method:"GET",headers:w()};return fetch("".concat("http://127.0.0.1:8002","/proband/genes?id=").concat(e),t).then(O).then((function(e){return e||"Error"}))}},k=function(e){Object(p.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).state={user:{},users:[],probands:[],phenotypes:[]},n}return Object(h.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.setState({user:JSON.parse(localStorage.getItem("user")),users:{loading:!0},probands:{loading:!0},phenotypes:[]}),C.getAll().then((function(t){return e.setState({users:t})})),j.getProbands().then((function(t){e.setState({probands:t});for(var a=0;a<t.length;a++)j.getPheno(JSON.stringify(t[a].proband)).then((function(t){e.setState((function(e){return{phenotypes:[].concat(Object(m.a)(e.phenotypes),[Object(m.a)(t)])}}))}))}))}},{key:"render",value:function(){var e=this.state,t=e.user,a=(e.users,e.probands),n=e.phenotypes;return r.a.createElement("div",null,r.a.createElement(f,null),r.a.createElement("div",{className:"col-md-6 col-md-offset-0"},r.a.createElement("h1",null,"Hi ",t.firstName,"!"),r.a.createElement("p",null,"You're logged in with React & Basic HTTP Authentication!!")),r.a.createElement("div",{className:"col-md-12 col-md-offset-0"},r.a.createElement("h3",null,"Probands from secure api end point:"),!a.loading&&r.a.createElement(A.a,{striped:!0,bordered:!0,hover:!0,variant:"dark"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"#"),r.a.createElement("th",null,"Proband"),r.a.createElement("th",null,"Phenotype"),r.a.createElement("th",null,"Review Proband"))),r.a.createElement("tbody",null,a.map((function(e,t){return r.a.createElement("tr",{key:t},r.a.createElement("td",null,t),r.a.createElement("td",null,e.proband),r.a.createElement("td",null,n[t]),r.a.createElement("td",null,r.a.createElement("a",{href:window.location.origin.toString()+"/sample/:"+e.proband},r.a.createElement("div",null,"View Review Page ","->"))))}))))))}}]),a}(r.a.Component),G=a(50),P=a(27),D=function(e){Object(p.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(d.a)(this,a),n=t.call(this,e),C.logout(),n.state={username:"",password:"",submitted:!1,loading:!1,error:""},n.handleChange=n.handleChange.bind(Object(P.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(P.a)(n)),n}return Object(h.a)(a,[{key:"handleChange",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState(Object(G.a)({},a,n))}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault(),this.setState({submitted:!0});var a=this.state,n=a.username,r=a.password;a.returnUrl;n&&r&&(this.setState({loading:!0}),C.login(n,r).then((function(e){var a=(t.props.location.state||{from:{pathname:"/home"}}).from;t.props.history.push(a)}),(function(e){return t.setState({error:e,loading:!1})})))}},{key:"render",value:function(){var e=this.state,t=e.username,a=e.password,n=e.submitted,o=e.loading,l=e.error;return r.a.createElement("div",null,r.a.createElement("div",{className:"jumbotron jumbotron-fluid"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"}},r.a.createElement("h1",null,"Global Gene Corp")),r.a.createElement("h2",{style:{display:"flex",justifyContent:"center",alignItems:"center"}},"Database"),r.a.createElement("p",null),r.a.createElement("div",{className:"col-md-6 col-md-offset-3"},r.a.createElement("form",{name:"form",onSubmit:this.handleSubmit},r.a.createElement("div",{className:"form-group"+(n&&!t?" has-error":"")},r.a.createElement("label",{htmlFor:"username"},"Username"),r.a.createElement("input",{type:"text",className:"form-control",name:"username",value:t,onChange:this.handleChange}),n&&!t&&r.a.createElement("div",{className:"help-block"},"Username is required")),r.a.createElement("div",{className:"form-group"+(n&&!a?" has-error":"")},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{type:"password",className:"form-control",name:"password",value:a,onChange:this.handleChange}),n&&!a&&r.a.createElement("div",{className:"help-block"},"Password is required")),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-primary",disabled:o},"Login"),o&&r.a.createElement("img",{src:"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="})),l&&r.a.createElement("div",{className:"alert alert-danger"},l))))))}}]),a}(r.a.Component),x=a(25),R=a(20),V=a(51),J=a(55),L=a(38);var T={getClinVar:function(e){var t=e;return fetch("".concat("https://clinicaltables.nlm.nih.gov/api/variants/v4/search","?terms=").concat(t,"&df=").concat("AminoAcidChange,Chromosome,GeneSymbol,PhenotypeList,NucleotideChange,Type"),{method:"GET"}).then((function(e){return e.json()})).then((function(e){return e}))}},Q=function(e){Object(p.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).toggleShow=function(){var e=n.state.geneID;T.getClinVar(e.text).then((function(e){n.setState({data:e}),n.setState((function(e){return{isShow:!e.isShow}}))}))},n.state={isShow:!1,user:{},data:[],geneID:n.props.geneID},n}return Object(h.a)(a,[{key:"componentDidMount",value:function(){this.setState({user:JSON.parse(localStorage.getItem("user")),data:{loading:!0}})}},{key:"render",value:function(){var e=this.state.data;return r.a.createElement("div",null,r.a.createElement("div",{style:{justifyContent:"center"}},r.a.createElement(R.a,{variant:"info",onClick:this.toggleShow,type:"button"},"Clinvar API Results for Gene")),this.state.isShow?r.a.createElement("div",null,r.a.createElement("h2",null,"Clinvar Results"),r.a.createElement(A.a,{striped:!0,bordered:!0,hover:!0,variant:"dark"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Variant"),r.a.createElement("th",null,"Effect Type"),r.a.createElement("th",null,"AA Change"),r.a.createElement("th",null,"Phenotype"))),r.a.createElement("tbody",null,e[3].map((function(e,t){return r.a.createElement("tr",null,r.a.createElement("td",null,e[4]),r.a.createElement("td",null,e[5]),r.a.createElement("td",null,e[0]),r.a.createElement("td",null,e[3]))}))))):null)}}]),a}(n.Component);function q(){return(q=Object(S.a)(y.a.mark((function e(t,a,n){var r,o;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=new Headers).append("Content-Type","application/json"),o={method:"GET",headers:r,redirect:"follow"},"dbNSFP=CADD_raw,Polyphen2_HDIV_score,SIFT_score,MetaSVM_score,MetaLR_score,MetaSVM_pred,MetaLR_pred",e.abrupt("return",fetch("".concat("http://grch37.rest.ensembl.org/vep/homo_sapiens/hgvs","/").concat(n,":").concat(a,"/?").concat("dbNSFP=CADD_raw,Polyphen2_HDIV_score,SIFT_score,MetaSVM_score,MetaLR_score,MetaSVM_pred,MetaLR_pred"),o).then((function(e){return e.json()})).then((function(e){return e})).catch((function(e){console.log(e)})));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var B={getPathogenicity:function(e,t,a){return q.apply(this,arguments)}};function H(){return(H=Object(S.a)(y.a.mark((function e(t){var a,n,r,o,l,c,s;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=[],n=[],void 0==t)a.push("Fetch failed or rejected by http://grch37.rest.ensembl.org/vep/");else if(t.error)a.push(t.error);else if(t[0])if(r=t[0].transcript_consequences,n.push(t[0].most_severe_consequence),t[0].transcript_consequences)for(o=0;o<r.length;o++)l=r[o],c={exists:!0,transcript_id:l.transcript_id,metaSVM:l.metasvm_score,metaSVM_prediction:l.metasvm_pred,sift_score:l.sift_score,sift_prediction:l.sift_prediction,polyphen_score:l.polyphen_score,polyphen_prediction:l.polyphen_prediction,cadd_raw:l.cadd_raw,polyphen2_hdiv_score:l.polyphen2_hdiv_score,metalr_score:l.metalr_score,metalr_prediction:l.metalr_pred,most_severe_consequence:l.most_severe_consequence},a.push(c);else a.push("No variant pathogenecity scores/transcript consequences");else s={exists:!1},a.push(s);return console.log(n),e.abrupt("return",{results:a,consequence:n});case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var F=function(e){Object(p.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).updatePatho=function(){var e=n.state,t=e.chromosome,a=(e.hgsvG,e.hgsvC),r=e.accession;e.clicked;n.setState({clicked:!0}),B.getPathogenicity(t,a,r).then((function(e){(function(e){return H.apply(this,arguments)})(e).then((function(e){n.setState({data:e.results}),n.setState({clicked:!1}),n.setState({consequence:e.consequence})}))})).then((function(){n.setState((function(e){return{dataLoading:!e.dataLoading}}))}))},n.state={isShow:!1,user:{},data:[],chromosome:{},hgsvG:{},clicked:{},consequence:{}},n}return Object(h.a)(a,[{key:"componentDidMount",value:function(){this.setState({user:JSON.parse(localStorage.getItem("user")),data:[],dataLoading:!0,chromosome:this.props.chromosome,hgsvG:this.props.hgsvG,hgsvC:this.props.hgsvC,clicked:!1,consequence:"Unk",accession:this.props.accession}),this.updatePatho=this.updatePatho.bind(this)}},{key:"render",value:function(){var e=this.state,t=e.data,a=e.dataLoading,n=e.clicked,o=e.consequence;return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement(R.a,{variant:"info",onClick:this.updatePatho,type:"button"},"Get variant effect prediction (VEP) by API for ",String(this.props.hgsvC).substring(0,15)),!a&&r.a.createElement("div",null,r.a.createElement("h2",null,"VEP API Results"),r.a.createElement("div",null,"Most Severe Consequence: ",o.length<1?JSON.stringify(o):"Unknown"),r.a.createElement("div",null,t.map((function(e,t){return r.a.createElement("div",null,e.exists?r.a.createElement("div",null,r.a.createElement("h3",null,t+1,". ",e.transcript_id),e.most_severe_consequence&&r.a.createElement("li",null,"metaSVM ",e.most_severe_consequence),Number.isInteger(parseInt(e.sift_score))&&r.a.createElement("li",null,"SIFT score ",e.sift_score," (",e.sift_prediction,")"),Number.isInteger(parseInt(e.metaSVM))&&r.a.createElement("li",null,"metaSVM ",e.metaSVM," (",e.metaSVM_prediction,")"),Number.isInteger(parseInt(e.polyphen_score))&&r.a.createElement("li",null,"polyphen_score ",e.polyphen_score," (",e.polyphen_prediction,")"),Number.isInteger(parseInt(e.cadd_raw))&&r.a.createElement("li",null,"cadd_raw ",e.cadd_raw),e.polyphen2_hdiv_score&&r.a.createElement("li",null,"polyphen2_hdiv_score ",e.polyphen2_hdiv_score),e.metalr_score&&r.a.createElement("li",null,"metalr_score ",e.metalr_score," (",e.metalr_prediction,")"),!e.metalr_score&&!e.polyphen2_hdiv_score&&!e.polyphen_score&&!e.sift_score&&!e.metaSVM&&r.a.createElement("div",null,"No scores returned from Ensemble REST API.")):JSON.stringify(e))}))))),r.a.createElement("div",null,a&&n&&r.a.createElement(x.a,{animation:"border",role:"status",variant:"primary",size:"lg"},r.a.createElement("span",{className:"sr-only"},"Loading..."))))}}]),a}(n.Component),U=function(e){Object(p.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).state={user:{},users:[],proband:{},data:[],genes:[],showElem:[],reviewStatus:[],geneList:[],ACMG:[]},n}return Object(h.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.setState({user:JSON.parse(localStorage.getItem("user")),users:{loading:!0},proband:window.location.pathname.split(":")[1],isLoading:!0,data:{loading:!0},genes:[],showElem:[],reviewStatus:JSON.parse(localStorage.getItem("reviewStatus"+this.state.proband))||[],geneList:JSON.parse(localStorage.getItem("geneList"+this.state.proband))||[],ACMG:"UNK"}),console.log(JSON.parse(localStorage.getItem("reviewStatus"))),j.getProbandById(window.location.pathname.split(":")[1]).then((function(t){var a=function(e){for(var t=e[0].data,a=[],n=[],r=0;r<t.length;r++){var o=t[r],l={name:o.geneIdentifier.geneSymbol,variantScore:o.variantScore,priorityScore:o.priorityScore,combinedScore:o.combinedScore,compatibleInheritanceModes:o.compatibleInheritanceModes,variantEvaluations:o.variantEvaluations,geneScores:o.geneScores,HiPhive:o.priorityResults.HIPHIVE_PRIORITY.phenotypeEvidence,OMIM:o.priorityResults.OMIM_PRIORITY.associatedDiseases},c=o;a.push(l),n.push(c)}return{genes:a,raw:n}}(t),n=a.genes;a.raw;e.setState({data:n}),e.setState({isLoading:!1})})),j.getGenes(window.location.pathname.split(":")[1]).then((function(t){e.setState({genes:t}),e.setState({showElem:Array(t.length).fill(!1)}),e.state.reviewStatus||e.setState({reviewStatus:Array(t.length).fill("Incomplete")})}))}},{key:"showGene",value:function(e,t){var a=Array(this.state.showElem.length).fill(!1);a[t]=!0,this.setState({showElem:a})}},{key:"updateReviewStatus",value:function(e,t){var a=this.state.reviewStatus;a[t]=e,localStorage.setItem("reviewStatus"+this.state.proband,JSON.stringify(a)),this.setState({reviewStatus:a})}},{key:"updateGeneList",value:function(e,t,a,n){var r=this.state.geneList,o=this.state.showElem.indexOf(!0);r.push({Family_ID:"UNK",Individual_ID:"UNK",Sample_ID:this.state.proband,Gene:this.state.genes[o].text,Ensembl_ID:e.transcriptAnnotations[0].accession,Variant:"".concat(e.chromosomeName,":").concat(e.position,":").concat(e.ref,":").concat(e.alt),Inheritance:e.contributingInheritanceModes.join(", "),OMIM_Name:this.state.data[o].OMIM.map((function(e){return e.diseaseName})).length>0?this.state.data[o].OMIM.map((function(e){return e.diseaseName})).join(", "):"No Results",OMIM_ID:this.state.data[o].OMIM.map((function(e){return e.diseaseId})).length>0?this.state.data[o].OMIM.map((function(e){return e.diseaseId})).join(", "):"No Results",cDNA:e.transcriptAnnotations[0].hgvsCdna,Protein:e.transcriptAnnotations[0].hgvsProtein,ACMG:this.state.ACMG}),console.log(r),localStorage.setItem("geneList"+this.state.proband,JSON.stringify(r)),this.setState({geneList:r})}},{key:"handleAcmgOnChange",value:function(e){this.setState({ACMG:e.target.value})}},{key:"generateReport",value:function(){var e=this.state,t=e.geneList,a=e.proband;console.log("Clicked");var n=t,r="GGC_"+a,o={Sheets:{data:L.utils.json_to_sheet(n)},SheetNames:["data"]},l=L.write(o,{bookType:"xlsx",type:"array"}),c=new Blob([l],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});J.saveAs(c,r+".xlsx")}},{key:"render",value:function(){var e=this,t=this.state,a=t.proband,n=t.data,o=t.isLoading,l=t.genes,c=t.showElem,s=t.reviewStatus,i=(t.geneList,t.ACMG);return r.a.createElement("div",null,r.a.createElement(f,null),r.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"}},r.a.createElement(R.a,{onClick:function(t){return e.generateReport()}},"Generate Report")),r.a.createElement("div",null,r.a.createElement("h1",{style:{fontSize:"50px"}},"Proband - ",r.a.createElement("i",{style:{fontSize:"50px"}},a.toString()))),r.a.createElement("br",null),r.a.createElement(V.a,{defaultMenuIsOpen:!0,options:l.map((function(e,t){return{label:e.text+" [Review of Gene: "+s[t]+"]",value:t}})),onChange:function(t){return e.showGene(t.label,t.value)}}),r.a.createElement("br",null),o&&r.a.createElement(x.a,{animation:"border",role:"status",variant:"primary",size:"lg"},r.a.createElement("span",{className:"sr-only"},"Loading...")),!o&&n.map((function(t,a){return r.a.createElement("div",null,c[a]&&r.a.createElement("div",{className:"jumbotron jumbotron-fluid",key:l[a]},r.a.createElement("div",{className:"container"},r.a.createElement("h1",null,t.name),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-8"},r.a.createElement("div",null,r.a.createElement("h2",null,"Inheritance of Gene:"),t.compatibleInheritanceModes.map((function(e,t){return r.a.createElement("div",null,r.a.createElement("li",null,e))}))),r.a.createElement("br",null),console.log(t),t.OMIM.length>0&&r.a.createElement("div",null,r.a.createElement("h2",null,"OMIM Associated Diseases:"),t.OMIM.map((function(e,t){return r.a.createElement("div",null,r.a.createElement("li",null,e.diseaseName))}))),r.a.createElement("br",null),t.HiPhive.length>0&&r.a.createElement("div",null,r.a.createElement("h2",null,"HiPhive Results:"),t.HiPhive.map((function(e,t){return r.a.createElement("div",null,r.a.createElement("h3",{style:{fontSize:"12px"}},"Organism: ",e.model.organism),r.a.createElement("div",null,"Model Score: ",e.score),e.model.diseaseTerm&&r.a.createElement("div",null,"Disease Term: ",e.model.diseaseTerm),e.bestModelPhenotypeMatches&&e.bestModelPhenotypeMatches.map((function(e,t){return r.a.createElement("div",null,"Matched Phenotype: ",JSON.stringify(e.match.label))})))}))),r.a.createElement("br",null),t.variantEvaluations.map((function(e,t){return r.a.createElement("div",null,r.a.createElement(F,{chromosome:e.chromosomeName,hgsvG:e.transcriptAnnotations[0].hgvsGenomic,hgsvC:e.transcriptAnnotations[0].hgvsCdna,accession:e.transcriptAnnotations[0].accession}),r.a.createElement("br",null))}))),r.a.createElement("div",{className:"col-md-4"},r.a.createElement("h2",null,"Exomiser Scores:"),r.a.createElement("p",{style:{textAlign:"left"}},"Variant Score: ",t.variantScore),r.a.createElement("p",{style:{textAlign:"left"}},"Priority Score: ",t.priorityScore),r.a.createElement("p",{style:{textAlign:"left"}},"Combined Score: ",t.combinedScore),r.a.createElement("br",null),r.a.createElement(Q,{geneID:l[a]}),r.a.createElement("br",null),r.a.createElement("div",null,"ACMG Intepretation to add to Report for Selected Variant",r.a.createElement("div",{className:"input-group mb-3"},r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("span",{className:"input-group-text",id:"basic-addon1"},"ACMG: ")),r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Username","aria-label":"Username",value:i,onChange:function(t){return e.handleAcmgOnChange(t)},"aria-describedby":"basic-addon1"}))))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("h2",null,"Variants Analysis by Exomiser"),r.a.createElement(A.a,{striped:!0,bordered:!0,hover:!0,variant:"dark"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Variant"),r.a.createElement("th",null,"Effect Type"),r.a.createElement("th",null,"Variant Score"),r.a.createElement("th",null,"Phred Score"),r.a.createElement("th",null,"Frequency Score"),r.a.createElement("th",null,"Frequency Sources"),r.a.createElement("th",null,"Transcript Annotations"),r.a.createElement("th",null,"Pathogenecity Data"),r.a.createElement("th",null,"Add to Report"))),r.a.createElement("tbody",null,t.variantEvaluations.map((function(t,a){return r.a.createElement("tr",null,r.a.createElement("td",{style:{maxWidth:"20px",wordWrap:"break-word"}},t.chromosomeName,":",t.position,":",t.ref,":",t.alt),r.a.createElement("td",null,t.variantEffect),r.a.createElement("td",null,t.variantScore),r.a.createElement("td",null,t.phredScore),r.a.createElement("td",null,t.frequencyScore),r.a.createElement("td",{style:{maxWidth:"200px"}},t.frequencyData.knownFrequencies.map((function(e,t){return r.a.createElement("div",null,e.source," : ",e.frequency)}))),r.a.createElement("td",{style:{columnSpan:"50px",maxWidth:"250px",wordWrap:"break-word"}},t.transcriptAnnotations.map((function(e,t){return r.a.createElement("li",null,e.hgvsCdna,": ",e.variantEffect," (",e.accession,") ",r.a.createElement("br",null))}))),r.a.createElement("td",null,t.pathogenicityData.clinVarData.empty&&r.a.createElement("div",null,"No Clinvar Results"),!t.pathogenicityData.clinVarData.empty&&r.a.createElement("div",null,"Review Status: ",t.pathogenicityData.clinVarData.reviewStatus,r.a.createElement("br",null),"Intepretation: ",t.pathogenicityData.clinVarData.primaryInterpretation),r.a.createElement("br",null),t.pathogenicityData.mostPathogenicScore&&t.pathogenicityData.predictedPathogenicityScores.map((function(e,t){return r.a.createElement("div",null,"source: ",e.source,r.a.createElement("br",null),"score: ",e.score)}))),r.a.createElement("td",null,r.a.createElement(R.a,{onClick:function(n){return e.updateGeneList(t,a,t.transcriptAnnotations[0].geneSymbol)}},"Add")))})))),r.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"}},r.a.createElement(R.a,{onClick:function(t){return e.updateReviewStatus("Complete",a)}},"Gene Reviewed")))))))})))}}]),a}(r.a.Component);a(86);var K=function(){return r.a.createElement("div",null,r.a.createElement(c.a,null,r.a.createElement("div",null,r.a.createElement(u,{exact:!0,path:"/home",component:k}),r.a.createElement(u,{exact:!0,path:"/",component:k}),r.a.createElement(u,{path:"/sample/:id",component:U}),r.a.createElement(s.b,{path:"/login",component:D}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(K,null),document.getElementById("app")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[58,1,2]]]);
//# sourceMappingURL=main.5eef07d5.chunk.js.map