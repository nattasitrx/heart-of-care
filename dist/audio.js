(()=>{
'use strict';
// Original, gently looping music synthesized locally; no external audio downloads.
class CareAudio{
 constructor(){this.context=null;this.music=true;this.effects=true;this.hidden=false;this.timer=null;this.step=0;this.voices=new Set();this.unlocked=false;}
 unlock(){
  if(!this.context){const C=window.AudioContext||window.webkitAudioContext;if(!C)return;try{this.context=new C();this.musicBus=this.context.createGain();this.effectsBus=this.context.createGain();this.musicBus.connect(this.context.destination);this.effectsBus.connect(this.context.destination);}catch{return;}}
  this.unlocked=true;this.context.resume().then(()=>this.sync()).catch(()=>{});
 }
 configure(music,effects){this.music=music;this.effects=effects;this.sync();}
 tone(frequency,at,duration,volume,bus,type='sine'){
  const c=this.context,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=frequency;
  g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(volume,at+.025);g.gain.exponentialRampToValueAtTime(.0001,at+duration);
  o.connect(g);g.connect(bus);this.voices.add(o);o.onended=()=>{this.voices.delete(o);o.disconnect();g.disconnect();};o.start(at);o.stop(at+duration+.03);
 }
 sync(){
  if(!this.context)return;const c=this.context,active=this.unlocked&&!this.hidden&&c.state==='running';
  this.musicBus.gain.setTargetAtTime(this.music && active ? .7 : 0,c.currentTime,.06);
  this.effectsBus.gain.setTargetAtTime(this.effects && active ? .8 : 0,c.currentTime,.025);
  if(this.music&&active&&!this.timer){this.bar();this.timer=setInterval(()=>this.bar(),2400);}
  if((!this.music||!active)&&this.timer){clearInterval(this.timer);this.timer=null;}
 }
 bar(){
  if(!this.music||this.hidden||this.context.state!=='running')return;
  const chords=[[261.63,329.63,392],[220,261.63,329.63],[174.61,220,261.63],[196,246.94,293.66]],chord=chords[this.step++%4],t=this.context.currentTime;
  this.tone(chord[0]/2,t,2.2,.035,this.musicBus);
  for(let i=0;i<6;i++)this.tone(chord[[0,1,2,1,2,1][i]]*(i===4?2:1),t+i*.4,1.05,.045,this.musicBus,'triangle');
 }
 answer(correctness,timeout){
  if(!this.context||!this.effects||this.hidden||this.context.state!=='running')return;
  const good=correctness===2&&!timeout,notes=good?[523.25,659.25,783.99]:[392,329.63],t=this.context.currentTime;
  notes.forEach((hz,i)=>this.tone(hz,t+i*.14,.5,good ? .1 : .075,this.effectsBus));
 }
 visibility(hidden){this.hidden=hidden;this.sync();if(this.context){if(hidden)this.context.suspend().catch(()=>{});else if(this.unlocked)this.context.resume().then(()=>this.sync()).catch(()=>{});}}
}
window.CareAudio=CareAudio;
})();
