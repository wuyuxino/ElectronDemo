/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.121
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import{a as _}from"./chunk-3DTG5I3B.js";import{a as te}from"./chunk-IM5PR43O.js";import{a as fe,b as j,f as Z,g as me}from"./chunk-ENJVJZOJ.js";import{a as e,b as ie,c as ee,e as O}from"./chunk-JVYZBXN3.js";import{a as Q}from"./chunk-IK336IZH.js";import{a as se}from"./chunk-4CQNOSGA.js";import{a as le}from"./chunk-KWWV4RVU.js";import{e as $}from"./chunk-UJJHFDLS.js";var Se={ROUNDED:0,MITERED:1,BEVELED:2},G=Object.freeze(Se);var ue={};function P(r,n){if(!$(r))throw new le("identifier is required.");$(ue[r])||(ue[r]=!0,console.warn(se(n,r)))}P.geometryOutlines="Entity geometry outlines are unsupported on terrain. Outlines will be disabled. To enable outlines, disable geometry terrain clamping by explicitly setting height to 0.";P.geometryZIndex="Entity geometry with zIndex are unsupported when height or extrudedHeight are defined.  zIndex will be ignored";P.geometryHeightReference="Entity corridor, ellipse, polygon or rectangle with heightReference must also have a defined height.  heightReference will be ignored";P.geometryExtrudedHeightReference="Entity corridor, ellipse, polygon or rectangle with extrudedHeightReference must also have a defined extrudedHeight.  extrudedHeightReference will be ignored";var he=P;var w=[new e,new e],Te=new e,Be=new e,Ce=new e,ze=new e,Ae=new e,be=new e,Oe=new e,ve=new e,De=new e,I=new e,W=new e,R={},re=new ie;function je(r,n){let a=new Array(r.length);for(let o=0;o<r.length;o++){let t=r[o];re=n.cartesianToCartographic(t,re),a[o]=re.height,r[o]=n.scaleToGeodeticSurface(t,t)}return a}function ne(r,n,a,o){let t=r[0],c=r[1],f=e.angleBetween(t,c),l=Math.ceil(f/o),m=new Array(l),s;if(n===a){for(s=0;s<l;s++)m[s]=n;return m.push(a),m}let d=(a-n)/l;for(s=1;s<l;s++){let x=n+s*d;m[s]=x}return m[0]=n,m.push(a),m}var X=new e,Y=new e;function He(r,n,a,o){let t=new te(a,o),c=t.projectPointOntoPlane(e.add(a,r,X),X),f=t.projectPointOntoPlane(e.add(a,n,Y),Y),l=ee.angleBetween(c,f);return f.x*c.y-f.y*c.x>=0?-l:l}var Me=new e(-1,0,0),H=new j,Ve=new j,oe=new O,Ne=O.IDENTITY.clone(),Fe=new e,Ge=new fe,de=new e;function v(r,n,a,o,t,c,f,l){let m=Fe,s=Ge;H=me.eastNorthUpToFixedFrame(r,t,H),m=j.multiplyByPointAsVector(H,Me,m),m=e.normalize(m,m);let S=He(m,n,r,t);oe=O.fromRotationZ(S,oe),de.z=c,H=j.multiplyTransformation(H,j.fromRotationTranslation(oe,de,Ve),H);let d=Ne;d[0]=f;for(let x=0;x<l;x++)for(let i=0;i<a.length;i+=3)s=e.fromArray(a,i,s),s=O.multiplyByVector(d,s,s),s=j.multiplyByPoint(H,s,s),o.push(s.x,s.y,s.z);return o}var Ie=new e;function ce(r,n,a,o,t,c,f){for(let l=0;l<r.length;l+=3){let m=e.fromArray(r,l,Ie);o=v(m,n,a,o,t,c[l/3],f,1)}return o}function Le(r,n){let a=r.length,o=new Array(a*6),t=0,c=n.x+n.width/2,f=n.y+n.height/2,l=r[0];o[t++]=l.x-c,o[t++]=0,o[t++]=l.y-f;for(let m=1;m<a;m++){l=r[m];let s=l.x-c,S=l.y-f;o[t++]=s,o[t++]=0,o[t++]=S,o[t++]=s,o[t++]=0,o[t++]=S}return l=r[0],o[t++]=l.x-c,o[t++]=0,o[t++]=l.y-f,o}function ge(r,n){let a=r.length,o=new Array(a*3),t=0,c=n.x+n.width/2,f=n.y+n.height/2;for(let l=0;l<a;l++)o[t++]=r[l].x-c,o[t++]=0,o[t++]=r[l].y-f;return o}var ye=new Z,we=new e,pe=new O;function xe(r,n,a,o,t,c,f,l,m,s){let S=e.angleBetween(e.subtract(n,r,I),e.subtract(a,r,W)),d=o===G.BEVELED?0:Math.ceil(S/Q.toRadians(5)),x;t?x=O.fromQuaternion(Z.fromAxisAngle(e.negate(r,I),S/(d+1),ye),pe):x=O.fromQuaternion(Z.fromAxisAngle(r,S/(d+1),ye),pe);let i,g;if(n=e.clone(n,we),d>0){let D=s?2:1;for(let y=0;y<d;y++)n=O.multiplyByVector(x,n,n),i=e.subtract(n,r,I),i=e.normalize(i,i),t||(i=e.negate(i,i)),g=c.scaleToGeodeticSurface(n,W),f=v(g,i,l,f,c,m,1,D)}else i=e.subtract(n,r,I),i=e.normalize(i,i),t||(i=e.negate(i,i)),g=c.scaleToGeodeticSurface(n,W),f=v(g,i,l,f,c,m,1,1),a=e.clone(a,we),i=e.subtract(a,r,I),i=e.normalize(i,i),t||(i=e.negate(i,i)),g=c.scaleToGeodeticSurface(a,W),f=v(g,i,l,f,c,m,1,1);return f}R.removeDuplicatesFromShape=function(r){let n=r.length,a=[];for(let o=n-1,t=0;t<n;o=t++){let c=r[o],f=r[t];ee.equals(c,f)||a.push(f)}return a};R.angleIsGreaterThanPi=function(r,n,a,o){let t=new te(a,o),c=t.projectPointOntoPlane(e.add(a,r,X),X),f=t.projectPointOntoPlane(e.add(a,n,Y),Y);return f.x*c.y-f.y*c.x>=0};var qe=new e,Pe=new e;R.computePositions=function(r,n,a,o,t){let c=o._ellipsoid,f=je(r,c),l=o._granularity,m=o._cornerType,s=t?Le(n,a):ge(n,a),S=t?ge(n,a):void 0,d=a.height/2,x=a.width/2,i=r.length,g=[],D=t?[]:void 0,y=Te,b=Be,h=Ce,E=ze,B=Ae,C=be,z=Oe,u=ve,T=De,p=r[0],M=r[1];E=c.geodeticSurfaceNormal(p,E),y=e.subtract(M,p,y),y=e.normalize(y,y),u=e.cross(E,y,u),u=e.normalize(u,u);let V=f[0],A=f[1];t&&(D=v(p,u,S,D,c,V+d,1,1)),T=e.clone(p,T),p=M,b=e.negate(y,b);let N,F;for(let U=1;U<i-1;U++){let ae=t?2:1;if(M=r[U+1],p.equals(M)){he("Positions are too close and are considered equivalent with rounding error.");continue}y=e.subtract(M,p,y),y=e.normalize(y,y),h=e.add(y,b,h),h=e.normalize(h,h),E=c.geodeticSurfaceNormal(p,E);let L=e.multiplyByScalar(E,e.dot(y,E),qe);e.subtract(y,L,L),e.normalize(L,L);let q=e.multiplyByScalar(E,e.dot(b,E),Pe);if(e.subtract(b,q,q),e.normalize(q,q),!Q.equalsEpsilon(Math.abs(e.dot(L,q)),1,Q.EPSILON7)){h=e.cross(h,E,h),h=e.cross(E,h,h),h=e.normalize(h,h);let k=1/Math.max(.25,e.magnitude(e.cross(h,b,I))),K=R.angleIsGreaterThanPi(y,b,p,c);K?(B=e.add(p,e.multiplyByScalar(h,k*x,h),B),C=e.add(B,e.multiplyByScalar(u,x,C),C),w[0]=e.clone(T,w[0]),w[1]=e.clone(C,w[1]),N=ne(w,V+d,A+d,l),F=_.generateArc({positions:w,granularity:l,ellipsoid:c}),g=ce(F,u,s,g,c,N,1),u=e.cross(E,y,u),u=e.normalize(u,u),z=e.add(B,e.multiplyByScalar(u,x,z),z),m===G.ROUNDED||m===G.BEVELED?xe(B,C,z,m,K,c,g,s,A+d,t):(h=e.negate(h,h),g=v(p,h,s,g,c,A+d,k,ae)),T=e.clone(z,T)):(B=e.add(p,e.multiplyByScalar(h,k*x,h),B),C=e.add(B,e.multiplyByScalar(u,-x,C),C),w[0]=e.clone(T,w[0]),w[1]=e.clone(C,w[1]),N=ne(w,V+d,A+d,l),F=_.generateArc({positions:w,granularity:l,ellipsoid:c}),g=ce(F,u,s,g,c,N,1),u=e.cross(E,y,u),u=e.normalize(u,u),z=e.add(B,e.multiplyByScalar(u,-x,z),z),m===G.ROUNDED||m===G.BEVELED?xe(B,C,z,m,K,c,g,s,A+d,t):g=v(p,h,s,g,c,A+d,k,ae),T=e.clone(z,T)),b=e.negate(y,b)}else g=v(T,u,s,g,c,V+d,1,1),T=p;V=A,A=f[U+1],p=M}w[0]=e.clone(T,w[0]),w[1]=e.clone(p,w[1]),N=ne(w,V+d,A+d,l),F=_.generateArc({positions:w,granularity:l,ellipsoid:c}),g=ce(F,u,s,g,c,N,1),t&&(D=v(p,u,S,D,c,A+d,1,1)),i=g.length;let Ee=t?i+D.length:i,J=new Float64Array(Ee);return J.set(g),t&&J.set(D,i),J};var lt=R;export{G as a,he as b,lt as c};
