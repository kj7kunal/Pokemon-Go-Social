Pokemon GO Social
==================

Pokemon GO Social is to be a React powered Social Networking site for the Pokemon GO community for users to meet and play together to form new friendships on their journey - ***in the real world***.

## Target Users
* 147 million monthly active Pokémon Go users worldwide in May 2018
* Crossed 1 billion downloads in September 2018; 500 million of these downloads occurred within the first three months after the game was released
* Pokémon Go dominates the location-based category of game, claiming an 84% market share in terms of downloads, and a 92% share in terms of revenue (as of December 2018)
* 60% of Pokémon Go users are aged 18-34 according to one measure; another finds 38% aged 19-34, with a further 32% aged 18 or younger. 43% of Pokémon Go users are female, so the user base is quite gender-equal.
* 35% increase in Pokémon Go usage when Niantic introduced some social features into the game.
* The game had made people walk 8.7 billion km collectively in 2016 – enough to get to the end of the Solar System.

## Value to Users
 - In this increasingly social world, people make connections lying on their beds, rather than meeting people in person.
 - Pokemon GO has already set records in making people get out of their homes and walk outside more than any other fitness app has.
 - A social media focussed around Pokémon Go can help augment that success, since sometimes all it takes is a push to help someone start working out. Along with Pokemon, it can be people motivating people.
 - It is often nice to walk together with someone and talk rather than just play alone.
 - There can be events in the game powered by GO Social, which are designed specifically for trainers to interact with other trainers in the real world.
 - Pokemon Go Social can actually have better impact than Facebook or other SNS, because the base of this social network is an app which *requires trainers to go out into the real world*.
 - It might also lead to more interesting ways to play the game and I am sure Niantic must be looking for expanding its range of features, because of how Pokemon GO has been proving its longevity in the market.

## Overview of Service
- This social networking site adds basic features such as making friends, 1-on-1 chatting between friends, posting to a news feed readable by friends and searching for other users, as part of the Pokemon GO community.
- Trainers need to register with their unique 12 digit (*for now-6*) Pokemon GO Trainer Codes and generate a password during SignUp. During LogIn, the trainers can use their trainer codes and password to get to their profiles.
    - Add Alias (Username) login functionality later on
- Like in the original app, friends can view information that includes your Alias, Avatar, Trainer level and XP, Buddy Pokémon name, Team, Number of Pokémon caught, Top 6 highest CP Pokémon, Distance Walked, and the Number of Battles won. Users also have the option to store a text-based introduction.
- This app provides a chat feature between friends, which is very important in various different scenarios. It gives a chance for the trainers to build interpersonal relationships with trainers they are playing with. Chatting may also be required to find people in case a group separates/spreads out while playing Pokémon GO.
    - Add a feature later where location based temporary event chat rooms can be built, so that the chat can be used for groups to play together safely.
- News feed can entertain posts such as snapshots of a Pokémon you are proud of having caught, or pictures of the raid group with whom you defeated a very difficult boss. Posts can also contain a section listing people who you were playing with, referencing their profiles.
    - Tag notifications?
    - Commenting on posts can also be enabled later.
- Like the original app, search can be based upon entering the trainer code if you have it, or just the usernames.

## Framework / Tools
* Java (SpringBoot)
* MySQL
* Hibernate
* React
* Docker
* AWS

## Overall Application flow
```
├── SignUp
└── Login
    ├── Logout
    ├── PokeNews
    │   ├── Make a post
    │   └── View all posts
    ├── Trainer Profile
    │   ├── Edit Trainer Profile
    │   ├── View self posts
    │   ├── View friend list
    │   └── View friend profile
    ├── Messaging
    │   ├── View friend chat
    │   └── Send message
    ├── Search
    └── Add friend
```

