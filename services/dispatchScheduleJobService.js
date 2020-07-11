class DispatchScheduleJobService {

    async dispatch(workflow, job) {

        await fetch('https://api.github.com/repos/latinonetonline/LatinoNETOnline.ScheduleJob/dispatches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `Bearer ${GITHUB_TOKEN}`
            },
            body: JSON.stringify({
                "event_type": "dispatch-workflow-job",
                "client_payload": {
                    "workflowName": workflow,
                    "idJob": job
                }
            })
        });
    }
}

module.exports = DispatchScheduleJobService
