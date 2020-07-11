const DispatchScheduleJobService = require("../services/dispatchScheduleJobService")

class DispatchScheduleJobController {
    constructor(){
        this.service = new DispatchScheduleJobService();
    }

    dispatch(request){
        console.log("Start Dispatch Controller");

        const url = new URL(request.url);

        let workflow = url.searchParams.get("workflow");

        console.log("Workflow name received: " + workflow)
        
        let job = url.searchParams.get("job");
        
        console.log("Job id received: " + job)
        
        this.service.dispatch(workflow, job);

        console.log("End Dispatch Controller");
    }
}

module.exports = DispatchScheduleJobController