addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

    const url = new URL(request.url);

    let workflow = url.searchParams.get("workflow");

    console.log("Workflow name received: " + workflow)

    let job = url.searchParams.get("job");

    console.log("Job id received: " + job)

    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'PostmanRuntime/7.26.1',
            'Authorization': 'Bearer ' + GITHUB_TOKEN
        },
        body: JSON.stringify({
            "event_type": "dispatch-workflow-job",
            "client_payload": {
                "workflowName": workflow,
                "idJob": job
            }
        })
    }
    console.log("Send Fetch");

    const fetchResponse = await fetch("https://api.github.com/repos/latinonetonline/LatinoNETOnline.ScheduleJob/dispatches", init)

    return new Response('{}', {
        status: fetchResponse.status == 204 ? 200 : 400,
        statusText: fetchResponse.statusText,
        headers: {
            'content-type': 'application/json',
        },
    })
}