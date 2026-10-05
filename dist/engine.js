(function(root){
  'use strict';
  const clamp=n=>Math.max(0,Math.min(100,n));
  class CareGame {
    constructor(story){this.story=story;this.reset();}
    reset(){this.state={phase:'start',index:0,repairId:null,afterRepair:null,safety:50,people:{doctor:{trust:45,stress:55},caregiver:{trust:40,stress:70},mentor:{trust:50,stress:20}},expressions:{doctor:null,caregiver:null,mentor:null},history:[],unresolved:[],timeouts:0,remaining:25,budget:25,pace:25,feedback:null,caseResult:null,knowledge:{correct:0,answered:0,total:this.story.nodes.filter(n=>n.academic).length,topics:{}}};return this.state;}
    start(pace=25){if(![15,25,45].includes(Number(pace)))throw new Error('Invalid pace');this.reset();this.state.pace=Number(pace);this.state.phase='choice';this.enterNode();return this.state;}
    node(){const s=this.state;return s.repairId?{...this.story.repairs[s.repairId],scene:this.story.nodes[s.index].scene}:this.story.nodes[s.index];}
    enterNode(){const s=this.state,n=this.node();if(n?.stage==='debrief'&&!s.caseResult)s.caseResult=this.caseOutcome();s.budget=Math.round(s.pace*(n?.timeMultiplier||1));s.remaining=s.budget;}
    choose(index){const s=this.state;if(s.phase!=='choice')throw new Error('No active choice');const node=this.node();if(!Number.isInteger(index)||index<0||index>=node.options.length)throw new Error('Invalid option');return this.apply(node,node.options[index],index,false);}
    apply(node,option,index,timeout){
      const s=this.state,npc=s.people[node.npc],impact={safety:0,trust:0,stress:0,...option.impact};
      // Preceptor answers cannot alter the completed patient-care result.
      if(node.npc==='mentor')impact.safety=0;
      s.safety=clamp(s.safety+impact.safety);npc.trust=clamp(npc.trust+impact.trust);npc.stress=clamp(npc.stress+impact.stress);
      if(option.flag&&!s.unresolved.includes(option.flag))s.unresolved.push(option.flag);
      for(const id of option.resolves||[])s.unresolved=s.unresolved.filter(x=>x!==id);
      if(node.academic){const k=s.knowledge,correct=option.correctness===2&&!timeout;k.answered++;k.correct+=Number(correct);const topic=k.topics[node.topic]||(k.topics[node.topic]={correct:0,answered:0});topic.answered++;topic.correct+=Number(correct);}
      const emotion=timeout?'concern':option.correctness===2&&impact.trust>=0?'smile':option.correctness===1||node.npc==='mentor'?'surprise':'concern';s.expressions[node.npc]=emotion;
      s.history.push({id:node.id,scene:node.scene,npc:node.npc,index,timeout,academic:!!node.academic,topic:node.topic||null,correctness:option.correctness||0,impact:{...impact},seconds:s.remaining,budget:s.budget,elapsedSeconds:Math.round((s.budget-s.remaining)*1000)/1000,answeredAt:new Date().toISOString(),emotion,safetyAfter:s.safety,trustAfter:npc.trust,stressAfter:npc.stress,prompt:node.text,correctAnswer:node.options.find(o=>o.correctness===2)?.text,choice:option.text,reaction:option.reaction,explanation:option.explanation||null,lesson:node.lesson,sources:node.sources||[]});
      s.feedback={node,option,impact,timeout};s.phase='feedback';s.pendingRepair=option.repair||null;return s;
    }
    tick(seconds){const s=this.state;if(s.phase!=='choice')return s;if(!Number.isFinite(seconds)||seconds<0)throw new Error('Invalid elapsed time');s.remaining=Math.max(0,s.remaining-seconds);if(s.remaining===0){s.timeouts++;const n=this.node(),timeout=n.academic?this.story.academicTimeout:this.story.timeout;this.apply(n,{...timeout,...(n.timeoutFlag?{flag:n.timeoutFlag}:{})},-1,true);}return s;}
    next(){const s=this.state;if(s.phase!=='feedback')throw new Error('Feedback must be completed first');if(s.pendingRepair){s.afterRepair=s.index+1;s.repairId=s.pendingRepair;}else if(s.repairId){s.index=s.afterRepair;s.repairId=null;s.afterRepair=null;}else{s.index++;}s.feedback=null;s.pendingRepair=null;s.phase=s.index>=this.story.nodes.length?'ending':'choice';this.enterNode();return s;}
    caseOutcome(){const s=this.state,trust=Math.round((s.people.doctor.trust+s.people.caregiver.trust)/2),safe=s.safety>=72&&s.unresolved.length===0;return{id:!safe?'review':trust>=70?'harmony':trust>=48?'safe':'connection',safety:s.safety,trust,timeouts:s.history.filter(h=>h.npc!=='mentor'&&h.timeout).length,unresolved:[...s.unresolved],decisions:s.history.filter(h=>h.npc!=='mentor').length};}
    outcome(){const s=this.state,c=s.caseResult||this.caseOutcome(),k=s.knowledge;return{...c,decisions:s.history.length,timeouts:s.timeouts,clinicalTimeouts:c.timeouts,mentorTrust:s.people.mentor.trust,knowledge:{correct:k.correct,answered:k.answered,total:k.total,percent:k.total?Math.round(100*k.correct/k.total):0,topics:JSON.parse(JSON.stringify(k.topics))}};}
  }
  root.CareGame=CareGame;if(typeof module!=='undefined'&&module.exports)module.exports={CareGame};
})(typeof window!=='undefined'?window:globalThis);
