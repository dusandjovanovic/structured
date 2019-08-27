## structured

Web application for realtime collaborative **graph visualization**. Supports **continuous algorithm simulations** for multiple users at the same time. Made possible with MERN, this stack consists of MongoDB, Express, **React w/ Redux, and Node.js**.

### `npm start`

To run frontend in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.<br>

### `cd backend && npm run local`

To run server in development mode.
API will be accessible at [http://localhost:8080](http://localhost:8080) and socket-io entry point will be open on port `65080`. Optionally rename `.env.sample` to `.env` for establishing custom MongoDB cluster connection, otherwise make sure you have `mongod` instance running locally.

### `cd backend && npm start`

To run server with a daemon process manager suitable for production environment.
Application is sustainable online with this configuration. Runs in multiple instances with auto-restart capability. Logging is available in realtime.

## Folder Structure

```
/
  README.md
  node_modules/
  public/
    index.html
    mainfest.json
    ...
  src/
    assets/
    components/
    containers/
    hoc/
    store/
    utils/
    App.js
    App.test.js
    package.json
    ...
  backend/
    README.md
    node_modules/
    app/
    config/
    public/
    test/
    ...
```
![alt text][screenshot_intro]

[screenshot_intro]: documents/images/screenshot_intro.png

![alt text][screenshot_playground]

[screenshot_playground]: documents/images/screenshot_playground.png

![alt text][screenshot_algorithm]

[screenshot_algorithm]: documents/images/screenshot_algorithm.png

![alt text][screenshot_dashboard]

[screenshot_dashboard]: documents/images/screenshot_dashboard.png
