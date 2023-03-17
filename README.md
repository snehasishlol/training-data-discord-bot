# Training Data Discord Bot
A Discord Bot that can be used to generate/save your training data INPUT and OUTPUT in a JSON File.


### Screenshots

##### Discord Bot Example:
![Discord Bot Example](https://media.discordapp.net/attachments/1086357416700031016/1086359615312240690/image.png)


##### `data/training.json` File Example:
![File Example](https://media.discordapp.net/attachments/1086357416700031016/1086359815346999366/image.png)

```json
{
    "data": [
        {
            "input": "hey",
            "output": "hello"
        },
        {

            "input": "hi",
            "output": "hello"
        },
        {
            "input": "what is your name",
            "output": "my name is snehasish AI"
        },
        {
            "input": "who are you",
            "output": "i am snehasish AI"
        },
        {
            "input": "yes",
            "output": "yeah"
        },
        {
            "input": "no",
            "output": "nope"
        },
        {
            "input": "hello",
            "output": "hi"
        },
        {
            "input": "sup",
            "output": "nothing much"
        }      
    ]
}
```


### CONFIG

+ Create a `.env` file with the value of `TOKEN` equal to your discord bot token.
+ Change the `CHANNEL_ID` from the `index.js` file. And set it to the channel where you want the `.generate` command to be run

### WARNING

+ Does not use a proper command or event handler
+ Might not work if the JSON file is broken, i.e. if there are unexpected elements at any position.


# Made with 💻 and 🍆 by [@snehasishkun](https://snehasish.cf/)

