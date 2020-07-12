class DispatchScheduleJobService {

    dispatch(workflow, job) {

        console.log("Start Dispatch Service");
        // let ghToken = process.env.GITHUB_TOKEN;

        if (GITHUB_TOKEN) {

            console.log("Send Fetch");

            fetch('https://api.github.com/repos/latinonetonline/LatinoNETOnline.ScheduleJob/dispatches', {
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
            }).then(res => {
                console.log("Receive Response");
                console.log("StatusCode: " + 204);

                if (res.status != 204) {
                    console.error("The GitHub api did not return 204. There was an error")
                }
            });

        }
        else {
            console.error("GITHUB_TOKEN haven't value")
        }

        console.log("Finish Dispatch Service");
    }
}

module.exports = DispatchScheduleJobService
