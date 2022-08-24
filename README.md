# Evolution test project

## How to play:

- ### How start game:
  1. Choose level from dropdown
  2. Click button "New game"
  3. Wait for the game to be created
  
- ### How to rotate cube:
  - Click on cell to rotate it

- ### How to check result:
  - Click button "Check result" and wait
    * If you pass the verification, you will see the code below the "Check Result" button
    * If you did not pass the test, you will see the inscription on the button "Test Failed"


## Other descriptions

### Level password:

- `JustWarmingUp`

### Limitations:
- Doesn't support IE(maybe =))

- Required monitor width more than 960px and height more than 1080px

- When your chose game level above 1(or number of field columns and rows more than 16) application rendered field with scrollbars

- When `map` or `rotate` requests processing to long you can't rotate another cell

### Design:
- Used react-window library for improve perfomance

### How to launch app:

- Development mode:

  `npm run start`

- Build mode:

  `npm run build`

### Link to app:

[Link](https://playful-chaja-cd990a.netlify.app/)
