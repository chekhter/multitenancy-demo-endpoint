# Sample endpoint app for jobscheduler

The app employs service instances of xsuaa and jobscheduler created in multitenancy-demo, i.e. it should be deployed after.

Only one endpoint /testEndpoint is defined in approuter.

Endpoint can also be triggered out of the application router, it returns a simple {"success": true} json

## Implementation

1. Make sure the multitenancy demo app is deployed and running

2. Replace my D-number with something else in `manifest.yml`, `router/xs-app.json` and `app/package.json`

3. Run `npm install` in both `app` and `router` folders

4. Deploy the app from the root folder with `cf push`

5. After the app has been deployed create a new route for the application router app according to the `TENANT_HOST_PATTERN` in `manifest.yml`