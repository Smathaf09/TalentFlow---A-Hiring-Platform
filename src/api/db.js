import Dexie from "dexie";

export const db=new Dexie('TalentFlowDB');
db.version(1).stores({
    jobs: '++id,title,status,tags,archived,order',
    candidates:'++id,name,email,stage,appliedDate,notes',
    assessments:'++id ,jobId,title,sections,questions',
    candidateAssessments :'++id,candidateId,assessmentId,responses,completed',
    notes:'++id,entityType,entityId,content,timestamp'
});