## Functions
1. [SignUp](#SignUp)
2. [Login](#Login)
    1. [Logout](#Logout)
    2. [PokeNews](#pokenews)
        1. [Make a post](#makepost)    
        2. [View all posts](#viewposts)   
    2. [Trainer Profile](#profile)   
        2. [Edit Trainer Profile](#editprofile)   
        2. [View self posts](#wall)   
        2. [View friend list](#friendlist)   
        2. [View friend profile](#friendprofile)  
    2. [Messaging](#messaging)
        2. [View friend chat](#chat)   
        2. [Send message](#sendmsg)   
    2. [Search](#search)
    2. [Add friend](#addfriend)    


<a name="SignUp"></a>
#### SignUp
Input unique Pokemon GO ID (for now, any 6 digit unique number - later the actual 12 like in game) and EmailID and press "Register" button → if it is not registered already, then store locally and move to "Credentials" page. Generate:
- Trainer Alias
- Password
- Team Name (Instinct, Valor, Mystic)
- DOB
- Gender
If already stored, then display "Already registered" and a Go Back button to go to the PoGoS homepage.

<a name="Login"></a>
#### Login
Input valid Trainer ID and pre-generated password and press "Login" button → if it matches to DB data, then move "PokeNews" page. If Not, then display "TrainerID or Password is invalid"

<a name="Logout"></a>
#### Logout
Press logout button in navigation bar of "PokeNews", "Trainer Profile" or the "Messaging" page and move to PoGoS homepage.

<a name="pokenews"></a>
<a name="makepost"></a>
#### PokeNews → Make a post
Navigate to the PokeNews page from the navigation bar available on the "PokeNews", "Trainer Profile" and "Messaging" Pages.
1. Posting block on top of the "PokeNews" page. It consists of a text box and an image icon and a "Post" button.  
2. To add text: Click into text box and add text into empty text box on the top of the PokeNews page.  
   To add image: Click image icon and upload image file path and press "Upload" button. *** <br>
3. Click Submit when happy with the post.  
4. Note down timestamp for post and add it to the post view along with the poster's alias.
5. Refresh PokeNews page.

<a name="viewposts"></a>
#### PokeNews → View all posts
Posts populated on the PokeNews page under the posting block chronologically from most recent to old posts. Post component is replicated to show n number of posts. Press [Older] or [Newer] to view other n post lists.

<a name="profile"></a>
<a name="editprofile"></a>
#### Trainer Profile → Edit Trainer Profile
Navigate to the "Trainer Profile" page from the navigation bar available on the "PokeNews", "Trainer Profile" and "Messaging" Pages.
1. Press the "Edit" button to go to the "profile edit form" page.
2. The Profile has the information:
    - Trainer Alias (set during signup: editable) (Text)
    - Team Name (set at signup: not changeable)(enum-> Instinct, Valor, Mystic)
    - Gender (set at signup: not changeable)(bool-> Male, Female)
    - Avatar (Editable) (Image)
    - Trainer Level (Updated directly if success getting from PoGO API)(Integer)
    - XP at trainer level (Updated directly if success getting from PoGO API)(Integer)
    - Buddy Pokemon Name (Updated directly if success getting from PoGO API)(Text)
    - Number of Pokémon caught (Updated directly if success getting from PoGO API)(Integer)
    - Top 6 highest CP Pokémon (Updated directly if success getting from PoGO API)(Text[6])
    - Distance Walked (Updated directly if success getting from PoGO API)(Integer)
    - Number of Battles won (Updated directly if success getting from PoGO API)(Integer)
    - Introductory Message (Editable)(Text)
3. After making changes, press "Submit" button → move to "Trainer Profile" page

<a name="wall"></a>
#### Trainer Profile → View self posts
Posts associated with the trainer are populated on the "Trainer Profile" page, in the posting section. Arranged chronologically from most recent to old posts. Post component is replicated to show n number of posts. Press [Older] or [Newer] to view other n post lists. Post component is exactly the same as the one used in PokeNews.

<a name="friendlist"></a>
#### Trainer Profile → View friend list
1. Press "Friends" on top of the "Trainer Profile" page and move to the "Friend List" page.
2. Friends of the user are displayed here in alphabetical order, along with their basic information:
      - Trainer Alias
      - Team Name
      - Level
      - Avatar (later)
      - Chat button directing to friend's chat.


<a name="messaging"></a>
<a name="chat"></a>
#### Messaging → View friend chat
Navigate to the "Messaging" page from the navigation bar available on the "PokeNews", "Trainer Profile" and "Messaging" Pages. Messaging page contains a list of friend chats referenced chronologically by the last message. There is also a search bar to start a new chat.
1. Press on chat button after selecting the friend's name from either history or the friend search
2. Move to friend chat page, which is populated with the chat messages in chronological order and color coded for the person who sent the message.
3. The chat page also has a back button to go back to the "Messaging page" and a send button to send a new text message.

<a name="sendmsg"></a>
#### Messaging → Send message
1. Type in the text in the text box.
2. Hit send -> refresh friend chat page to incorporate the latest message.
3. Hit back -> go back to the "Messaging" page, with refreshed order if new message sent.

<a name="search"></a>
### Search
Search for a friend's name on the navigation bar via trainer codes or trainer alias in the trainers DB.

<a name="addfriend"></a>
### Add friend
Click add friend button on any new profile. New friends may have less information on the profile.


## DB Schema
Update DB Schema. For draft, using messengerDB -
![](./img/PoGoDB.png)


## Infrastructure
Not sure. Have to work on this.

## Security
- Sql injection - Hibernate + Prepared statements
- XSS - React has some sort of XSS protection
- DOS - Not sure, have to check.

## Monitoring & Logging
- AWS cloudwatch already has some monitoring and logging features.
- Using a client-side logging library sending JSON data to maintain a data structure that can easily be sorted and organized.

## Test
- React - Jest + Enzyme for unit testing
- Spring - Have to check out DataJPATest, WebMvcTest
- Integration Testing with SpringBootTest
- E2E - Full UI Automatic tests
Search login tests
