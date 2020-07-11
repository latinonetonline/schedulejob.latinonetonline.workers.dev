const DispatchScheduleJobService = require("../services/dispatchScheduleJobService")

class DispatchScheduleJobController {
    constructor(){
        this.service = new DispatchScheduleJobService();
    }

    dispatch(request){
        console.log("Start Dispatch");

        const url = new URL(request.url);

        let workflow = url.searchParams.get("workflow");
        let job = url.searchParams.get("job");

        this.service.dispatch(workflow, job);
    }
}

module.exports = DispatchScheduleJobController