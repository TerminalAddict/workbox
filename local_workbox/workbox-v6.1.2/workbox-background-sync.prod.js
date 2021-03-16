this.workbox=this.workbox||{},this.workbox.backgroundSync=function(t,e,s,i,n){"use strict";try{self["workbox:background-sync:6.1.2"]&&_()}catch(t){}const a="requests",r="queueName";class c{constructor(t){this.t=t,this.i=new n.DBWrapper("workbox-background-sync",3,{onupgradeneeded:this.h})}async pushEntry(t){delete t.id,t.queueName=this.t,await this.i.add(a,t)}async unshiftEntry(t){const[e]=await this.i.getAllMatching(a,{count:1});e?t.id=e.id-1:delete t.id,t.queueName=this.t,await this.i.add(a,t)}async popEntry(){return this.o({direction:"prev"})}async shiftEntry(){return this.o({direction:"next"})}async getAll(){return await this.i.getAllMatching(a,{index:r,query:IDBKeyRange.only(this.t)})}async deleteEntry(t){await this.i.delete(a,t)}async o({direction:t}){const[e]=await this.i.getAllMatching(a,{direction:t,index:r,query:IDBKeyRange.only(this.t),count:1});if(e)return await this.deleteEntry(e.id),e}h(t){const e=t.target.result;t.oldVersion>0&&t.oldVersion<3&&e.objectStoreNames.contains(a)&&e.deleteObjectStore(a);e.createObjectStore(a,{autoIncrement:!0,keyPath:"id"}).createIndex(r,r,{unique:!1})}}const h=["method","referrer","referrerPolicy","mode","credentials","cache","redirect","integrity","keepalive"];class o{constructor(t){"navigate"===t.mode&&(t.mode="same-origin"),this.u=t}static async fromRequest(t){const e={url:t.url,headers:{}};"GET"!==t.method&&(e.body=await t.clone().arrayBuffer());for(const[s,i]of t.headers.entries())e.headers[s]=i;for(const s of h)void 0!==t[s]&&(e[s]=t[s]);return new o(e)}toObject(){const t=Object.assign({},this.u);return t.headers=Object.assign({},this.u.headers),t.body&&(t.body=t.body.slice(0)),t}toRequest(){return new Request(this.u.url,this.u)}clone(){return new o(this.toObject())}}const u="workbox-background-sync",y=new Set,w=t=>{const e={request:new o(t.requestData).toRequest(),timestamp:t.timestamp};return t.metadata&&(e.metadata=t.metadata),e};class f{constructor(t,{onSync:s,maxRetentionTime:i}={}){if(this.l=!1,this.q=!1,y.has(t))throw new e.WorkboxError("duplicate-queue-name",{name:t});y.add(t),this.m=t,this.p=s||this.replayRequests,this.g=i||10080,this.R=new c(this.m),this.k()}get name(){return this.m}async pushRequest(t){await this.D(t,"push")}async unshiftRequest(t){await this.D(t,"unshift")}async popRequest(){return this._("pop")}async shiftRequest(){return this._("shift")}async getAll(){const t=await this.R.getAll(),e=Date.now(),s=[];for(const i of t){const t=60*this.g*1e3;e-i.timestamp>t?await this.R.deleteEntry(i.id):s.push(w(i))}return s}async D({request:t,metadata:e,timestamp:s=Date.now()},i){const n={requestData:(await o.fromRequest(t.clone())).toObject(),timestamp:s};e&&(n.metadata=e),await this.R[i+"Entry"](n),this.l?this.q=!0:await this.registerSync()}async _(t){const e=Date.now(),s=await this.R[t+"Entry"]();if(s){const i=60*this.g*1e3;return e-s.timestamp>i?this._(t):w(s)}}async replayRequests(){let t;for(;t=await this.shiftRequest();)try{await fetch(t.request.clone())}catch(s){throw await this.unshiftRequest(t),new e.WorkboxError("queue-replay-failed",{name:this.m})}}async registerSync(){if("sync"in self.registration)try{await self.registration.sync.register(`${u}:${this.m}`)}catch(t){}}k(){"sync"in self.registration?self.addEventListener("sync",(t=>{if(t.tag===`${u}:${this.m}`){const e=async()=>{let e;this.l=!0;try{await this.p({queue:this})}catch(t){throw e=t,e}finally{!this.q||e&&!t.lastChance||await this.registerSync(),this.l=!1,this.q=!1}};t.waitUntil(e())}})):this.p({queue:this})}static get v(){return y}}return t.BackgroundSyncPlugin=class{constructor(t,e){this.fetchDidFail=async({request:t})=>{await this.S.pushRequest({request:t})},this.S=new f(t,e)}},t.Queue=f,t}({},workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private);
//# sourceMappingURL=workbox-background-sync.prod.js.map
