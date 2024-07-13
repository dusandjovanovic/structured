## structured

Web application for realtime collaborative **graph visualization**. Supports **continuous algorithm simulations** for multiple users at the same time. Made possible with MERN, this stack consists of MongoDB, Express, **React w/ Redux, and Node.js**.

### `npm start`

To run frontend in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.<br>

### `cd backend && npm run local`

To run server in development mode.<br>
API will be accessible at [http://localhost:8080](http://localhost:8080) and socket-io entry point will be open on port `65080`. Optionally rename `.env.sample` to `.env` for establishing custom MongoDB cluster connection, otherwise make sure you have `mongod` instance running locally.

### `cd backend && npm start`

To run server with a daemon process manager suitable for production environment.<br>
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

## Screenshots

![alt text][screenshot_intro]

[screenshot_intro]: documents/images/screenshot_intro.png

![alt text][screenshot_playground]

[screenshot_playground]: documents/images/screenshot_playground.png

![alt text][screenshot_algorithm]

[screenshot_algorithm]: documents/images/screenshot_algorithm.png

![alt text][screenshot_dashboard]

[screenshot_dashboard]: documents/images/screenshot_dashboard.png

## Architecture

### Layered (n-tier)

The architectural style applied over the entire structure of the application is the Layered pattern. The application components are organized in three layers.

![alt text][layered]

[layered]: documents/images/layered.png

* *Server* - backend layer (Node.js)
* *Reactive model* - a layer that wraps the data acquisition logic
* *Redux state* - the state-management layer relies on `react-redux`
* *View* - view layer, interaction with the user

### Backend: Publish and subscribe

The **Publish and subscribe** method is used for exchanging messages where the senders (publishers) do not specify the specific destinations of the messages, that is, the recipients (subscribers), but rather **categorize the messages into classes** without knowing whether there is a recipient at all. Similarly, receivers register to specific classes and receive messages of those classes whenever they are sent.


### Redux store model

`json
--state
----auth
------token
------username
------error
------waiting
------authRedirectPath

----user
------username
------friends
--------array[]
------requests
--------array[]
------error

----notification
------message
------level
------autoDismiss
------action
------onRemove

----room
------rooms
--------array[]
------room
--------name
--------master
--------data
----------users
------------array[]
----------_id
----------name
----------currentUsers
------------array[]
----------maxUsers
----------createdBy
----------time
----------__v
`

## Architecture and decorators

**Higher-order components (hoc)** are used for **expanding and composition** of components by *wrapping* them. The Hoc component controls the input, so in the form of the `props` attribute, the included component can be forwarded an entity or a set of data that it initially does not have access to. The main advantage of hoc is **introducing logic into decoration** and **propagating logic** in the form of props attribute of the included component.

An example of a higher-order component is `withIO`. This Decorator extends the `WrappedComponent` base component by handling WebSockets. Lifecycle methods are predefined for WebSocket establishment, and method like `addNodeIO(node)` is added logic in the form of props attribute `addNodeIO`.

`javascript
function withIO (WrappedComponent) {
    return class extends React.Component {
        socket = null;

        componentWillMount() {
            this.socket = this.props.io("domain_name");
        }

        componentWillUnmount() {
            this.socket.close();
        }

        addNodeIO = (node) => {
            this.socket.emit(`add node`, {
                room: this.props.data.name,
                sender: this.props.username,
                node: node
            });
        };
        ...
        
        render() {
            return <WrappedComponent addNodeIO={this.addNodeIO}...{...this.props} />;
        }
}
`

Composition and decoration are applied to `Room` component. Initially, this component does not have much functionality except for a buildable core interface and separate containers for drawing chats, graphs, and navbars. Decorators provide a significantly more complex component without code duplication and the ability to reuse hoc decorators.

In the concrete example, the decorator `withPlaygroud` is used to build rooms of the `practice` type and dynamically assigns privileges and allowed activities in the form of navbar elements of `Room` components, all depending on the status of the user. If the user is the `master` of the room he is in, he will receive additional privileges. `withPlaygroud` is a hoc that relies on methods previously propagated by the `withIO` and `withGraph` decorators. In addition to the `withPlayground` decorator, the `withCompete` and `withLearn` decorators are also crucial. These three hocs are used to form rooms of different types and according to the type of room it relies on different possibilities and attributes. The `withAlgorithm` decorator adds the possibility of visualizing different algorithms, a possibility that is only needed in `practice` type rooms.

`javascript
export const RoomPlayground = connect(mapStateToProps, mapDispatchToProps)(
  withIO(
    withGraph(
     withAlgorithm(
      withPlayground(withStyles(styles)(withErrorHandler(Room))))
    )
  )
);

export const RoomCompete = connect(mapStateToProps, mapDispatchToProps)(
  withIO(
    withGraph(
      withCompete(
        withStyles(styles)(withErrorHandler(Room)))
    )
  )
);

export const RoomLearn = connect(mapStateToProps, mapDispatchToProps)(
  withGraph(
    withLearn(
      withStyles(styles)(withErrorHandler(Room))
    )
  )
);
`

## User Interface and composition

On the example of rooms with different types of toolbars, navbar elements are dynamically "injected" and can be of different types. Composition of `Room` components with `toolbar-master`, `toolbar-spectator`, `toolbar-compete`, `toolbar-compete-spectator` and `toolbar-learn` elements is performed depending on the type of room in which the user is and its privileges.

![alt text][toolbar]

[toolbar]: documents/images/toolbar.png

`jsx
<Wrapper>
    {this.props.room.master
        ? <WrappedComponent {...this.props}>
            <ToolbarMaster ...shared props
                    randomGraph={this.props.randomGraph}                       
                    algorithmBreadth={this.props.algorithmBreadth}
                    algorithmDepth={this.props.algorithmDepth}

            />
          </WrappedComponent>
        : <WrappedComponent {...this.props}>
            <ToolbarSpectator ...shared props
            />
          </WrappedComponent>
    }
</Wrapper>
```

On the example of `Toolbar` component. The logo and navigation elements are always displayed.
```jsx
const toolbar = (props) => (
    <header className="Toolbar">
        <Logo />
        <NavigationItems />
        {props.children}
        ...
    </header>
);
```
`Dropdown` is a component that is passed as a child and dynamically composed as needed.
```jsx
<Toolbar>
    <Dropdown showRequests={(event) => this.showRequestsHandler(event)}
              hideRequests={(event) => this.showRequestsHandler(event)}
              ...
    />
</Toolbar>
```

### Algorithms through strategies

`algorithm`
 - `breadthFirstSearch`
 - `breadthFirstSearch ? observable`
 - `depthFirstSearch`
 - `depthFirstSearch ? observable`
 
#### Algoritmi

A new algorithm can be added through `strategy` in two forms:
 - `algorithmName`
 - `algorithmName ? observable`

`algorithmName` returns an array of visited/relevant nodes as a result. `algorithmName ? observable` is an extension of this algorithm which for ` observable === true` returns a series of steps representing the state of the graph. The steps must be modeled in the form:
```json
{
    visited: [string],
    solution: [string],
    tempVertex: string,
    unvisitedVertex: string,
    algorithmLine: string,
    structure : [string],
}
```

`visited` as a series of visited nodes, `solution` as a solution, `tempVertex`/`unvisitedVertex` can represent different nodes in the stages of the algorithm. `algorithmLine` the current active line of pseudo code representing the algorithm and `structure` the content of an auxiliary structure such as a queue or stack.
These two different forms are used separately in `practice` and `compete` rooms.

### Visualizing algorithms through observables/iterators

`Observables` are used when visualizing algorithms over a graph in a very simple form, relying on the `rxjs` library. It has the role of `iterator` over the *series of states* in which the graph is during the execution of the specific algorithm, *generated by the mentioned `observable` variants of the algorithms*.

```javascript
algorithmVisualize = () => {
    ...
    const source$ = interval(1000);
    source$.pipe(takeWhile(async => this.state.algorithmState.active))
        .subscribe(async => this.algorithmNextState());
};
```

`rxjs` is rarely used with React.js due to the already existing and established `react-redux` state management. However, in the application, the state of the graph is not maintained through `redux-store`.
