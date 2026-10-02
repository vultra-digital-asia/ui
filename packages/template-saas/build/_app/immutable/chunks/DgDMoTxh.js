import{b as We,a as le,d as Ye,c as je}from"./XctxH4qP.js";import{G as X,b as Oe,aO as Le,m as E,z as G,ap as Me,w as Z,g as P,x as $e,ac as qe,y as ce,A as F,B as z,aq as Ke,ax as Xe,ai as de,i as Ze,aP as M,I as $,aQ as Je,K as Qe,_ as me,aR as Re,aw as fe,aS as xe,aT as er,aH as rr,V as ve,aU as ar,U as ir,C as He,F as Pe,aV as m,v as De,aW as fr,aX as nr,au as sr,J as tr,D as J,ar as ur,aY as or,E as lr,az as cr,T as dr,q as ze,aZ as vr,a_ as Fe,aI as ye,a$ as he,b0 as ge,b1 as hr,o as gr,b2 as _r,b3 as br,b4 as pr,b5 as Ar,b6 as Er,b7 as Tr,b8 as q,b9 as Sr,ba as Nr,bb as Cr,bc as wr,bd as Ir,M as kr,aL as Or,L as _e,be,j as re,bf as Lr,bg as D,Z as Mr,bh as Rr,c as Hr,d as Pr,e as Dr,f as zr,h as Fr,r as yr,u as Br,bi as Gr}from"./CQQcQ0LT.js";import{c as Ur,f as Vr,d as Wr,a as Yr,g as jr,n as $r,j as qr}from"./DEZZT15H.js";import{B as Kr}from"./zV7Mdz7G.js";import{l as pe,p as B}from"./DU0nCbQG.js";function Xr(e,r){return r}function Zr(e,r,a){for(var i=[],f=r.length,n,s=r.length,u=0;u<f;u++){let g=r[u];Pe(g,()=>{if(n){if(n.pending.delete(g),n.done.add(g),n.pending.size===0){var c=e.outrogroups;ae(e,fe(n.done)),c.delete(n),c.size===0&&(e.outrogroups=null)}}else s-=1},!1)}if(s===0){var o=i.length===0&&a!==null;if(o){var d=a,l=d.parentNode;sr(l),l.append(d),e.items.clear()}ae(e,r,!o)}else n={pending:new Set(r),done:new Set},(e.outrogroups??(e.outrogroups=new Set)).add(n)}function ae(e,r,a=!0){var i;if(e.pending.size>0){i=new Set;for(const s of e.pending.values())for(const u of s)i.add(e.items.get(u).e)}for(var f=0;f<r.length;f++){var n=r[f];if(i!=null&&i.has(n)){n.f|=M;const s=document.createDocumentFragment();tr(n,s)}else J(r[f],a)}}var Ae;function Jr(e,r,a,i,f,n=null){var s=e,u=new Map,o=(r&Le)!==0;if(o){var d=e;s=E?G(Me(d)):d.appendChild(X())}E&&Z();var l=null,g=me(()=>{var A=a();return Re(A)?A:A==null?[]:fe(A)}),c,p=new Map,_=!0;function N(A){(I.effect.f&ir)===0&&(I.pending.delete(A),I.fallback=l,Qr(I,c,s,r,i),l!==null&&(c.length===0?(l.f&M)===0?He(l):(l.f^=M,Y(l,null,s)):Pe(l,()=>{l=null})))}function t(A){I.pending.delete(A)}var h=Oe(()=>{c=P(g);var A=c.length;let w=!1;if(E){var C=$e(s)===qe;C!==(A===0)&&(s=ce(),G(s),F(!1),w=!0)}for(var L=new Set,v=Ze,b=Qe(),T=0;T<A;T+=1){E&&z.nodeType===Ke&&z.data===Xe&&(s=z,w=!0,F(!1));var O=c[T],S=i(O,T),k=_?null:u.get(S);k?(k.v&&de(k.v,O),k.i&&de(k.i,T),b&&v.unskip_effect(k.e)):(k=mr(u,_?s:Ae??(Ae=X()),O,S,T,f,r,a),_||(k.e.f|=M),u.set(S,k)),L.add(S)}if(A===0&&n&&!l&&(_?l=$(()=>n(s)):(l=$(()=>n(Ae??(Ae=X()))),l.f|=M)),A>L.size&&Je(),E&&A>0&&G(ce()),!_)if(p.set(v,L),b){for(const[y,K]of u)L.has(y)||v.skip_effect(K.e);v.oncommit(N),v.ondiscard(t)}else N(v);w&&F(!0),P(g)}),I={effect:h,items:u,pending:p,outrogroups:null,fallback:l};_=!1,E&&(s=z)}function U(e){for(;e!==null&&(e.f&fr)===0;)e=e.next;return e}function Qr(e,r,a,i,f){var O,S,k,y,K,ne,se,te,ue;var n=(i&nr)!==0,s=r.length,u=e.items,o=U(e.effect.first),d,l=null,g,c=[],p=[],_,N,t,h;if(n)for(h=0;h<s;h+=1)_=r[h],N=f(_,h),t=u.get(N).e,(t.f&M)===0&&((S=(O=t.nodes)==null?void 0:O.a)==null||S.measure(),(g??(g=new Set)).add(t));for(h=0;h<s;h+=1){if(_=r[h],N=f(_,h),t=u.get(N).e,e.outrogroups!==null)for(const R of e.outrogroups)R.pending.delete(t),R.done.delete(t);if((t.f&m)!==0&&(He(t),n&&((y=(k=t.nodes)==null?void 0:k.a)==null||y.unfix(),(g??(g=new Set)).delete(t))),(t.f&M)!==0)if(t.f^=M,t===o)Y(t,null,a);else{var I=l?l.next:o;t===e.effect.last&&(e.effect.last=t.prev),t.prev&&(t.prev.next=t.next),t.next&&(t.next.prev=t.prev),H(e,l,t),H(e,t,I),Y(t,I,a),l=t,c=[],p=[],o=U(l.next);continue}if(t!==o){if(d!==void 0&&d.has(t)){if(c.length<p.length){var A=p[0],w;l=A.prev;var C=c[0],L=c[c.length-1];for(w=0;w<c.length;w+=1)Y(c[w],A,a);for(w=0;w<p.length;w+=1)d.delete(p[w]);H(e,C.prev,L.next),H(e,l,C),H(e,L,A),o=A,l=L,h-=1,c=[],p=[]}else d.delete(t),Y(t,o,a),H(e,t.prev,t.next),H(e,t,l===null?e.effect.first:l.next),H(e,l,t),l=t;continue}for(c=[],p=[];o!==null&&o!==t;)(d??(d=new Set)).add(o),p.push(o),o=U(o.next);if(o===null)continue}(t.f&M)===0&&c.push(t),l=t,o=U(t.next)}if(e.outrogroups!==null){for(const R of e.outrogroups)R.pending.size===0&&(ae(e,fe(R.done)),(K=e.outrogroups)==null||K.delete(R));e.outrogroups.size===0&&(e.outrogroups=null)}if(o!==null||d!==void 0){var v=[];if(d!==void 0)for(t of d)(t.f&m)===0&&v.push(t);for(;o!==null;)(o.f&m)===0&&o!==e.fallback&&v.push(o),o=U(o.next);var b=v.length;if(b>0){var T=(i&Le)!==0&&s===0?a:null;if(n){for(h=0;h<b;h+=1)(se=(ne=v[h].nodes)==null?void 0:ne.a)==null||se.measure();for(h=0;h<b;h+=1)(ue=(te=v[h].nodes)==null?void 0:te.a)==null||ue.fix()}Zr(e,v,T)}}n&&De(()=>{var R,oe;if(g!==void 0)for(t of g)(oe=(R=t.nodes)==null?void 0:R.a)==null||oe.apply()})}function mr(e,r,a,i,f,n,s,u){var o=(s&xe)!==0?(s&er)===0?rr(a,!1,!1):ve(a):null,d=(s&ar)!==0?ve(f):null;return{v:o,i:d,e:$(()=>(n(r,o??a,d??f,u),()=>{e.delete(i)}))}}function Y(e,r,a){if(e.nodes)for(var i=e.nodes.start,f=e.nodes.end,n=r&&(r.f&M)===0?r.nodes.start:a;i!==null;){var s=ur(i);if(n.before(i),i===f)return;i=s}}function H(e,r,a){r===null?e.effect.first=a:r.next=a,a===null?e.effect.last=r:a.prev=r}function xr(e,r,a,i,f){var u;E&&Z();var n=(u=r.$$slots)==null?void 0:u[a],s=!1;n===!0&&(n=r.children,s=!0),n===void 0||n(e,s?()=>i:i)}function ea(e,r,a,i,f,n){let s=E;E&&Z();var u=null;E&&z.nodeType===or&&(u=z,Z());var o=E?z:e,d=new Kr(o,!1);Oe(()=>{const l=r()||null;var g=vr;if(l===null){d.ensure(null,null);return}return d.ensure(l,c=>{if(l){if(u=E?u:cr(l,g),We(u,u),i){var p=null;E&&Ur(l)&&u.append(p=document.createComment(""));var _=E?Me(u):u.appendChild(X());E&&(_===null?F(!1):G(_)),i(u,_),p==null||p.remove()}dr.nodes.end=u,c.before(u)}E&&G(c)}),()=>{}},lr),ze(()=>{}),s&&(F(!0),G(o))}function ra(e,r){var a=void 0,i;Fe(()=>{a!==(a=r())&&(i&&(J(i),i=null),a&&(i=$(()=>{ye(()=>a(e))})))})}function Be(e){var r,a,i="";if(typeof e=="string"||typeof e=="number")i+=e;else if(typeof e=="object")if(Array.isArray(e)){var f=e.length;for(r=0;r<f;r++)e[r]&&(a=Be(e[r]))&&(i&&(i+=" "),i+=a)}else for(a in e)e[a]&&(i&&(i+=" "),i+=a);return i}function aa(){for(var e,r,a=0,i="",f=arguments.length;a<f;a++)(e=arguments[a])&&(r=Be(e))&&(i&&(i+=" "),i+=r);return i}function ia(e){return typeof e=="object"?aa(e):e??""}const Ee=[...` 	
\r\f \v\uFEFF`];function fa(e,r,a){var i=e==null?"":""+e;if(a){for(var f of Object.keys(a))if(a[f])i=i?i+" "+f:f;else if(i.length)for(var n=f.length,s=0;(s=i.indexOf(f,s))>=0;){var u=s+n;(s===0||Ee.includes(i[s-1]))&&(u===i.length||Ee.includes(i[u]))?i=(s===0?"":i.substring(0,s))+i.substring(u+1):s=u}}return i===""?null:i}function Te(e,r=!1){var a=r?" !important;":";",i="";for(var f of Object.keys(e)){var n=e[f];n!=null&&n!==""&&(i+=" "+f+": "+n+a)}return i}function x(e){return e[0]!=="-"||e[1]!=="-"?e.toLowerCase():e}function na(e,r){if(r){var a="",i,f;if(Array.isArray(r)?(i=r[0],f=r[1]):i=r,e){e=String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var n=!1,s=0,u=!1,o=[];i&&o.push(...Object.keys(i).map(x)),f&&o.push(...Object.keys(f).map(x));var d=0,l=-1;const N=e.length;for(var g=0;g<N;g++){var c=e[g];if(u?c==="/"&&e[g-1]==="*"&&(u=!1):n?n===c&&(n=!1):c==="/"&&e[g+1]==="*"?u=!0:c==='"'||c==="'"?n=c:c==="("?s++:c===")"&&s--,!u&&n===!1&&s===0){if(c===":"&&l===-1)l=g;else if(c===";"||g===N-1){if(l!==-1){var p=x(e.substring(d,l).trim());if(!o.includes(p)){c!==";"&&g++;var _=e.substring(d,g).trim();a+=" "+_+";"}}d=g+1,l=-1}}}}return i&&(a+=Te(i)),f&&(a+=Te(f,!0)),a=a.trim(),a===""?null:a}return e==null?null:String(e)}function sa(e,r,a,i,f,n){var s=e[he];if(E||s!==a||s===void 0){var u=fa(a,i,n);(!E||u!==e.getAttribute("class"))&&(u==null?e.removeAttribute("class"):r?e.className=u:e.setAttribute("class",u)),e[he]=a}else if(n&&f!==n)for(var o in n){var d=!!n[o];(f==null||d!==!!f[o])&&e.classList.toggle(o,d)}return n}function ee(e,r={},a,i){for(var f in a){var n=a[f];r[f]!==n&&(a[f]==null?e.style.removeProperty(f):e.style.setProperty(f,n,i))}}function ta(e,r,a,i){var f=e[ge];if(E||f!==r){var n=na(r,i);(!E||n!==e.getAttribute("style"))&&(n==null?e.removeAttribute("style"):e.style.cssText=n),e[ge]=r}else i&&(Array.isArray(i)?(ee(e,a==null?void 0:a[0],i[0]),ee(e,a==null?void 0:a[1],i[1],"important")):ee(e,a,i));return i}function ie(e,r,a=!1){if(e.multiple){if(r==null)return;if(!Re(r))return hr();for(var i of e.options)i.selected=r.includes(Se(i));return}for(i of e.options){var f=Se(i);if(gr(f,r)){i.selected=!0;return}}(!a||r!==void 0)&&(e.selectedIndex=-1)}function ua(e){var r=new MutationObserver(()=>{"__value"in e&&ie(e,e.__value)});r.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),ze(()=>{r.disconnect()})}function Se(e){return"__value"in e?e.__value:e.value}const V=Symbol("class"),W=Symbol("style"),Ge=Symbol("is custom element"),Ue=Symbol("is html"),oa=q?"link":"LINK",Ne=q?"input":"INPUT",la=q?"option":"OPTION",ca=q?"select":"SELECT",da=q?"progress":"PROGRESS";function va(e){if(E){var r=!1,a=()=>{if(!r){if(r=!0,e.hasAttribute("value")){var i=e.value;j(e,"value",null),e.value=i}if(e.hasAttribute("checked")){var f=e.checked;j(e,"checked",null),e.checked=f}}};e[Cr]=a,De(a),wr()}}function wa(e,r){var a=Q(e);a.value===(a.value=r??void 0)||e.value===r&&(r!==0||e.nodeName!==da)||(e.value=r??"")}function Ia(e,r){var a=Q(e);a.checked!==(a.checked=r??void 0)&&(e.checked=r)}function ha(e,r){r?e.hasAttribute("selected")||e.setAttribute("selected",""):e.removeAttribute("selected")}function j(e,r,a,i){var f=Q(e);E&&(f[r]=e.getAttribute(r),r==="src"||r==="srcset"||r==="href"&&e.nodeName===oa)||f[r]!==(f[r]=a)&&(r==="loading"&&(e[Ir]=a),a==null?e.removeAttribute(r):typeof a!="string"&&Ve(e).includes(r)?e[r]=a:e.setAttribute(r,a))}function ga(e,r,a,i,f=!1,n=!1){if(E&&f&&e.nodeName===Ne){var s=e,u=s.type==="checkbox"?"defaultChecked":"defaultValue";u in a||va(s)}var o=Q(e),d=o[Ge],l=!o[Ue];let g=E&&d;g&&F(!1);var c=r||{},p=e.nodeName===la;for(var _ in r)_ in a||(a[_]=null);a.class?a.class=ia(a.class):a[V]&&(a.class=null),a[W]&&(a.style??(a.style=null));var N=Ve(e);if(e.nodeName===Ne&&"type"in a&&("value"in a||"__value"in a)){var t=a.type;(t!==c.type||t===void 0&&e.hasAttribute("type"))&&(c.type=t,j(e,"type",t))}for(const v in a){let b=a[v];if(p&&v==="value"&&b==null){e.value=e.__value="",c[v]=b;continue}if(v==="class"){var h=e.namespaceURI==="http://www.w3.org/1999/xhtml";sa(e,h,b,i,r==null?void 0:r[V],a[V]),c[v]=b,c[V]=a[V];continue}if(v==="style"){ta(e,b,r==null?void 0:r[W],a[W]),c[v]=b,c[W]=a[W];continue}var I=c[v];if(!(b===I&&!(b===void 0&&e.hasAttribute(v)))){c[v]=b;var A=v[0]+v[1];if(A!=="$$")if(A==="on"){const T={},O="$$"+v;let S=v.slice(2);var w=qr(S);if(Vr(S)&&(S=S.slice(0,-7),T.capture=!0),!w&&I){if(b!=null)continue;e.removeEventListener(S,c[O],T),c[O]=null}if(w)Wr(S,e,b),Yr([S]);else if(b!=null){let k=function(y){c[v].call(this,y)};c[O]=jr(S,e,k,T)}}else if(v==="style")j(e,v,b);else if(v==="autofocus")Sr(e,!!b);else if(!d&&(v==="__value"||v==="value"&&b!=null))e.value=e.__value=b;else if(v==="selected"&&p)ha(e,b);else{var C=v;l||(C=$r(C));var L=C==="defaultValue"||C==="defaultChecked";if(b==null&&!d&&!L)if(o[v]=null,C==="value"||C==="checked"){let T=e;const O=r===void 0;if(C==="value"){let S=T.defaultValue;T.removeAttribute(C),T.defaultValue=S,T.value=T.__value=O?S:null}else{let S=T.defaultChecked;T.removeAttribute(C),T.defaultChecked=S,T.checked=O?S:!1}}else e.removeAttribute(v);else L||N.includes(C)&&(d||typeof b!="string")?(e[C]=b,C in o&&(o[C]=Nr)):typeof b!="function"&&j(e,C,b)}}}return g&&F(!0),c}function Ce(e,r,a=[],i=[],f=[],n,s=!1,u=!1){_r(f,a,i,o=>{var d=void 0,l={},g=e.nodeName===ca,c=!1;if(Fe(()=>{var _=r(...o.map(P)),N=ga(e,d,_,n,s,u);c&&g&&"value"in _&&ie(e,_.value);for(let h of Object.getOwnPropertySymbols(l))_[h]||J(l[h]);for(let h of Object.getOwnPropertySymbols(_)){var t=_[h];h.description===Er&&(!d||t!==d[h])&&(l[h]&&J(l[h]),l[h]=$(()=>ra(e,()=>t))),N[h]=t}d=N}),g){var p=e;ye(()=>{ie(p,d.value,!0),ua(p)})}c=!0})}function Q(e){var r;return e[r=br]??(e[r]={[Ge]:e.nodeName.includes("-"),[Ue]:e.namespaceURI===pr})}var we=new Map;function Ve(e){var r=e.getAttribute("is")||e.nodeName,a=we.get(r);if(a)return a;we.set(r,a=[]);for(var i,f=e,n=Element.prototype;n!==f;){i=Tr(f);for(var s in i)i[s].set&&s!=="innerHTML"&&s!=="textContent"&&s!=="innerText"&&a.push(s);f=Ar(f)}return a}function _a(e=!1){const r=kr,a=r.l.u;if(!a)return;let i=()=>D(r.s);if(e){let f=0,n={};const s=Mr(()=>{let u=!1;const o=r.s;for(const d in o)o[d]!==n[d]&&(n[d]=o[d],u=!0);return u&&f++,f});i=()=>P(s)}a.b.length&&Or(()=>{Ie(r,i),be(a.b)}),_e(()=>{const f=re(()=>a.m.map(Lr));return()=>{for(const n of f)typeof n=="function"&&n()}}),a.a.length&&_e(()=>{Ie(r,i),be(a.a)})}function Ie(e,r){if(e.l.s)for(const a of e.l.s)P(a);r()}Rr();/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 * 
 * Copyright (c) 2026 Lucide Icons and Contributors
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The following Lucide icons are derived from the Feather project:
 * 
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 * 
 * The MIT License (MIT) (for the icons listed above)
 * 
 * Copyright (c) 2013-present Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const ba={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 * 
 * Copyright (c) 2026 Lucide Icons and Contributors
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The following Lucide icons are derived from the Feather project:
 * 
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 * 
 * The MIT License (MIT) (for the icons listed above)
 * 
 * Copyright (c) 2013-present Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const pa=e=>{for(const r in e)if(r.startsWith("aria-")||r==="role"||r==="title")return!0;return!1};/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 * 
 * Copyright (c) 2026 Lucide Icons and Contributors
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The following Lucide icons are derived from the Feather project:
 * 
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 * 
 * The MIT License (MIT) (for the icons listed above)
 * 
 * Copyright (c) 2013-present Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const ke=(...e)=>e.filter((r,a,i)=>!!r&&r.trim()!==""&&i.indexOf(r)===a).join(" ").trim();var Aa=Ye("<svg><!><!></svg>");function ka(e,r){const a=pe(r,["children","$$slots","$$events","$$legacy"]),i=pe(a,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);Hr(r,!1);let f=B(r,"name",8,void 0),n=B(r,"color",8,"currentColor"),s=B(r,"size",8,24),u=B(r,"strokeWidth",8,2),o=B(r,"absoluteStrokeWidth",8,!1),d=B(r,"iconNode",24,()=>[]);_a();var l=Aa();Ce(l,(p,_,N)=>({...ba,...p,...i,width:s(),height:s(),stroke:n(),"stroke-width":_,class:N}),[()=>pa(i)?void 0:{"aria-hidden":"true"},()=>(D(o()),D(u()),D(s()),re(()=>o()?Number(u())*24/Number(s()):u())),()=>(D(ke),D(f()),D(a),re(()=>ke("lucide-icon","lucide",f()?`lucide-${f()}`:"",a.class)))]);var g=Dr(l);Jr(g,1,d,Xr,(p,_)=>{var N=Br(()=>Gr(P(_),2));let t=()=>P(N)[0],h=()=>P(N)[1];var I=je(),A=zr(I);ea(A,t,!0,(w,C)=>{Ce(w,()=>({...h()}))}),le(p,I)});var c=Fr(g);xr(c,r,"default",{}),yr(l),le(e,l),Pr()}export{ka as I,sa as a,j as b,ia as c,aa as d,Jr as e,_a as f,wa as g,Ia as h,Xr as i,va as r,xr as s};
