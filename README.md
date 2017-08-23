# Cosmo UI

Common components for building react-redux applications on web and mobile

### Installation

```
npm install -g react-native-cli
npm install -D smartcalendar
```

This project assumes you are using react-redux with a module bundler that allows you to require scss files such as webpack.

Any css created by the cosmo-ui components will be compiled into your own bundled css, and you will have the opportunity to overwrite it before it is compiled. As such, you must configure your module bundler to allow scss files to be required. It is recommended that you use webpack 2 with css modules as follows:

```javascript
const extractSASS = new ExtractTextPlugin('/[name].css')
const cssClassFormat = 'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]'

module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                loader: extractSASS.extract([cssClassFormat, 'postcss-loader', 'sass-loader'])
            }
        ]
    },
    plugins: [
        extractSASS
    ]
}
```

### Android build

To run on Android, follow the android instructions in the [getting started guide](http://facebook.github.io/react-native/releases/0.25/docs/getting-started.html) and run an android emulator from with Android Virtual Device Manager.

Make sure watchman and flow are installed on your system

```
brew install --HEAD watchman
brew install flow
```

It is recommended to enable Gradle daemon:

```
touch ~/.gradle/gradle.properties && echo "org.gradle.daemon=true" >> ~/.gradle/gradle.properties
```

then to launch the device:

```
npm run android:build
```

Double tap R on your keyboard to reload the app during development

### Color themes

The color scheme and other styles can be configured using a javascript object. This object is passed into the Theme reducer, when the app is initialized

```tsx
import { createsmartcalendarReducersWithTheme, defaultTheme, Header, StyleProvider } from 'smartcalendar'
import { Provider, connect } from 'react-redux'

const store = createStore(
    combineReducers({
        ...createsmartcalendarReducersWithTheme(defaultTheme),
    })
)

const App = () => (
    <Provider store={store}>
        <StyleProvider>
            <Header primary={true}>This text is primary</Header>
        </StyleProvider>
    </Provider>
)
```

However, it would be extremely tedious if we were forced to connect every component just to pass the theme in.
For this reason, the StylableComponent provides access to the theme through it's public "theme" member:

```tsx
import { StylableComponent } from 'smartcalendar'

class MyComponent extends StylableComponent<MyComponentProps>

    public render() {
        return (
            <div style={{color: this.theme.colors.primary[500]}}></div>
        )
    }
}
```
The StylableComponent also stores common helper methods for accessing theme properties.

If you wish to update the theme you can use the setTheme() action and load a new theme into the store.

NOTE: context types are not compatible with redux's aggressive implementation of shouldComponentUpdate. When the theme is updated, the new theme is propogated to children via [this workaround](https://gist.github.com/alexeychikk/add4db3397df9feb2a0daf155376a5a8) which is implemented by the StyleProvider.


### Configure the sass variables for web

Step 1.

Create a variables.scss file somewhere in your project for overwriting sass variables in web builds.

Step 2.

Include a "smartcalendarVariables" alias in your webpack config which tells smartcalendar where to find the sass variable overrides e.g.

```javascript
alias: {
    smartcalendarVariables: './path/to/my/styles/folder/cosmo-variables.scss',
}
```

This works because behind the scenes each component will attempt to import 2 variable files:

```css
@import "~smartcalendarVariables";
@import "../variables";
```

The first is an alias for your custom variables file. The second is the default fallback.

Even if you don't wish to override any of the sass variables you must still make sure this file exists.

If you only use the TextInput component then you will only have the styles related to that component.

