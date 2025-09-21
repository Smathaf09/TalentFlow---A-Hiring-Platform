import {db} from "./db";
import {faker} from '@faker-js/faker';

function createFakeJob(index){
    const jobTitles=['Software Engineer','Ethical Hacker','Data Scientist','UI/UX Designer','Marketing Specialist','Financial Analyst','Product Manager'];
    const tags=['React','Node.js','TypeScript','Linux','Bash','Networking','Python','SQL','AWS','Figma','Marketing'];
    const jobTagMap={
       'Software Engineer':['React','Node.js','TypeScript'],
       'Ethical Hacker':['Linux','Bash','Networking'],
       'Data Scientist':['Python','SQL','AWS'],
       'UI/UX Designer':['Figma'],
       'Marketing Specialist':['Marketing']
    }
    const status=index<20?"active":"archived";
    const selectTitle=faker.helpers.arrayElement(jobTitles);
    const relevantTags=jobTagMap[selectTitle];
    return{
      id:faker.string.uuid(),
      title:`${selectTitle}(${index+1})`,
      slug:faker.helpers.slugify(faker.lorem.words(2)),
      status:status,
      tags:faker.helpers.arrayElements(relevantTags,{min:1,max:3}),
      order:index
    };
}

function createFakeCandidate(jobId){
   const hiringStages=['applied','screen','tech','offer','hired','rejected'];
   return {
       id:faker.string.uuid(),
       name:faker.person.fullName(),
       email:faker.internet.email(),
       stage:faker.helpers.arrayElement(hiringStages),
       jobId:jobId,
       notes:faker.lorem.sentences({min:1,max:3})
   };
}

function createFakeAssessment(jobId){
    const questionTypes=['single-choice','multi-choice','short-text','long-text','numeroc-with-range','file-upload-stub'];
    const sections=['General','Technical Skills','Behavioral'];

    const questions=Array.from({length:10+Math.floor(Math.random()*5)},()=>{
        const type=faker.helpers.arrayElement(questionTypes);
        const questionText=faker.lorem.sentence({min:5,max:10});
        const options=(type==='single-choice' || type==='multi-choice')?Array.from({length:3+Math.floor(Math.random()*3)},()=>faker.lorem.word()):[];
        
        return {
            id:faker.string.uuid(),
            type,
            text:questionText,
            options,
            required:faker.datatype.boolean()
        };
    });
    return {
        id:faker.string.uuid(),
        jobId:jobId,
        title:`Assessment for ${faker.lorem.words(3)}`,
        sections:sections.map(title =>({
            id:faker.string.uuid(),
            title,
            questions:questions.splice(0,questions.length/sections.length)
        }))
    };
}

export async function seedData(){
    console.log("Starting Database seeding.....");

    const jobsCount=await db.jobs.count();
    if(jobsCount>0){
        console.log("Database already seeded ,Skipping.");
        return;
    }

    try{
     const jobs = Array.from({length:25},(_,i)=>createFakeJob(i));
     await db.jobs.bulkAdd(jobs);
     console.log('25 jobs created');

     const candidates=Array.from({length:1000},()=>{
        const randomJob = faker.helpers.arrayElement(jobs);
        return createFakeCandidate(randomJob.id);
     });
     await db.candidates.bulkAdd(candidates);
     console.log("1000 candidates created and assigned .");

     const assessments=Array.from({length:3+Math.floor(Math.random()*3)},()=>{
     const randomJob=faker.helpers.arrayElement(jobs);
     return createFakeAssessment(randomJob.id);
     });
     await db.assessments.bulkAdd(assessments);
     console.log(`${assessments.length} assessments created.`);
     
    }catch(e){
        console.error("failed to seed the database :",e);
    }
}