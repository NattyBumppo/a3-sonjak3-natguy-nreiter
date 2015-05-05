a3-sonjak3-natguy-nreiter
===============

## Team Members

1. Sonja Khan <sonjak3@uw.edu>
2. Nat Guy <natguy@uw.edu>
3. Nick Reiter <nreiter@uw.edu>

## A Brief History of Rocket Launches

This is an application that visualizes the history of space rocket launches across the world, starting in 1957 when Sputnik became the first artificial object in orbit. Over 5,000 rocket launches from over 30 different sites are depicted, including both successes and failures. The application allows playback of launches at multiple speeds, and filtering to reveal specific categories of launches.

## Running Instructions

http://cse512-15s.github.io/a3-sonjak3-natguy-nreiter/

OR

clone the repo, run

```python -m SimpleHTTPServer 8000``` 

from the directory and navigate to localhost:8000

## Data Domain and Interaction Techniques

We elected to use data that encompasses the dates, locations, and payload details of rocket launch events throughout history, with an emphasis on the timeline and telling a meaningful story through animations of launch events over time. We decided to emphasize the data dimensions of time and location first and foremost, and used a 2D map of the world to illustrate launch events at any given time, with an interactable timeline and slider affordance, allowing manipulation of current time, automated playback of historical ranges, and visualization of the current time.

## Data Sources

The data for this assignment was taken from several separate sources and merged together:

* The "launchlog" list of satellite orbital launches and launch attempts [here](http://planet4589.org/space/log/launchlog.txt). This document provides details on over 5,000 launches over the period of 1957 to 2015.
* The "SATCAT" satellite catalog, found [here](https://celestrak.com/pub/satcat.txt). This data set is not as large as the first, because it only includes objects that actually went into space (and doesn't document failures). However, it provides further information about orbits and launch sites which we combined with the launchlog data.
* The [National Space Science Data Center master catalog](http://nssdc.gsfc.nasa.gov/nmc/), used to double-check launch data in the event of a mismatch between the "launchlog" and "SATCAT." (In most cases, SATCAT had the incorrect data.)
* Latitude/longitude data of worldwide launch sites taken from many different sites (primarily [Wikipedia](https://www.wikipedia.org/)).

## StoryBoard

Before starting either development or (too much) data cleaning, we sat down together to plan out the interaction. This did include playing with the data some in Tableau, as well as lots of sketching of ideas. Out of our planning and discussions, we produced the following storyboard.

Unlabeled Overview
![Unlabeled overview](/images/overview_unlabeled.jpg "Unlabeled Overview")

Labeled Overview
![Labeled overview](/images/overview_labeled.jpg "Labeled Overview")

Initial State and Selection of Start Date
![Initial State and Selection of Start Date](/images/initial_and_start_date.jpg "Initial State and Selection of Start Date")

Selection of End Date and Beginning of Animation
![Selection of End Date and Beginning of Animation](/images/end_date_and_animation.jpg "Selection of End Date and Beginning of Animation")

Pause View and Tooltip Interaction
![Pause View and Tooltip Interaction](/images/pause_and_tooltip.jpg "Pause View and Tooltip Interaction")

This storyboard demonstrates a number of user flows and interactions:

1. Users begin with the initial map, displaying only launch sites
1. They can then interact by:
  * selecting a filter
    1. User chooses from one of the preset filters (or none)
    1. Application only displays the filtered data
    1. Application displays line markers of events above the slider timeline (unless no filter)
  * choosing a date range
    * User may select a start date and/or end date with the datepicker (a dropdown calendar)
    * User may adjust the start and end dates via the slider handles
  * changing the animation speed
    * user may select between slow, medium, and fast
  * or playing the animation
    1. The map begins to show rocket launches, appropriately filtered
    1. It moves over the selected time range at the specified rate
    1. A marker over the slider tracks progress through the range
    1. At any point the user may pause the animation, or adjust the speed
1. Return to the previous step

### Differences Between Storyboard and Final

During the storyboard phase, we thought it would be a good idea to include a histogram to give an overview of rocket launches occurring in the vicinity of what was being displayed on the map. We decided to remove this from the design because it would be difficult for a viewer to focus on both the map and the graph, in addition to the sliders and dates. We did add hashmarks for filtered launches to give some extra information to the user about launch frequency, though for "all launches" the hashmarks were too dense to be useful, so we elected to turn those off.

Initially we were just going to have a play/pause button, but we also decided to add a play speed selector because the time range spanned so many years that depending on the range selected to be played, playing the animation at a slower/faster rate was desired. For the animations, we were going to jitter the launch points so multiple launches from the same location within a close range would be distinguishable. After drawing the launch sites on the map, we noticed that some of the sites were very close together, which could cause a jittering effect to be ambiguous with respect to the launch site. We implemented fading circles that increase in diameter to display the launches - this method allows each launch to be seen, and the impact of many launches from the same site is easily noticeable. For timing, we decided on a draggable slider for setting the range of dates approximately, as well as a calendar-based date picker for setting the range more precisely.

Another one of our ideas was to include a tooltip for each individual launch. However, since our animation was running so fast and each launch is only on the screen for a second, we realized this would result in an impossible user experience. This ties in a bit with the idea of displaying only one day's launches on the screen. We decided against showing the finer details and focused more on the high level trends, because the details could just be looked up in a table.

We decided to show the filter menu all the time, without requiring a button click to display it. This makes it more obvious to the user, more powerfully suggesting another possible interaction method. We elected to make the default view one of only the launch sites in the world, instead of a display of activity for the first day.

Finally, we added a current date display to the bottom-left corner of the map, allowing a continuous quantitative representation of the date currently being shown.

## Development Process


The major tasks within this project were distributed as follows:

* **Sonja**: map design and interaction, time range slider design and interaction, playback interaction, launch animations
* **Nathaniel**: slider interaction, playback functionality, launch animations, filtering by categories (backend), various data wrangling tasks
* **Nick**: storyboarding and flow design, date picking, filtering by categories (frontend), filtered event hashmark display, stylistic tweaks

This was a more time-intensive project than we initially anticipated, due to factors such as supporting multiple styles of interaction for several complex timeline-related tasks, the difficulty of implementing smooth user-initiated animations, and inaccuracies in the source data that needed to be corrected. All in all, we would estimate that we spent ~45 man-hours on this project. The most time-intensive aspect may have been the various aspects of the play animation, including updating the playback point in a regular and performant manner, animating launches in a way that looked acceptable no matter what the play speed (and didn’t distract from the data), and ensuring that UI affordances accurately reflected the changing internal state of playback.
