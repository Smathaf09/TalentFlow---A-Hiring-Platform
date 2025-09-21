import {rest} from 'msw';
import {db} from '../db';
import { addLatencyAndError } from '../../utils';

export const candidateHandlers=[
    rest.get('/api/candidates',async(req,res,ctx)=>{
        await addLatencyAndError(ctx);
        const search=req.url.searchParams.get('search')?.toLowerCase() || '';
        const stage=req.url.searchParams.get('stage') || '';

        let candidates=await db.candidates.toArray();
        candidates=candidates.filter(candidate =>
        (candidate.name.toLowerCase().includes(search) || candidate.email.toLowerCase().includes('search')) &&
        (stage ? candidate.stage===stage :true)
        );
        return res(ctx.json(candidates));
    }),

    rest.patch('/api/candidates/:id',async(req,res,ctx)=>{
        await addLatencyAndError(ctx,0.1);
        const candidateId=req.params.id;
        const updates=await req.json();
        await db.candidates.update(candidateId,updates);
        return res(ctx.status(200));
    }),

    rest.get('/api/candidates/:id/timeline', async(req,res,ctx)=>{
        await addLatencyAndError(ctx);

        const timeline=[
            {type:'status_change',stage:'applied',date:'2025-01-01'},
            {type:'note',content:'Initial review looks promising',date: '2025-01-03'},
            {type:'status_change',stage:'screen',date:'2025-01-05'},
        ];
        return res(ctx.json(timeline));
    })
]