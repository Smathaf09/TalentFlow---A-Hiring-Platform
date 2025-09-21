

export const addLatencyAndError = async(ctx,errorRate=0)=>{
    const latency=200+Math.random()*1000;
    await ctx.delay(latency);

    if(Math.random()<errorRate){
        return ctx.status(500,'Internal server error');
    }
}