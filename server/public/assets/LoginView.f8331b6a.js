import{g as u,l as m,m as h,r as v,o as f,c as b,a as s,d as w,w as g,n as x,q as r,v as l,f as V,p as y,e as S}from"./index.4d70681c.js";import{a as k}from"./axios.91e25212.js";import{_ as I}from"./_plugin-vue_export-helper.cdc0426e.js";const t=a=>(y("data-v-9a30b851"),a=a(),S(),a),L={class:"container"},U={class:"row"},B={class:"col"},N=t(()=>s("div",{id:"testing"}," Login to post in the Forums ",-1)),C={class:"col"},M=["onSubmit"],R={class:"mb-3"},T=t(()=>s("label",{for:"username",class:"form-label"},"Username",-1)),q={class:"mb-3"},A=t(()=>s("label",{for:"password",class:"form-label"},"Password",-1)),D=t(()=>s("button",{type:"submit",class:"btn btn-primary"},"Login",-1)),E=t(()=>s("div",{class:"other-logins"},[s("i",{class:"bi bi-google"}),s("i",{class:"bi bi-facebook"})],-1)),F={__name:"LoginView",setup(a){const c=u(),d=m(),o=h({username:"",password:""}),_=async()=>{await k.post("https://airsoft4ohio.com/api/login",{username:o.value.username,password:o.value.password}).then(e=>{console.log(e.data),e.data.success&&(c.setUserInfo(e.data.user),d.push("/"))}).catch(e=>{console.log(e.data)})};return(e,n)=>{const p=v("router-link");return f(),b("div",L,[s("div",U,[s("div",B,[N,s("p",null,[w(p,{to:"/register"},{default:g(()=>[V("Register")]),_:1})])]),s("div",C,[s("form",{onSubmit:x(_,["prevent"])},[s("div",R,[T,r(s("input",{class:"form-control",type:"text",name:"username",id:"username","onUpdate:modelValue":n[0]||(n[0]=i=>o.value.username=i)},null,512),[[l,o.value.username]])]),s("div",q,[A,r(s("input",{type:"password",class:"form-control",id:"password",name:"password","onUpdate:modelValue":n[1]||(n[1]=i=>o.value.password=i)},null,512),[[l,o.value.password]])]),D],40,M),E])])])}}},G=I(F,[["__scopeId","data-v-9a30b851"]]);export{G as default};
