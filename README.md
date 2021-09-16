Mini Project - Grow the Virus

Main Theme of the Game
-To replicate the virus as much as possible to destroy the world
-In order to grow the virus, you need to match the single rectangle on the left side, which is the viral protein, to the rectangles on the left hand side, which represent the virus replicate
-Control the right rectangle to hit the left rectangles
-The virus will only replicate when their color matches
-Some virus will be killed and  in the middle of the game

Logic behind the game
-Set the game screen, rectangle area and shooting rectangles with a bit initial css
-keycode is being used in the game (left, right, up, down, shoot, back)
-Randomize the color in a function
-Assign two types of rectangles in 5 random colors
-Set up the collision detection
-Condition 1: if they are not collided, press key Q to return the shooting rectangle on the left side with a random height/top(back)
-Condition 2: if they are collided, and if they have the same color, shooting rectangles returns position, score increases, rectangles on left get another randomized color
-Condition 3: if they are collided, and if they do not have the same color, return the shooting rectangle  on the left side with a random height/top
-Time counts as in 2 seconds plus one day
-Some rectangles on right side and score would be deducted every 10 seconds to increase the level
-Message boxes pop up at the start of the game and the end of the game of both winning and losing

Challenges
-Tried three types of collision detection and they are pretty much the same thing. I needed to check the condition carefully to decide which one is the best
-Using the animation to move the character is not wise because it created issues on dynamic and the motion is laggy and dodgy
-Until i switched every in game loop version, all the objects' values can be updated
-css challenges. Setting up the shooting rectangle being absolute and other elements
-Calling functions and using variables that haven't been defined

Mistakes
-Not using game loop in the beginning
-Variables not defined
-Using the wrong object
-Not enough thinking and planning on the collision
