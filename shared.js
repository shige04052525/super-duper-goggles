(function(){
const cfg=window.GRANT_FIREBASE_CONFIG;
const banner=document.createElement('div');banner.style.cssText='position:fixed;bottom:0;left:0;right:0;background:#fff5d6;color:#594000;padding:10px 14px;text-align:center;z-index:9999;font:13px sans-serif;box-shadow:0 -2px 8px #0002';
const status=t=>{banner.textContent=t;if(!banner.isConnected)document.body.appendChild(banner)};
window.GRANT_SHARED={enabled:true,ready:false,push:()=>{}};
if(!cfg||cfg.apiKey.startsWith('PASTE')||cfg.projectId.startsWith('PASTE')){status('共有機能は未設定です。firebase-config.js を設定してください。');return}
if(!window.firebase){status('Firebase を読み込めません。ネット接続を確認してください。');return}
try{
firebase.initializeApp(cfg);const ref=firebase.firestore().collection('grant_home').doc('shared_v4');
let initialized=false,writeQueue=Promise.resolve(),localPending=false;
window.GRANT_SHARED.push=function(value){if(!initialized)return;const copy=JSON.parse(JSON.stringify(value));localPending=true;writeQueue=writeQueue.catch(()=>{}).then(()=>ref.set({payload:JSON.stringify(copy),updatedAt:firebase.firestore.FieldValue.serverTimestamp()})).then(()=>{localPending=false;status('共有中：保存しました')}).catch(e=>{localPending=false;status('共有保存エラー：'+e.message);alert('共有保存に失敗しました。バックアップを保存してください。')})};
ref.onSnapshot(snapshot=>{
if(localPending)return;
if(!snapshot.exists){initialized=true;window.GRANT_SHARED.ready=true;status('共有先は空です。必要なら設定画面からバックアップを読み込んでください。');return}
try{const incoming=JSON.parse(snapshot.data().payload);if(!Array.isArray(incoming.projects)||!Array.isArray(incoming.events))throw Error('形式が不正です');data=incoming;localStorage.setItem(STORE,JSON.stringify(data));initialized=true;window.GRANT_SHARED.ready=true;status('共有中：最新データを表示しています');render()}catch(e){status('共有データの読み込みエラー：'+e.message)}
},e=>status('接続エラー：'+e.message));
}catch(e){status('Firebase 設定エラー：'+e.message)}
})();
