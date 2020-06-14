# Royal Game Of Ur

This is my first React app made while I was learning it, so yeah... don't mock me :P

You can run it (and play with a friend) at https://bizley.github.io/royal-game-of-ur/

Learn more about this ancient game at https://en.wikipedia.org/wiki/Royal_Game_of_Ur

Rules in my version are as following:
1. Two players are required: blue and green.
2. Each player has 7 tokens (pawns) that must be "saved" in order to win.
3. Player starts from the field where the arrow points at and goes up, then turns into the red track, goes down, then 
   again turns to the track that matches Player's color and goes up until pawn can be safely removed from the board.
4. Players can beat each other pawns only on the red track simply by moving the pawn to the field where opponent's 
   pawn is. Beaten pawn goes back to the Player's pool.
5. Clicking the ROLL button simulates rolling the dice with possible output of 0-4. Roll of 0 results in losing a turn.
6. Player can move any of own pawns by the number of fields equal to rolled value as long as the move is possible.
7. After clicking the ROLL button all fields with pawns (or starting field) that are able to move are indicated.
8. Hovering over the pawn hints the target field this pawn will land on if chosen (gray, dark pink, or red field).
9. Clicking the arrow introduces new pawn on the board from the spare pool.
10. Only one pawn can occupy a field.
11. There are 5 special fields on the board marked with pink color - landing on any of them results in one extra turn.
12. The special field in the middle of the board has one additional advantage - pawn being there cannot be beaten.
13. To "save" the pawn Player must roll exact number of fields required to move up the ending track plus one to remove 
    the pawn from the board.
14. If no move is possible Player loses the turn.
15. When there are no Player's pawns on the board first roll automatically moves the pawn up the track.

I was inspired to make this after watching https://www.youtube.com/watch?v=WZskjLq040I  
(Tom Scott rules!) 
