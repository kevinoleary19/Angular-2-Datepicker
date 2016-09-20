# Angular 2 Material Datepicker

A minimalist datepicker library for Angular 2

![](https://j.gifs.com/ERwG6l.gif)

### Important!

This library is still in development. I can't guarantee I will not make breaking changes before it reaches a stable release, but the api should be stable.

### Installation
```
npm install angular2-material-datepicker
```

### Usage
Import the Datepicker Module and add it to the `imports` of your module
```
import { DatepickerModule } from 'angular2-material-datepicker'

@NgModule({
  imports: [ DatepickerModule ],
  declarations: [ ... ],
  bootstrap: [ ... ]
})
export class YourModule { }
```
If you already have a module of the same name, you can create an alias
```
import { DatepickerModule as YourAlias } from 'angular2-material-datepicker'
```
Call the component from within a template
```
<material-datepicker></material-datepicker>
```
and you're set!

### API
The datepicker component can be called with no arguments. See the [Angular 2 Documentation](https://angular.io/docs/ts/latest/cookbook/component-communication.html) for how to communicate with child components. If you use an event emitter, the datepicker component has an emitter called `onSelect`.

Optional parameters are listed below.

| Parameter | Type | Description |
|---|---|---|
| `accentColor` | string  | Replaces the default blue accent color  |
|`altInputStyle` | boolean | If `true`, changes the input styling to primarily use the accent color |
| `date` | Date | The source of truth for the selected date. If passed, the date will automatically be displayed in the input field and clicking on the input field will bring up the respective month. |
| `fontFamily` | string | By default, the element will use `'Helvetica Neue', 'Helvetica', 'Arial', 'Calibri', 'Roboto'` in that order. Passing in this value will override these defaults.|
| `rangeStart` | Date | The beginning boundary for selecting a date. For example, passing in `new Date(2015,2)` will prevent the user from being able to get to February 2015. |
| `rangeEnd` | Date | Same as `rangeStart`, but for the end boundary. e.g. passing in `new Date()` will prevent the user from being able to get to the next month. |


### CSS
The css is inlined and autoprefixed to support the last two versions of major browsers as of 2016/9/20
 
### Todo
- There is currently a bug where opening and closing the calendar too fast causes an error with an animation listener. Going to create the animation in a more 'angular' way.
- Add unit tests
- Possibly make the ranges impact selection on a more granular level by preventing days, not just months, from being selected.

### License
MIT
