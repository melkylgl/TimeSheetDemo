###
### Error: More than one module matches. Use skip-import option to skip importing the component into the closest module.
###
Use the generate command wiht --module option:
     ng generate component ui/checkbox --module app




###
### Pure Component:
###
By knowing that all our components are pure and that their inputs are immutable, 
we can tell Angular to disable change detection until an input property value changes. 
This makes our component tree very efficient, and Angular can optimize change detection effectively. 
When thinking about large component trees, 
this can make the difference between a stunningly fast application and a slow one.

The change detection of Angular is very flexible, 
and each component gets its own change detector. 
We can configure the change detection of a component 
by specifying the changeDetection property of the component decorator.

Using ChangeDetectionStrategy, we can choose from two strategies that apply for the change detection of our component. 
In order to tell Angular that our component should only be checked if an immutable input was changed, 
we can use the OnPush strategy. 
This change detection mode is specifically designed for the purpose of pure components.

OnPush strategy:
This strategy tells Angular that a given component subtree will only change under one of the following conditions:

1)  One of the input properties changes where changes need to be immutable. 
    Inputs are always checked for reference changes (using the triple-equals operator ===)

2)  An event binding within the component subtree is receiving an event. 
    This condition tells Angular that there might be a change inside of the component itself 
    and it will trigger change detection, even if none of the inputs have changed.

