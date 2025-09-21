import {rest} from 'msw';
import {db} from '../db';
import { addLatencyAndError} from '../../utils';

export const jobHandlers=[
    rest.get('/api/jobs', async(req,res,ctx)=>{
        await addLatencyAndError(ctx);
        const search=req.url.searchParams.get('search')?.toLowerCase() || '';
        const status=req.url.searchParams.get('status')||'';

        let jobs=await db.jobs.toArray();
        jobs=jobs.filter(job =>(job.title.toLowerCase().includes(search) || job.tags.some(tag =>tag.toLowerCase().includes(search))) &&
          (status ? job.status == status:true)
        );
        
        return res(ctx.json(jobs.sort((a,b)=>a.order-b.order)));
    }),

    rest.post('/api/jobs',async(req,res,ctx)=>{
        await addLatencyAndError(ctx,0.1);
        const newJob=await req.json();
        const id=await db.jobs.add({...newJob,status:'Active'});
        return res(ctx.status(201),ctx.json({id,...newJob}));
    }),

    rest.patch('/api/jobs/:id/reorder',async(req,res,ctx)=>{
        if(Math.random()<0.1)return res(ctx.status(500));

        await addLatencyAndError(ctx);
        const {id}=req.params;
        const {fromOrder,toOrder}=await req.json();
        const jobs=await db.jobs.toArray();
        const draggedJob=jobs.find(job=>job.id==id);

        if(draggedJob){
           await db.transaction('rw',db.jobs,async()=>{
            const affectedJobs = jobs.filter(job=>{
                if(fromOrder < toOrder)
                    return job.order>fromOrder && job.order<=toOrder;
                else 
                    return job.order<fromOrder && job.order>=toOrder;
            });

            await Promise.all(
                affectedJobs.map(job=>db.jobs.update(job.id,{order : job.order+(fromOrder<toOrder?-1:1)}))
            );
            await db.jobs.update(id,{order:toOrder});
           })
        }
        
        return res(ctx.status(200));
    }),
];