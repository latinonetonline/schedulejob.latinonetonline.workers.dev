addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

    const url = new URL(request.url);

    let handler = url.searchParams.get("handler");

    console.log("Handler name received: " + handler)

    let objectScheduled = url.searchParams.get("objectScheduled");

    console.log("Object Scheduled id received: " + objectScheduled)

    let cronId = url.searchParams.get("cronId");

    console.log("Cron id received: " + cronId)

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
                "handlerName": handler,
                "objectScheduledId": objectScheduled,
                "cronId": cronId
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