import{l as P,m as u,s as _,r as V,o as m,c as p,a as s,d as k,w as R,n as S,q as n,v as d,u as f,t as v,h as w,f as C,p as U,e as I}from"./index.70c5934b.js";import{a as N}from"./axios.91e25212.js";import{_ as B}from"./_plugin-vue_export-helper.cdc0426e.js";const a=i=>(U("data-v-67bd002d"),i=i(),I(),i),E={class:"container"},M={class:"row"},D={class:"col"},H=a(()=>s("div",{id:"testing"}," Register to post in the Forums ",-1)),T={class:"col"},q=["onSubmit"],F={class:"mb-3"},L=a(()=>s("label",{for:"username",class:"form-label"},"Username",-1)),W={class:"mb-3"},j=a(()=>s("label",{for:"email",class:"form-label"},"Email address",-1)),z=a(()=>s("div",{id:"emailHelp",class:"form-text"},"We'll never share your email with anyone else.",-1)),A={class:"mb-3"},G=a(()=>s("label",{for:"password",class:"form-label"},"Password",-1)),J={class:"mb-3"},K=a(()=>s("label",{for:"confirmPassword",class:"form-label"},"Confirm Password",-1)),O={key:0,class:"text-danger"},Q=a(()=>s("button",{type:"submit",class:"btn btn-primary"},"Register",-1)),X={key:0,class:"text-danger"},Y=a(()=>s("div",{class:"other-logins"},[s("i",{class:"bi bi-google"}),s("i",{class:"bi bi-facebook"})],-1)),Z={__name:"RegisterView",setup(i){const h=P(),e=u({username:"",email:"",password:"",confirmPassword:""}),r=u(!1),c=u(!1),b=_(()=>e.value.password!==e.value.confirmPassword?(r.value="Passwords don't match...",!0):e.value.password.length<8&&e.value.password.length!==0?(r.value="Please user a longer password",!0):(r.value=!1,!1)),g=_(()=>{if(c.value)return!0}),y=async()=>{r.value?console.log("Could not submit"):await N.post("http://airsoft4ohio.com:5050/api/create/user",{username:e.value.username,email:e.value.email,password:e.value.password}).then(l=>{l.data.success||(c.value=l.data.message),l.data.success&&h.push("/login")}).catch(l=>{console.error(l)})};return(l,o)=>{const x=V("router-link");return m(),p("div",E,[s("div",M,[s("div",D,[H,s("p",null,[k(x,{to:"/login"},{default:R(()=>[C("Login")]),_:1})])]),s("div",T,[s("form",{onSubmit:S(y,["prevent"])},[s("div",F,[L,n(s("input",{class:"form-control",type:"text",name:"username",id:"username","onUpdate:modelValue":o[0]||(o[0]=t=>e.value.username=t)},null,512),[[d,e.value.username]])]),s("div",W,[j,n(s("input",{class:"form-control",type:"email",name:"email",id:"email","aria-describedby":"emailHelp","onUpdate:modelValue":o[1]||(o[1]=t=>e.value.email=t)},null,512),[[d,e.value.email]]),z]),s("div",A,[G,n(s("input",{type:"password",class:"form-control",id:"password",name:"password","onUpdate:modelValue":o[2]||(o[2]=t=>e.value.password=t)},null,512),[[d,e.value.password]])]),s("div",J,[K,n(s("input",{type:"password",class:"form-control",id:"confirmPassword",name:"confirmPassword","onUpdate:modelValue":o[3]||(o[3]=t=>e.value.confirmPassword=t)},null,512),[[d,e.value.confirmPassword]]),f(b)?(m(),p("p",O,v(r.value),1)):w("",!0)]),Q,f(g)?(m(),p("p",X,v(c.value),1)):w("",!0)],40,q),Y])])])}}},os=B(Z,[["__scopeId","data-v-67bd002d"]]);export{os as default};
