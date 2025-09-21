import {rest} from 'msw';
import {db} from "../db";
import { addLatencyAndError } from '../../utils';

export const assessmentHandlers=[
    rest.get('/api/assessments/:jobId',async(req,res,ctx)=>{
        await addLatencyAndError(ctx);
        const jobId=req.params.jobId;
        const assessment=await db.assessments.where({jobId}).first();
        return res(ctx.json(assessment));
    }),

    rest.put('/api/assessments/:jobId',async(req,res,ctx)=>{
        await addLatencyAndError(ctx);
        const jobId=req.params.jobId;
        const newAssessment=await req.json();

        await db.assessments.puts({...newAssessment,jobId});
        return res(ctx.status(200));
    })
];