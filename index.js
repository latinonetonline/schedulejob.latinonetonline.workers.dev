/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request))
})

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
            'Authorization': `Bearer ${GITHUB_TOKEN}`
        },
        body: JSON.stringify({
            "event_type": "dispatch-workflow-job",
            "client_payload": {
                "workflowName": workflow,
                "idJob": job
            }
        })
    }
    const response = await fetch(url, init)
    const results = await gatherResponse(response)
    return new Response(results, init)
}

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
    const { headers } = response
    const contentType = headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
        return JSON.stringify(await response.json())
    } else if (contentType.includes('application/text')) {
        return await response.text()
    } else if (contentType.includes('text/html')) {
        return await response.text()
    } else {
        return await response.text()
    }
}


const url = 'https://api.github.com/repos/latinonetonline/LatinoNETOnline.ScheduleJob/dispatches';

